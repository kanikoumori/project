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
        this.isPreview = false;
        this.editableElements = [];
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

        // ページの読み込み完了を待つ
        await this.loadPage();

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

        document.getElementById('back-to-edit-button')
            ?.addEventListener('click', () => {
                this.exitPreview();
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
        canvas.innerHTML = '';

        blocks.forEach(block => {
            this.blockManager.createFromData(block);
        });
    }

    // プレビュー画面へ切り替え
    enterPreview() {
        if (this.isPreview) {
            return;
        }

        this.isPreview = true;

        // 編集可能な要素を記録して無効化
        this.editableElements = Array.from(
            document.querySelectorAll('#canvas [contenteditable="true"]')
        );

        this.editableElements.forEach(element => {
            element.contentEditable = 'false';
        });

        // 選択状態を解除
        document.querySelectorAll('#canvas .block.selected')
            .forEach(block => {
                block.classList.remove('selected');
            });

        // ドラッグ操作を無効化
        this.dragDrop.setDisabled(true);

        // プレビュー用CSSを適用
        document.getElementById('editor-app')
            ?.classList.add('preview-mode');

        // ボタン表示を切り替え
        document.getElementById('preview-button')?.setAttribute('hidden', '');
        document.getElementById('back-to-edit-button')?.removeAttribute('hidden');
    }

    // 編集画面へ戻る
    exitPreview() {
        if (!this.isPreview) {
            return;
        }

        this.isPreview = false;

        // 編集可能状態を復元
        this.editableElements.forEach(element => {
            element.contentEditable = 'true';
        });

        this.editableElements = [];

        // ドラッグ操作を有効化
        this.dragDrop.setDisabled(false);

        // プレビュー用CSSを解除
        document.getElementById('editor-app')
            ?.classList.remove('preview-mode');

        // ボタン表示を元に戻す
        document.getElementById('preview-button')?.removeAttribute('hidden');
        document.getElementById('back-to-edit-button')?.setAttribute('hidden', '');
    }

}