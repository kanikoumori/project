import { BlockManager } from './managers/BlockManager.js';
import { HistoryManager } from './managers/HistoryManager.js';
import { PropertyManager } from './managers/PropertyManager.js';
import { SelectionManager } from './managers/SelectionManager.js';
import { DragDrop } from './drag-drop.js';
import { Resize } from './resize.js';
import { BlockSerializer } from './serializers/BlockSerializer.js';

export class Editor {
    constructor() {
        this.historyManager = new HistoryManager();
        this.propertyManager = new PropertyManager(this.historyManager);
        this.selectionManager = new SelectionManager();

        this.blockManager = new BlockManager(
            this.propertyManager,
            this.historyManager,
            this.selectionManager
        );

        this.historyManager.blockManager = this.blockManager;
        this.dragDrop = new DragDrop();
        this.resize = new Resize();

        this.isSaving = false;
    }

    // 画面保存
    initialize() {
        this.historyManager.initialize();
        this.blockManager.initialize();
        this.loadPage();

        document.getElementById('undo-button')
            ?.addEventListener('click', () => {
                this.historyManager.undo();
            });

        document.getElementById('redo-button')
            ?.addEventListener('click', () => {
                this.historyManager.redo();
            });

        document.getElementById('save-button')
            ?.addEventListener('click', async () => {
                this.save();
            });
    }

    async loadPage() {

        const pageId = document
            .getElementById('canvas')
            .dataset.pageId;

        const res = await fetch(`/pages/${pageId}/blocks`);
        const blocks = await res.json();

        this.restoreBlocks(blocks);
        this.historyManager.save();
    }

    restoreBlocks(blocks) {

        const canvas = document.getElementById('canvas');

        canvas.innerHTML = ''; // 一旦クリア

        blocks
            .sort((a, b) => a.sort_order - b.sort_order)
            .forEach(block => {
                this.blockManager.createFromData(block);
            });
    }

    async save() {

        if (this.isSaving) return;

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

        } finally {

            this.isSaving = false;

            if (saveButton) {
                saveButton.disabled = false;
            }
        
        }
    }
}