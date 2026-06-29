import Sortable from 'sortablejs';

export class DragDrop {

    constructor(historyManager, editor) {
        this.historyManager = historyManager;
        this.editor = editor;
    }

    initialize() {

        const canvas =
            document.getElementById('canvas');

        this.sortable = Sortable.create(canvas, {

            animation: 150,

            draggable: '.block',

            handle: '.drag-handle',

            disabled: true,

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
    setEnabled(enabled) {

        this.sortable.option(
            'disabled',
            !enabled
        );

    }
}