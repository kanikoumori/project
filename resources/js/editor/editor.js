import { BlockManager } from './managers/BlockManager.js';
import { HistoryManager } from './managers/HistoryManager.js';
import { PropertyManager } from './managers/PropertyManager.js';
import { SelectionManager } from './managers/SelectionManager.js';

import { DragDrop } from './drag-drop.js';
import { Resize } from './resize.js';

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
    }

    initialize() {
        this.historyManager.initialize();
        this.blockManager.initialize();

        document.getElementById('undo-button')
            ?.addEventListener('click', () => {
                this.historyManager.undo();
            });

        document.getElementById('redo-button')
            ?.addEventListener('click', () => {
                this.historyManager.redo();
            });
    }
}