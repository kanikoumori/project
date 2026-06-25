export class ButtonBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        // ボタン初期値
        block.dataset.type = 'button';
        block.dataset.buttonColor = '#5B9DFF';
        block.dataset.buttonTextColor = '#ffffff';
        block.dataset.buttonRadius = '12';

        block.innerHTML = `
            <button
                class="editor-button"
                contenteditable="true"
                style="
                    background-color:#5B9DFF;
                    color:#ffffff;
                    border:none;
                    border-radius:12px;
                    padding:12px 24px;
                "
            >
                ボタン
            </button>
        `;
        
        return block;
    }
}