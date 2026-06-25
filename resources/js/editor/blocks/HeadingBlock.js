export class HeadingBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        block.dataset.type = 'heading';
        block.dataset.tag = 'h1';
        block.dataset.align = 'left';
        block.dataset.italic = 'false';
        block.dataset.underline = 'false';
        block.dataset.strike = 'false';

        block.innerHTML = `
            <h1 contenteditable="true" class="editor-heading">
                見出しを入力
            </h1>
        `;

        return block;
    }
}