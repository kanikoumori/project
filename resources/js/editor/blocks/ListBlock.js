export class ListBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block list-block p-2 rounded';

        const list = document.createElement('ul');
        list.className = 'editor-list';
        list.style.color = '#000000';

        for (let i = 0; i < 3; i++) {
            const item = document.createElement('li');

            item.contentEditable = 'true';
            item.textContent = 'リスト項目';
            item.style.color = '#000000';

            list.appendChild(item);
        }

        block.appendChild(list);
        block.dataset.type = 'list';
        block.dataset.listStyle = 'disc';
        block.dataset.listFontSize = '16';
        block.dataset.listPosition = 'outside';
        block.dataset.listColor = '#000000';

       return block;
    }
}