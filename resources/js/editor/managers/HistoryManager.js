export class HistoryManager {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.blockManager = null;
    }

    initialize() {
        this.save();
    }

    save() {
        const canvas = document.getElementById('canvas');

        const clonedCanvas = canvas.cloneNode(true);

        clonedCanvas.querySelectorAll('.block')
            .forEach(block => {
                delete block.dataset.clickBound;

                const deleteButton =
                    block.querySelector('.delete-button');

                if (deleteButton) {
                    delete deleteButton.dataset.bound;
                }

                block.querySelectorAll('[contenteditable="true"]')
                    .forEach(element => {
                        delete element.dataset.blurBound;
                    });
            });

        const snapshot = clonedCanvas.innerHTML;

        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(
                0,
                this.currentIndex + 1
            );
        }

        this.history.push(snapshot);

        this.currentIndex = this.history.length - 1;
    }

    restore() {
        const canvas = document.getElementById('canvas');

        if (this.currentIndex < 0) return;

        canvas.innerHTML = this.history[this.currentIndex];

        requestAnimationFrame(() => {
            canvas.querySelectorAll('.block')
                .forEach(block => {
                    this.blockManager.setupBlock(block);
                });
        });
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