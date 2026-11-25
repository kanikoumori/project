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


    syncSavedBlockIds(savedBlocks, savedIds) {
        if (
            !Array.isArray(savedBlocks) ||
            !Array.isArray(savedIds) ||
            savedBlocks.length !== savedIds.length
        ) {
            return;
        }

        // 保存したブロックをclientKeyで対応付ける
        const idsByClientKey = new Map();

        savedBlocks.forEach((block, index) => {
            const key = block.clientKey;
            const id = savedIds[index];

            if (
                typeof key === 'string' &&
                key.length > 0 &&
                Number.isSafeInteger(id) &&
                id > 0
            ) {
                idsByClientKey.set(key, id);
            }
        });

        // 過去の操作履歴にもDBのIDを反映する
        this.history.forEach(snapshot => {
            snapshot.forEach(block => {
                const savedId = idsByClientKey.get(block.clientKey);

                if (savedId === undefined) {
                    return;
                }

                block.id = savedId;

            });
        });
    }

    removeDeletedBlockIds(savedIds) {
        const persistedIds = new Set(savedIds);

        this.history.forEach(snapshot => {
            snapshot.forEach(block => {
                if (
                    block.id !== undefined &&
                    block.id !== null &&
                    !persistedIds.has(Number(block.id))
                ) {
                    // DBから削除されたブロックの古いIDを解除
                    delete block.id;
                }
            });
        });
    }

}