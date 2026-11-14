
export class TableBlock {
    static create() {
        const block = document.createElement('div');

        block.className = 'block table-block p-2 rounded';

        const table = document.createElement('table');
        table.className = 'editor-table';

        const tbody = document.createElement('tbody');

        // 初期状態：3行・3列
        for (let i = 0; i < 3; i++) {
            const tr = document.createElement('tr');

            for (let j = 0; j < 3; j++) {
                const td = document.createElement('td');

                td.contentEditable = 'true';
                td.textContent = 'テキスト';

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        block.appendChild(table);

        block.dataset.type = 'table';
        block.dataset.tableRows = '3';
        block.dataset.tableColumns = '3';
        block.dataset.tableBorderStyle = 'solid';
        block.dataset.tableTextColor = '#000000';
        block.dataset.tableBackgroundColor = '#ffffff';

        return block;
    }
}
