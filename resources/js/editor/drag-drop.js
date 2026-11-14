
import Sortable from 'sortablejs';

export class DragDrop {

    constructor(historyManager, editor) {
        this.historyManager = historyManager;
        this.editor = editor;
        this.sortable = null;
    }

    initialize() {

        const canvas =
            document.getElementById('canvas');

        this.sortable = Sortable.create(canvas, {

            animation: 150,

            draggable: '.block',

            handle: '.drag-handle',

            fallbackOnBody: false,

            ghostClass: 'sortable-ghost',

            chosenClass: 'sortable-chosen',

            dragClass: 'sortable-drag',

            onEnd: () => {
                this.historyManager.save();

                this.editor.markDirty();
            }
        });
    }

    // ドラッグ操作の有効・無効を切り替える
    setDisabled(disabled) {
        if (this.sortable) {
            this.sortable.option('disabled', disabled);
        }
    }
}
