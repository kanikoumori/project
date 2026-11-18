export class BlockSerializer {

    serialize() {

        const canvas = document.getElementById('canvas');

        return this.serializeChildren(canvas);
    }

    serializeChildren(parent) {

        if (!parent) return [];

        const blocks = Array.from(parent.children)
            .filter(element => element.classList.contains('block'));

        const blocksData = [];

        blocks.forEach((block, index) => {
            const type = block.dataset.type;


            let data = {
                type,
                sortOrder: index,
                data: {}
            };

            const allowedHtmlTags = [
                'div',
                'header',
                'nav',
                'main',
                'footer',
                'address'
            ];

            const htmlTag = allowedHtmlTags.includes(block.dataset.htmlTag)
                ? block.dataset.htmlTag
                : 'div';

        const saveBlockSettings = () => {
            const widthValue = Number(block.dataset.blockWidth);

            let width = block.dataset.blockWidth !== undefined
                && Number.isFinite(widthValue)
                ? Math.max(1, Math.min(100, widthValue))
                : 100;

            // 自由配置の場合は、実際に表示されている幅を保存
            if (block.classList.contains('free-positioned')) {
                const canvasWidth = block.parentElement?.clientWidth || 0;

                if (canvasWidth > 0) {
                    width = Math.max(
                        1,
                        Math.min(100, block.getBoundingClientRect().width / canvasWidth * 100)
                    );
                }
            }

            const heightValue = Number(block.dataset.blockHeight);

            const height = block.dataset.blockHeight !== undefined
                && Number.isFinite(heightValue)
                ? Math.max(1, Math.min(2000, heightValue))
                : null;


            const getMargin = (direction) => {
                const key =
                    `blockMargin${direction.charAt(0).toUpperCase()}${direction.slice(1)}`;

                const value = Number(block.dataset[key]);

                return block.dataset[key] !== undefined &&
                    Number.isFinite(value)
                    ? Math.max(0, Math.min(500, value))
                    : 0;
            };
                        // 内側余白（padding）の保存用データ
            const getPadding = (direction) => {
                const key =
                    `blockPadding${direction.charAt(0).toUpperCase()}${direction.slice(1)}`;

                const value = Number(block.dataset[key]);

                return block.dataset[key] !== undefined &&
                    Number.isFinite(value)
                    ? Math.max(0, Math.min(500, value))
                    : 16;
            };


        data.data.blockSettings = {
            htmlTag,
            width,
            height,
            border: {
            width: (() => {
                const value = Number(block.dataset.blockBorderWidth);

                return block.dataset.blockBorderWidth !== undefined &&
                    Number.isFinite(value)
                    ? Math.max(0, Math.min(20, value))
                    : 0;
            })(),

            color: /^#[0-9a-fA-F]{6}$/.test(
                block.dataset.blockBorderColor || ''
            )
                ? block.dataset.blockBorderColor
                : '#000000',

            style: ['solid', 'dashed', 'dotted', 'double'].includes(
                block.dataset.blockBorderStyle
            )
                ? block.dataset.blockBorderStyle
                : 'solid'
},
                borderRadius: (() => {
                const value = Number(block.dataset.blockBorderRadius);

                return block.dataset.blockBorderRadius !== undefined &&
                    Number.isFinite(value)
                        ? Math.max(0, Math.min(200, value))
                        : 12;
            })(),
            opacity: (() => {
                const value = Number(block.dataset.blockOpacity);

                return block.dataset.blockOpacity !== undefined &&
                    Number.isFinite(value)
                        ? Math.max(0, Math.min(100, value))
                        : 100;
            })(),
                        margin: {
                top: getMargin('top'),
                right: getMargin('right'),
                bottom: getMargin('bottom'),
                left: getMargin('left')
            },
            padding: {
                top: getPadding('top'),
                right: getPadding('right'),
                bottom: getPadding('bottom'),
                left: getPadding('left')
            },
            position: {
                mode: block.classList.contains('free-positioned')
                    ? 'free'
                    : 'normal',

        x: block.classList.contains('free-positioned')
            ? (() => {
                const canvas = block.parentElement;
                if (!canvas || canvas.clientWidth <= 0) return 0;

                const blockRect = block.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();

                const xPixels =
                    blockRect.left - canvasRect.left + canvas.scrollLeft;

                return Math.max(
                    0,
                    xPixels / canvas.clientWidth * 100
                );
            })()
            : 0,

                y: block.classList.contains('free-positioned')
                    ? Math.max(0, parseFloat(block.style.top) || 0)
                    : 0
            }

        };

        };
            // コンテナ
            if (type === 'container') {

                data.data = {
                    style: {
                        direction:
                            block.dataset.direction || 'column',

                        justifyContent:
                            block.dataset.justifyContent || 'flex-start',

                        alignItems:
                            block.dataset.alignItems || 'stretch',

                        gap:
                            block.dataset.gap ?? '16',

                        wrap:
                            block.dataset.wrap || 'nowrap'
                    },

                    children: this.serializeChildren(
                        block.querySelector(':scope > .container-content')
                    )
                };

                saveBlockSettings();

                blocksData.push(data);

                return;
            }
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
                saveBlockSettings();
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
                        hrEnabled: block.dataset.hrEnabled === 'true',
                        hrThickness: block.dataset.hrThickness || '1',
                        hrColor: block.dataset.hrColor || '#000000',
                        hrStyle: block.dataset.hrStyle || 'solid',
                        hrMargin: block.dataset.hrMargin || '10',
                    }
                };

                saveBlockSettings();
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
                            listFontSize: block.dataset.listFontSize || '16',
                            listBold: block.dataset.listBold || 'false',
                            listItalic: block.dataset.listItalic || 'false',
                            listUnderline: block.dataset.listUnderline || 'false',
                            listStrike: block.dataset.listStrike || 'false'
                        }
                };
                saveBlockSettings();
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
                saveBlockSettings();
                blocksData.push(data);
                return;
            }
            if (type === 'embed') {

                data.data = {
                    embedType: block.dataset.embedType || 'youtube',
                    url: block.dataset.embedUrl || '',
                    style: {
                        embedWidth: block.dataset.embedWidth || '100',
                        embedHeight: block.dataset.embedHeight || '400'
                    }
            };
        saveBlockSettings();
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
            saveBlockSettings();
            blocksData.push(data);
            return;
            }



        if (type === 'form') {

            data.data = {
                value: block.dataset.value || '',

                // 入力欄のラベル
                label: block.dataset.label || '',

                style: {
                    placeholder:
                        block.dataset.placeholder || '入力してください',

                    inputType:
                        block.dataset.inputType || 'text',
                    // 数値入力の最小値
                    min: block.dataset.min ?? '',

                    // 数値入力の最大値
                    max: block.dataset.max ?? ''
                }
            };

            saveBlockSettings();
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

            saveBlockSettings();
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

        saveBlockSettings();
    blocksData.push(data);
    return;
    }

        });

        return blocksData;
    }
}