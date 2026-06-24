export class AutoSaveManager {
    constructor(editor) {
        this.editor = editor;

        this.timer = null;
        this.interval = 3000; // 3秒
        this.isSaving = false;
        this.isDirty = false;
    }

    markDirty() {
        this.isDirty = true;

        document.getElementById('save-status')
            .textContent = '未保存';
        
        this.schedule();
    }

    schedule() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.save();
        }, this.interval);
    }

    async save() {
        if (!this.isDirty || this.isSaving) return;

        document.getElementById('save-status')
            .textContent = '保存中';

        this.isSaving = true;

        try {
            await this.editor.save();

            this.isDirty = false;

            document.getElementById('save-status')
                .textContent = '保存済み';

        } finally {
            this.isSaving = false;
        }
    }
}