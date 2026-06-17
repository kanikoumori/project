export class TextBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        block.dataset.type = 'text';
        block.dataset.color = '#000000';
        block.dataset.fontSize = '16';
        block.dataset.fontWeight = '400';
        block.dataset.align = 'left';
        block.dataset.italic = 'false';
        block.dataset.underline = 'false';
        block.dataset.strike = 'false';

        block.innerHTML = `
            <p contenteditable="true" class="editor-text">
                テキストを入力
            </p>
        `;

        return block;
    }
}