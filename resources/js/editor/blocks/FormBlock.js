export class FormBlock {
    static create(data = {}) {
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        block.dataset.type = 'form';
        block.dataset.placeholder = data.placeholder || '入力してください';
        block.dataset.value = data.value || '';

        block.innerHTML = `
            <input
                type="text"
                class="editor-input"
                placeholder="${block.dataset.placeholder}"
                value="${block.dataset.value}"
            >
        `;

        const input = block.querySelector('.editor-input');

        // 入力同期（これ必須）
        input.addEventListener('input', (e) => {
            block.dataset.value = e.target.value;
        });

        return block;
    }
}