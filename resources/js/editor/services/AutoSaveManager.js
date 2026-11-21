export class AutoSaveManager {
    constructor(editor) {
        this.editor = editor;

        this.timer = null;
        this.interval = 3000; // 3秒
        this.isSaving = false;
        this.isDirty = false;

        // 編集が行われるたびに増加する番号
        this.changeVersion = 0;
    }

    setSaveStatus(message) {
        const saveStatus =
            document.getElementById('save-status');

        if (saveStatus) {
            saveStatus.textContent = message;
        }
    }

    markDirty() {
        this.changeVersion++;
        this.isDirty = true;

        this.setSaveStatus('未保存');

        this.schedule();
    }

    schedule() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.timer = null;
            this.save();
        }, this.interval);
    }

    async save() {
        if (!this.isDirty || this.isSaving) return;

        // 手動保存中なら、1秒後にもう一度確認
        if (this.editor.isSaving) {
            this.timer = setTimeout(() => {
                this.timer = null;
                this.save();
            }, 1000);

            return;
        }

        this.isSaving = true;
        let saveSucceeded = false;

        try {
            await this.editor.save();
            saveSucceeded = true;
        } catch (error) {
            console.error('自動保存に失敗しました:', error);
        } finally {
            this.isSaving = false;

            // 保存成功後に未保存の変更が残っている場合は再保存
            if (saveSucceeded && this.isDirty && !this.timer) {
                this.schedule();
            }
        }
    }
}