export class ListBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block list-block p-2 rounded';

        const list = document.createElement('ul');
        list.className = 'editor-list';

        for (let i = 0; i < 3; i++) {
            const item = document.createElement('li');

            item.contentEditable = 'true';
            item.textContent = 'リスト項目';

            list.appendChild(item);
        }

        block.appendChild(list);
        block.dataset.type = 'list';
        block.dataset.listStyle = 'disc';
        block.dataset.listFontSize = '16';

       return block;
    }
}