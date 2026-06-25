export class ListBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        // リスト初期値
        block.dataset.type = 'list';
        block.dataset.listStyle = 'disc';

        block.innerHTML = `
            <ul class="editor-list" contenteditable="true">
                <li contenteditable="true">リスト項目</li>
                <li contenteditable="true">リスト項目</li>
                <li contenteditable="true">リスト項目</li>
            </ul>
        `;

       return block;
    }
}