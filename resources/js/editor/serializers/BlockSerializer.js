export class BlockSerializer {
    serialize() {
        const canvas = document.getElementById('canvas');

        const blocks = canvas.querySelectorAll('.block');
        const blocksData = [];

        blocks.forEach((block, index) => {
            const type = block.dataset.type;

            let data = {
                type,
                sortOrder: index,
                data: {}
            };

            if (type === 'heading') {
                const el = block.querySelector('.editor-heading');
                const content = el?.textContent?.trim();

                data.data = {
                    content: content || '',
                    tag: block.dataset.tag || 'h1',
                    style: {
                        color: block.dataset.color,
                        bold: block.dataset.bold === 'true',
                        italic: block.dataset.italic === 'true',
                        underline: block.dataset.underline === 'true',
                        strike: block.dataset.strike === 'true',
                        align: block.dataset.align || 'left',
                        lineHeight: block.dataset.lineHeight || '1.3',
                        letterSpacing: block.dataset.letterSpacing || '0px'
                    }
                };
                blocksData.push(data);
                return;
            }

            if (type === 'text') {
                const el = block.querySelector('.editor-text');
                const content = el?.textContent?.trim();

                data.data = {
                    content: content || '',
                    style: {
                        color: block.dataset.color,
                        fontSize: block.dataset.fontSize,
                        bold: block.dataset.bold === 'true',
                        italic: block.dataset.italic === 'true',
                        underline: block.dataset.underline === 'true',
                        strike: block.dataset.strike === 'true',
                        align: block.dataset.align || 'left',
                        lineHeight: block.dataset.lineHeight || '1.7',
                        letterSpacing: block.dataset.letterSpacing || '0px',
                        height: block.dataset.height || '',
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'list') {
                 const items = [...block.querySelectorAll('li')]
                    .map(li => li.textContent.trim())
                    .filter(text => text);

                data.data = {
                    items,
                    style: {
                        listStyle: block.dataset.listStyle || 'disc',
                        listPosition: block.dataset.listPosition || 'outside',
                        listColor: block.dataset.listColor || '#000000',
                        listFontSize: block.dataset.listFontSize || '16'
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'button') {
                const el = block.querySelector('.editor-button');
                const content = el?.textContent?.trim();

                data.data = {
                    label: content || '',
                    url: block.dataset.url || '',
                    style: {
                        buttonColor: block.dataset.buttonColor,
                        buttonTextColor: block.dataset.buttonTextColor,
                        buttonRadius: block.dataset.buttonRadius,
                        buttonWidth: block.dataset.buttonWidth || '150',
                        buttonHeight: block.dataset.buttonHeight || '48',
                        buttonBorderWidth: block.dataset.buttonBorderWidth || '0',
                        buttonBorderColor: block.dataset.buttonBorderColor || '#000000',
                        buttonBorderStyle: block.dataset.buttonBorderStyle || 'solid'
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'image') {
                data.data = {
                    src: block.dataset.src || '',
                    alt: block.dataset.alt || '',
                    style: {
                        imageWidth: block.dataset.imageWidth || '100',
                        imageAlign: block.dataset.imageAlign || 'left',
                        imageRadius: block.dataset.imageRadius || '0',
                        imageOpacity: block.dataset.imageOpacity ?? '100'
                    }
                };

                blocksData.push(data);
                return;
            }
        

            if (type === 'form') {

                data.data = {
                    value: block.dataset.value || '',

                    style: {
                        placeholder:
                            block.dataset.placeholder || '入力してください',

                        inputType:
                            block.dataset.inputType || 'text'
                    }
                };

                blocksData.push(data);
                return;
            }
            // 独立した区切り線
        if (type === 'divider') {

            data.data = {
                style: {
                    dividerStyle:
                        block.dataset.dividerStyle || 'solid',

                    dividerThickness:
                        block.dataset.dividerThickness || '2',
                    
                    dividerColor:
                        block.dataset.dividerColor || '#000000',
                    
                    dividerMargin:
                        block.dataset.dividerMargin ?? '10'
                }
            };

            blocksData.push(data);
            return;
        }
                        // テーブル
    if (type === 'table') {

        const table = block.querySelector('.editor-table');

        const rows = table
            ? [...table.querySelectorAll('tr')].map(tr =>
                [...tr.querySelectorAll('td, th')].map(cell => ({
                    text: cell.textContent,

                    textColor: cell.style.color || '',

                    backgroundColor: cell.style.backgroundColor || '',

                    border: cell.style.border || '',

                    colspan: Number(cell.colSpan) || 1,

                    rowspan: Number(cell.rowSpan) || 1,

                    mergedCells: cell.dataset.mergedCells || null
                }))
            )
            : [];

        let columnWidths = [];
        let rowHeights = [];

        try {
            columnWidths = JSON.parse(
                block.dataset.tableColumnWidths || '[]'
            );

            rowHeights = JSON.parse(
                block.dataset.tableRowHeights || '[]'
            );
        } catch {
            columnWidths = [];
            rowHeights = [];
        }

        data.data = {
            rows,
            style: {
                tableBorderStyle:
                    block.dataset.tableBorderStyle || 'solid',

                tableTextColor:
                    block.dataset.tableTextColor || '#000000',

                tableBackgroundColor:
                    block.dataset.tableBackgroundColor || '#ffffff',

                tableColumnWidths: columnWidths,

                tableRowHeights: rowHeights
            }
        };

        blocksData.push(data);
        return;
    }

        });

        return blocksData;
    }
}