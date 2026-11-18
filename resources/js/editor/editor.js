import { BlockManager } from './managers/BlockManager.js';
import { HistoryManager } from './managers/HistoryManager.js';
import { PropertyManager } from './managers/PropertyManager.js';
import { SelectionManager } from './managers/SelectionManager.js';
import { LayerManager } from './managers/LayerManager.js';
import { DragDrop } from './drag-drop.js';
import { FreeDragDrop } from './drag-drop.js';
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
        this.freeDragDrop = new FreeDragDrop(
            this.historyManager,
            this
        );
        this.resize = new Resize();
        this.layoutMode = 'normal';
        this.isSaving = false;
        this.blockManager = new BlockManager(
            this.propertyManager,
            this.historyManager,
            this.selectionManager,
            this
        );
        this.historyManager.blockManager = this.blockManager;
        this.layerManager = new LayerManager(this);

    }

    // ボタン操作
    async initialize() {

        this.historyManager.initialize();
        this.blockManager.initialize();
        //this.dragDrop.initialize();
        this.freeDragDrop.initialize();

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
        // レイヤー管理を初期化
        this.layerManager.initialize();
        // ページ背景色の変更
        const backgroundColorInput =
            document.getElementById('site-bgcolor');

        backgroundColorInput?.addEventListener('input', (event) => {
            const canvas = document.getElementById('canvas');

            if (!canvas) return;

            canvas.style.backgroundColor = event.target.value;

            this.markDirty();
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
            ?.addEventListener('click', () => {
                this.save();
            });
        document.getElementById('preview-button')
            ?.addEventListener('click', async () => {
                if (this.isSaving) {
                    return;
                }

                try {
                    await this.save();
                } catch (error) {
                    console.error(error);
                    alert('保存に失敗したため、プレビューを開けませんでした。再度お試しください。');
                    return;
                }

                const pageId = document
                    .getElementById('canvas')
                    .dataset.pageId;

                window.location.href = `/preview/${pageId}`;
            });

    }
    // ページの再読み込み
    async loadPage() {

        const pageId = document
            .getElementById('canvas')
            .dataset.pageId;

        const res = await fetch(`/pages/${pageId}/blocks`);
        const blocks = await res.json();

        this.restoreBlocks(blocks);

        // 保存済みのページ設定を取得
        const pageResponse = await fetch(`/pages/${pageId}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!pageResponse.ok) {
            throw new Error('ページ設定の取得に失敗しました');
        }

        const page = await pageResponse.json();

        // 背景色を復元
        const backgroundColor = page.background_color || '#ffffff';

        const canvas = document.getElementById('canvas');
        canvas.style.backgroundColor = backgroundColor;

        // カラーピッカーにも反映
        const backgroundColorInput =
            document.getElementById('site-bgcolor');

        if (backgroundColorInput) {
            backgroundColorInput.value = backgroundColor;
        }

        this.historyManager.save();

        this.autoSaveManager.isDirty = false;
    }

    // ブロックの復元
    restoreBlocks(blocks) {
        const canvas = document.getElementById('canvas');

        // YouTube動画の監視処理を解除
        canvas.querySelectorAll('.editor-embed-container')
            .forEach(container => {
                if (typeof container.youtubeCleanup === 'function') {
                    container.youtubeCleanup();
                    delete container.youtubeCleanup;
                }
            });

        canvas.innerHTML = '';

        blocks.sort((a, b) => a.sort_order - b.sort_order)
            .forEach(block => this.blockManager.createFromData(block));

        // 保存された自由配置ブロックに合わせて高さを復元
        this.freeDragDrop.updateCanvasHeight();
    }
    // ボタンセーブ
    async save() {

        if (this.isSaving) {
            return;
        }

        // 自動保存の予約を解除
        if (this.autoSaveManager.timer) {
            clearTimeout(this.autoSaveManager.timer);
            this.autoSaveManager.timer = null;
        }

        this.isSaving = true;

        const saveButton =
            document.getElementById('save-button');

        if (saveButton) {
            saveButton.disabled = true;
        }

        try {

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute('content');

            const pageId = document
                .getElementById('canvas')
                .dataset.pageId;

            const serializer = new BlockSerializer();
            const blocksData = serializer.serialize();

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
                    })
                }
            );

            if (!response.ok) {
                throw new Error('保存失敗');
            }
            this.autoSaveManager.isDirty = false;
            // ページの背景色を保存
            const backgroundColorInput =
                document.getElementById('site-bgcolor');

            if (backgroundColorInput) {
                const pageResponse = await fetch(
                    `/pages/${pageId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-CSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify({
                            background_color: backgroundColorInput.value
                        })
                    }
                );

                if (!pageResponse.ok) {
                    throw new Error('背景色の保存に失敗しました');
                }
            }
            this.autoSaveManager.timer = null;

            const saveStatus =
                document.getElementById('save-status');

            if (saveStatus) {
                saveStatus.textContent = '保存済み';
            }

        } finally {

            this.isSaving = false;

            if (saveButton) {
                saveButton.disabled = false;
            }

        }
    }


    // 自動保存
    markDirty() {
        this.autoSaveManager.markDirty();
    }

    refreshFromHistory(blocks) {
        const canvas = document.getElementById('canvas');

        // YouTube動画の監視処理を解除
        canvas.querySelectorAll('.editor-embed-container')
            .forEach(container => {
                if (typeof container.youtubeCleanup === 'function') {
                    container.youtubeCleanup();
                    delete container.youtubeCleanup;
                }
            });

        canvas.innerHTML = '';

        blocks.forEach(block =>
            this.blockManager.createFromData(block)
        );

        // Undo・Redo後もキャンバスの高さを更新
        this.freeDragDrop.updateCanvasHeight();
    }
}