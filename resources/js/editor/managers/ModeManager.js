export class ModeManager {

    constructor(editor) {
        this.editor = editor;
        this.mode = 'edit';
    }

    initialize() {
        this.setMode('edit');
    }

    setMode(mode) {

        this.mode = mode;

        const statusBar =
            document.querySelector('.statusbar');

        statusBar.classList.remove(
            'edit',
            'sort',
            'preview'
        );

        if (mode === 'edit') {
            statusBar.classList.add('edit');
            document.getElementById('status-mode').textContent =
                '編集モード';
        } else {
            statusBar.classList.add('sort');
            document.getElementById('status-mode').textContent =
                '並び替えモード';
        }

        document.body.classList.toggle(
            'edit-mode',
            mode === 'edit'
        );

        document.body.classList.toggle(
            'sort-mode',
            mode === 'sort'
        );

        this.editor.dragDrop.setEnabled(mode === 'sort');
    }
    isEditMode() {
        return this.mode === 'edit';
    }

    isSortMode() {
        return this.mode === 'sort';
    }
}