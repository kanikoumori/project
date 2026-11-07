export class HeadingBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        block.dataset.type = 'heading';
        block.dataset.tag = 'h1';
        block.dataset.align = 'left';
        block.dataset.lineHeight = '1.3';
        block.dataset.letterSpacing = '0px';
        block.dataset.italic = 'false';
        block.dataset.underline = 'false';
        block.dataset.strike = 'false';

        const heading = document.createElement('h1');

        heading.contentEditable = 'true';
        heading.className = 'editor-heading';
        heading.textContent = '見出しを入力';

        block.appendChild(heading);

        return block;
    }
}