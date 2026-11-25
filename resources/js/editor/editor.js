import { BlockManager } from './managers/BlockManager.js';
import { HistoryManager } from './managers/HistoryManager.js';
import { PropertyManager } from './managers/PropertyManager.js';
import { SelectionManager } from './managers/SelectionManager.js';
import { DragDrop } from './drag-drop.js';
import { Resize } from './resize.js';
import { BlockSerializer } from './serializers/BlockSerializer.js';
import { AutoSaveManager } from './services/AutoSaveManager.js';

export class Editor {
    constructor() {
        this.historyManager = new HistoryManager();
        this.propertyManager =
            new PropertyManager(
                this.historyManager,
                this
            );
        this.selectionManager = new SelectionManager();
        this.autoSaveManager = new AutoSaveManager(this);
        this.dragDrop = new DragDrop(
            this.historyManager,
            this
        );
        this.resize = new Resize();
        this.isSaving = false;
        this.savePromise = null;
        this.blockManager = new BlockManager(
            this.propertyManager,
            this.historyManager,
            this.selectionManager,
            this
        );
        this.historyManager.blockManager = this.blockManager;

    }

    // ボタン操作
    async initialize() {

        this.historyManager.initialize();
        this.blockManager.initialize();
        this.dragDrop.initialize();

        // 左右サイドバーの折りたたみ
        const setupSidebarToggle = (buttonId, panelId, side) => {
            const button = document.getElementById(buttonId);
            const panel = document.getElementById(panelId);

            if (!button || !panel) return;

            const updateButton = (isClosed) => {
                button.textContent = side === 'left'
                    ? (isClosed ? '›' : '‹')
                    : (isClosed ? '‹' : '›');

                button.setAttribute(
                    'aria-expanded',
                    String(!isClosed)
                );

                button.setAttribute(
                    'aria-label',
                    `${side === 'left' ? '左' : '右'}サイドバーを${isClosed ? '開く' : '折りたたむ'}`
                );
            };

            updateButton(panel.classList.contains('is-closed'));

            button.addEventListener('click', () => {
                const isClosed = panel.classList.toggle('is-closed');
                updateButton(isClosed);
            });
        };

        setupSidebarToggle(
            'toggle-left-sidebar',
            'editor-left-sidebar',
            'left'
        );

        setupSidebarToggle(
            'toggle-right-sidebar',
            'editor-right-sidebar',
            'right'
        );

        // 保存済みブロックを読み込む
        await this.loadPage();

        // 未保存の変更がある場合、画面を離れる前に警告する
        window.addEventListener('beforeunload', (event) => {
            if (this.autoSaveManager.isDirty || this.isSaving) {
                event.preventDefault();
                event.returnValue = '';
            }
        });
        // ブラウザがオンラインに戻った際の案内
        window.addEventListener('online', () => {
            if (!this.autoSaveManager.isDirty) {
                return;
            }

            this.autoSaveManager.setSaveStatus(
                '通信が復旧しました。「一時保存」を押してください。'
            );
        });

        document.getElementById('undo-button')
            ?.addEventListener('click', () => {
                this.historyManager.undo();
                this.markDirty();
            });

        document.getElementById('redo-button')
            ?.addEventListener('click', () => {
                this.historyManager.redo();
                this.markDirty();
            });

        document.getElementById('save-button')
            ?.addEventListener('click', async () => {
                try {
                    await this.save();
                } catch (error) {
                    console.error('手動保存に失敗しました:', error);
                }
            });
        document.getElementById('preview-button')
            ?.addEventListener('click', async () => {
                const previewButton =
                    document.getElementById('preview-button');

                if (previewButton.disabled) return;

                previewButton.disabled = true;

                const timeoutMs = 30000;
                const startedAt = Date.now();


                const waitForSave = async () => {
                    if (!this.savePromise) return;

                    const remaining = timeoutMs - (Date.now() - startedAt);

                    if (remaining <= 0) {
                        throw new Error('保存待機がタイムアウトしました');
                    }

                    await Promise.race([
                        this.savePromise,
                        new Promise((_, reject) =>
                            setTimeout(
                                () => reject(new Error('保存待機がタイムアウトしました')),
                                remaining
                            )
                        )
                    ]);
                };

                try {
                    while (true) {
                        await waitForSave();

                        if (Date.now() - startedAt >= timeoutMs) {
                            throw new Error('保存処理がタイムアウトしました');
                        }

                        await this.save();

                        if (!this.autoSaveManager.isDirty) {
                            break;
                        }
                    }

                    const pageId = document
                        .getElementById('canvas')
                        .dataset.pageId;

                    window.location.href = `/preview/${pageId}`;

                } catch (error) {
                    console.error(error);

                    alert(
                        '保存を完了できなかったため、プレビューを開けませんでした。再度お試しください。'
                    );
                } finally {
                    previewButton.disabled = false;
                }
            });

    }
    // ページの再読み込み
    async loadPage() {

        const pageId = document
            .getElementById('canvas')
            .dataset.pageId;

        const res = await fetch(`/pages/${pageId}/blocks`);
        const blocks = await res.json();

        // 現在DBに存在するブロックIDを記録
        this.persistedBlockIds = new Set(
            blocks
                .map(block => Number(block.id))
                .filter(id => Number.isSafeInteger(id) && id > 0)
        );

        this.restoreBlocks(blocks);
        this.historyManager.save();

        this.autoSaveManager.isDirty = false;
    }


    // ブロックの復元
    restoreBlocks(blocks) {

        const canvas = document.getElementById('canvas');

        canvas.innerHTML = ''; // 一旦クリア

        blocks
            .sort((a, b) => a.sort_order - b.sort_order)
            .forEach(block => {
                this.blockManager.createFromData(block);
            });
    }

    // ボタンセーブ
    async save() {

        if (this.savePromise) {
            return await this.savePromise;
        }

        // 自動保存の予約を解除
        if (this.autoSaveManager.timer) {
            clearTimeout(this.autoSaveManager.timer);
            this.autoSaveManager.timer = null;
        }

        this.isSaving = true;

        this.savePromise = (async () => {

            const saveButton =
                document.getElementById('save-button');

            if (saveButton) {
                saveButton.disabled = true;
            }
            this.autoSaveManager.setSaveStatus('保存中...');

            try {

                const csrfToken = document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute('content');

                const pageId = document
                    .getElementById('canvas')
                    .dataset.pageId;
                const savingVersion = this.autoSaveManager.changeVersion;
                const serializer = new BlockSerializer();
                const blocksData = serializer.serialize();

                const clientKeys = blocksData.map(block => block.clientKey);

                if (
                    clientKeys.some(
                        key => typeof key !== 'string' || key.trim() === ''
                    ) ||
                    new Set(clientKeys).size !== clientKeys.length
                ) {
                    throw new Error('保存対象のブロック識別子が不正です');
                }


                const response = await fetch(
                    `/pages/${pageId}/blocks/bulk`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-CSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify({
                            blocks: blocksData
                        }),
                        signal: AbortSignal.timeout(30000)
                    }
                );


                if (!response.ok) {
                    const error = new Error(`保存失敗 (HTTP ${response.status})`);
                    error.status = response.status;
                    throw error;
                }
            const result = await response.json();

            // サーバーから返されたIDを検証
            if (
                result.success !== true ||
                !Array.isArray(result.blockIds) ||
                result.blockIds.length !== blocksData.length ||
                !result.blockIds.every(
                    id => Number.isSafeInteger(id) && id > 0
                ) ||
                new Set(result.blockIds).size !== result.blockIds.length
            ) {
                throw new Error('保存結果のブロックIDが不正です');
            }


            // 保存対象をclientKeyとDBのIDで対応付ける
            const savedIdsByClientKey = new Map();

            blocksData.forEach((block, index) => {
                const key = block.clientKey;

                if (
                    typeof key !== 'string' ||
                    key.length === 0 ||
                    savedIdsByClientKey.has(key)
                ) {
                    throw new Error('ブロックの識別子が不正です');
                }

                savedIdsByClientKey.set(
                    key,
                    result.blockIds[index]
                );
            });

            // 現在画面に存在するブロックへIDを反映
            const canvas = document.getElementById('canvas');

            canvas.querySelectorAll('.block').forEach(element => {
                const key = element.dataset.clientKey;

                // 保存開始後に追加されたブロックは対象外
                if (!savedIdsByClientKey.has(key)) {
                    return;
                }
                const savedId = savedIdsByClientKey.get(key);

                // 同じclientKeyのブロックにはサーバーが確定したIDを反映する
                element.dataset.blockId = String(savedId);

            });

            // 保存後のブロックIDをUndo・Redoの履歴にも反映
            this.historyManager.syncSavedBlockIds(blocksData, result.blockIds);
            // 保存成功時点でDBに存在するブロックIDを記録
            this.persistedBlockIds = new Set(result.blockIds);
            // DBから削除されたブロックの古いIDを操作履歴から解除
            this.historyManager.removeDeletedBlockIds(result.blockIds);
            // DBに存在しなくなったブロックIDを画面から解除
            document.querySelectorAll('#canvas .block[data-block-id]')
                .forEach(block => {
                    const id = Number(block.dataset.blockId);

                    if (!this.persistedBlockIds.has(id)) {
                        delete block.dataset.blockId;
                    }
                });
                const hasNewChanges =
                    this.autoSaveManager.changeVersion !== savingVersion;

                this.autoSaveManager.isDirty = hasNewChanges;

                if (hasNewChanges) {
                    this.autoSaveManager.schedule();
                }

                this.autoSaveManager.setSaveStatus(
                    hasNewChanges ? '未保存' : '保存済み'
                );

                } catch (error) {
                this.autoSaveManager.isDirty = true;

                this.autoSaveManager.setSaveStatus(
                    '保存できませんでした。もう一度「一時保存」を押してください。'
                );
                throw error;

            } finally {
                this.isSaving = false;

                if (saveButton) {
                    saveButton.disabled = false;
                }
            }

        })();

        try {
            return await this.savePromise;
        } finally {
            this.savePromise = null;
        }
    }


    // 自動保存
    markDirty() {
        this.autoSaveManager.markDirty();
    }

    refreshFromHistory(blocks) {
        const canvas = document.getElementById('canvas');
        canvas.innerHTML = '';

        blocks.forEach(block => {
            this.blockManager.createFromData(block);
        });
    }

}