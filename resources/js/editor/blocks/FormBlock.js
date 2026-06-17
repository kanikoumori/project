export class FormBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        block.dataset.type = 'form';
        block.dataset.placeholder = '入力してください';

        block.innerHTML = `
            <input
                type="text"
                class="editor-input"
                placeholder="入力してください"
            >
        `;
        
        return block;
    }
}