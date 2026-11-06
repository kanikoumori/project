export class DividerBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block divider-block';
        block.dataset.type = 'divider';
        block.dataset.dividerThickness = '2';
        block.dataset.dividerColor = '#000000';
        block.dataset.dividerMargin = '10';

        block.innerHTML = `
            <hr class="editor-divider-element">
        `;

        return block;
    }
}