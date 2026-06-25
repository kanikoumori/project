import { BlockSerializer } from '../serializers/BlockSerializer.js';

export class HistoryManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.blockManager = null;

        this.serializer = new BlockSerializer();
    }

    initialize() {}

    save() {
        const snapshot = this.serializer.serialize();

        // 未来履歴削除
        this.history = this.history.slice(0, this.currentIndex + 1);

        this.history.push(snapshot);
        this.currentIndex++;
    }

    restore() {
        if (this.currentIndex < 0) return;

        const blocks = this.history[this.currentIndex];

        this.blockManager.editor.refreshFromHistory(blocks);
    }
    

    undo() {
        if (this.currentIndex <= 0) return;
        this.currentIndex--;
        this.restore();
    }

    redo() {
        if (this.currentIndex >= this.history.length - 1) return;
        this.currentIndex++;
        this.restore();
    }
}