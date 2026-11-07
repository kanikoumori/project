export class TextBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        block.dataset.type = 'text';
        block.dataset.color = '#000000';
        block.dataset.fontSize = '16';
        block.dataset.lineHeight = '1.7';
        block.dataset.letterSpacing = '0px';
        block.dataset.bold = 'false';
        block.dataset.align = 'left';
        block.dataset.italic = 'false';
        block.dataset.underline = 'false';
        block.dataset.strike = 'false';

        const text = document.createElement('p');

        text.contentEditable = 'true';
        text.className = 'editor-text';
        text.textContent = 'テキストを入力';

        block.appendChild(text);

        return block;
    }
}