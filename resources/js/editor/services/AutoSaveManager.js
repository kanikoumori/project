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

        const saveStatus =
            document.getElementById('save-status');

        if (saveStatus) {
            saveStatus.textContent = '未保存';
        }
        
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

        // 手動保存中なら、1秒後にもう一度確認
        if (this.editor.isSaving) {
            this.timer = setTimeout(() => {
                this.save();
            }, 1000);

            return;
        }

        this.isSaving = true;

        try {
            await this.editor.save();
        } finally {
            this.isSaving = false;
        }
    }
}