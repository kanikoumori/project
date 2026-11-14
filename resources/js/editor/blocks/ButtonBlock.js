export class ButtonBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        block.dataset.type = 'button';
        block.dataset.buttonColor = '#5B9DFF';
        block.dataset.buttonTextColor = '#ffffff';
        block.dataset.buttonRadius = '12';
        block.dataset.buttonWidth = '150';
        block.dataset.buttonHeight = '48';

        // 枠線の初期設定
        block.dataset.buttonBorderWidth = '0';
        block.dataset.buttonBorderColor = '#000000';
        block.dataset.buttonBorderStyle = 'solid';

        const button = document.createElement('button');

        button.className = 'editor-button';
        button.contentEditable = 'true';
        button.style.backgroundColor = '#5B9DFF';
        button.style.color = '#ffffff';
        button.style.border = '0px solid #000000';
        button.style.borderRadius = '12px';
        button.style.width = '150px';
        button.style.height = '48px';
        button.style.lineHeight = '48px';
        button.style.boxSizing = 'border-box';
        button.textContent = 'ボタン';

        block.appendChild(button);

        return block;
    }
}