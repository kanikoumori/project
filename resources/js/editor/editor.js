import { BlockManager } from './block-manager.js';
import { DragDrop } from './drag-drop.js';
import { HistoryManager } from './history-manager.js';
import { Resize } from './resize.js';
import { PropertyManager } from './property-manager.js';

export class Editor {
    constructor() {
        this.propertyManager = new PropertyManager();
        this.blockManager = new BlockManager(
            this.propertyManager
        );
        this.dragDrop = new DragDrop();
        this.historyManager = new HistoryManager();
        this.resize = new Resize();
    }

    initialize() {
        this.blockManager.initialize();
    }
}