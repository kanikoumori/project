export class ListBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block list-block p-2 rounded';

        // リスト初期値
        block.dataset.type = 'list';
        block.dataset.listStyle = 'disc';
        block.dataset.listFontSize = '16';

        block.innerHTML = `
            <ul class="editor-list">
                <li contenteditable="true">リスト項目</li>
                <li contenteditable="true">リスト項目</li>
                <li contenteditable="true">リスト項目</li>
            </ul>
        `;

       return block;
    }
}