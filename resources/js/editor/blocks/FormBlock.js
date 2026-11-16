
export class FormBlock {
    static create(data = {}) {
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        block.dataset.type = 'form';
        block.dataset.placeholder = data.placeholder ?? '入力してください';
        block.dataset.value = data.value ?? '';

        // ラベルの設定
        block.dataset.label = data.label ?? '';

        const label = document.createElement('label');
        label.className = 'editor-form-label';
        label.textContent = block.dataset.label;

        // ラベルが空の場合は非表示
        label.style.display = block.dataset.label ? 'block' : 'none';

        block.appendChild(label);


        // 入力タイプ
        const allowedTypes = [
            'text',
            'email',
            'tel',
            'password',
            'number'
        ];

        block.dataset.inputType = allowedTypes.includes(data.inputType)
            ? data.inputType
            : 'text';

        const input = document.createElement('input');

        input.type = block.dataset.inputType;
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
