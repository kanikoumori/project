export class DividerBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block divider-block';
        block.dataset.type = 'divider';
        block.dataset.dividerThickness = '2';
        block.dataset.dividerStyle = 'solid';
        block.dataset.dividerColor = '#000000';
        block.dataset.dividerMargin = '10';

        const divider = document.createElement('hr');

        divider.className = 'editor-divider-element';

        block.appendChild(divider);

        return block;
    }
}