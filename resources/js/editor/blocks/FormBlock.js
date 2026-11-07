export class FormBlock {
    static create(data = {}) {
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        block.dataset.type = 'form';
        block.dataset.placeholder = data.placeholder || '入力してください';
        block.dataset.value = data.value || '';

        const input = document.createElement('input');

        input.type = 'text';
        input.className = 'editor-input';
        input.placeholder = block.dataset.placeholder;
        input.value = block.dataset.value;

        input.addEventListener('input', (e) => {
            block.dataset.value = e.target.value;
        });

        block.appendChild(input);

        return block;
    }
}