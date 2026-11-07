export class ButtonBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        // ボタン初期値
        block.dataset.type = 'button';
        block.dataset.buttonColor = '#5B9DFF';
        block.dataset.buttonTextColor = '#ffffff';
        block.dataset.buttonRadius = '12';

        const button = document.createElement('button');

        button.className = 'editor-button';
        button.contentEditable = 'true';
        button.style.backgroundColor = '#5B9DFF';
        button.style.color = '#ffffff';
        button.style.border = 'none';
        button.style.borderRadius = '12px';
        button.style.padding = '12px 24px';
        button.textContent = 'ボタン';

        block.appendChild(button);
        
        return block;
    }
}