
export class BlockRenderer {

    /**
     * ブロックの共通HTML生成
     * @param {Object} block 保存データ
     * @param {Object} options 表示モード
     * @returns {HTMLElement|null}
     */
    static create(block, { mode = 'preview' } = {}) {

        if (!block || typeof block !== 'object') {
            return null;
        }

        const data = block.data || {};
        const style = data.style || {};
        const isEditor = mode === 'editor';

        const wrapper = document.createElement('div');

        wrapper.className = isEditor
            ? 'block'
            : 'preview-block';

        wrapper.dataset.type = block.type;

        if (block.type === 'list') {
            wrapper.classList.add('list-block');
        }

        if (block.type === 'divider') {
            wrapper.classList.add('divider-block');
        }

        if (block.type === 'table') {
            wrapper.classList.add('table-block');
        }

        const editable = isEditor;

        switch (block.type) {

            // 見出し
            case 'heading': {
                const tag = /^h[1-6]$/.test(data.tag)
                    ? data.tag
                    : 'h1';

                const heading = document.createElement(tag);

                heading.className = 'editor-heading';
                heading.textContent = data.content || '';
                heading.contentEditable = String(editable);

                wrapper.dataset.tag = tag;
                wrapper.dataset.color = style.color || '#000000';
                wrapper.dataset.bold = String(style.bold === true || style.bold === 'true');
                wrapper.dataset.italic =String(style.italic === true || style.italic === 'true');
                wrapper.dataset.underline = String(style.underline === true || style.underline === 'true');
                wrapper.dataset.strike =String(style.strike === true || style.strike === 'true');
                wrapper.dataset.align = style.align || 'left';
                wrapper.dataset.lineHeight = style.lineHeight ?? 1.3;
                wrapper.dataset.letterSpacing = style.letterSpacing || '0px';

                this.applyTextStyle(heading, style, 1.3);
                wrapper.style.textAlign = style.align || 'left';

                wrapper.appendChild(heading);
                break;
            }

            // テキスト
            case 'text': {
                const text = document.createElement('p');

                text.className = 'editor-text';
                text.textContent = data.content || '';
                text.contentEditable = String(editable);

                wrapper.dataset.color = style.color || '#000000';
                wrapper.dataset.fontSize = style.fontSize ?? 16;
                wrapper.dataset.bold = String(style.bold === true || style.bold === 'true');
                wrapper.dataset.italic =String(style.italic === true || style.italic === 'true');
                wrapper.dataset.underline =String(style.underline === true || style.underline === 'true');
                wrapper.dataset.strike = String(style.strike === true || style.strike === 'true');
                wrapper.dataset.align = style.align || 'left';
                wrapper.dataset.lineHeight = style.lineHeight ?? 1.7;
                wrapper.dataset.letterSpacing = style.letterSpacing || '0px';

                const height = Number(style.height);

                if (
                    style.height !== null &&
                    style.height !== undefined &&
                    style.height !== '' &&
                    Number.isFinite(height) &&
                    height > 0
                ) {
                    wrapper.dataset.height = height;
                    wrapper.style.height = `${height}px`;
                }

                this.applyTextStyle(text, style, 1.7);
                text.style.fontSize = `${Number(style.fontSize) || 16}px`;

                wrapper.style.textAlign = style.align || 'left';

                                wrapper.appendChild(text);

                // テキストブロック内の区切り線を描画
                const hrEnabled =
                    style.hrEnabled === true ||
                    style.hrEnabled === 'true';

                wrapper.dataset.hrEnabled = String(hrEnabled);

                wrapper.dataset.hrThickness = style.hrThickness || '1';
                wrapper.dataset.hrColor = style.hrColor || '#000000';
                wrapper.dataset.hrStyle = style.hrStyle || 'solid';
                wrapper.dataset.hrMargin = style.hrMargin ?? 10;

                if (hrEnabled) {
                    const divider = document.createElement('hr');

                    divider.className = 'editor-text-divider';

                    const thickness = Math.min(20, Math.max(
                        1,
                        Number(style.hrThickness) || 1
                    ));

                    const allowedStyles = [
                        'solid',
                        'dashed',
                        'dotted',
                        'double'
                    ];

                    const hrStyle = allowedStyles.includes(style.hrStyle)
                        ? style.hrStyle
                        : 'solid';

                    const margin = Math.min(100, Math.max(
                        0,
                        Number(style.hrMargin) || 0
                    ));

                    divider.style.border = 'none';
                    divider.style.borderTop =
                        `${thickness}px ${hrStyle} ${style.hrColor || '#000000'}`;

                    divider.style.margin = `${margin}px 0`;
                    divider.style.width = '100%';
                    divider.style.boxSizing = 'border-box';

                    wrapper.appendChild(divider);
                }

                break;
            }

            // リスト
            case 'list': {
                const list = document.createElement('ul');

                list.className = 'editor-list';

                const listColor = style.listColor || '#000000';
                const listStyle = style.listStyle || 'disc';
                const listPosition = style.listPosition || 'outside';
                const listFontSize = Number(style.listFontSize) || 16;

                wrapper.dataset.listColor = listColor;
                wrapper.dataset.listStyle = listStyle;
                wrapper.dataset.listPosition = listPosition;
                wrapper.dataset.listFontSize = listFontSize;
                const listBold = style.listBold === true || style.listBold === 'true';
                const listItalic = style.listItalic === true || style.listItalic === 'true';
                const listUnderline = style.listUnderline === true || style.listUnderline === 'true';
                const listStrike = style.listStrike === true || style.listStrike === 'true';

                wrapper.dataset.listBold = String(listBold);
                wrapper.dataset.listItalic = String(listItalic);
                wrapper.dataset.listUnderline = String(listUnderline);
                wrapper.dataset.listStrike = String(listStrike);;

                list.style.listStyleType = listStyle;
                list.style.listStylePosition = listPosition;
                list.style.color = listColor;
                list.style.fontSize = `${listFontSize}px`;

                (Array.isArray(data.items) ? data.items : []).forEach(item => {
                    const li = document.createElement('li');

                    li.textContent = item;
                    li.contentEditable = String(editable);
                    li.style.fontSize = `${listFontSize}px`;
                    li.style.fontWeight = listBold ? '700' : '400';
                    li.style.fontStyle = listItalic ? 'italic' : 'normal';

                    li.style.textDecoration = [
                        listUnderline ? 'underline' : '',
                        listStrike ? 'line-through' : ''
                    ].filter(Boolean).join(' ');
                    list.appendChild(li);
                });

                wrapper.appendChild(list);
                break;
            }

            // ボタン
            case 'button': {
                const button = document.createElement('a');

                button.className = 'editor-button';
                button.textContent = data.label || 'ボタン';

                const width = Number(style.buttonWidth) || 150;
                const height = Number(style.buttonHeight) || 48;

                button.style.display = 'inline-flex';
                button.style.width = `${width}px`;
                button.style.height = `${height}px`;
                button.style.lineHeight = 'normal';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                button.style.textAlign = 'center';
                button.style.backgroundColor = style.buttonColor || '#5B9DFF';
                button.style.color = style.buttonTextColor || '#ffffff';
                button.style.borderRadius = `${Number(style.buttonRadius ?? 12)}px`;
                button.style.border = `${Number(style.buttonBorderWidth) || 0}px ${style.buttonBorderStyle || 'solid'} ${style.buttonBorderColor || '#000000'}`;
                button.style.textDecoration = 'none';
                button.style.boxSizing = 'border-box';

                button.contentEditable = String(editable);

                if (!isEditor && this.isSafeUrl(data.url)) {
                    button.href = data.url;
                }

                wrapper.dataset.buttonColor = style.buttonColor || '#5B9DFF';
                wrapper.dataset.buttonTextColor = style.buttonTextColor || '#ffffff';
                wrapper.dataset.buttonRadius = style.buttonRadius ?? 12;
                wrapper.dataset.buttonWidth = width;
                wrapper.dataset.buttonHeight = height;
                wrapper.dataset.buttonBorderWidth = style.buttonBorderWidth ?? 0;
                wrapper.dataset.buttonBorderColor = style.buttonBorderColor || '#000000';
                wrapper.dataset.buttonBorderStyle = style.buttonBorderStyle || 'solid';
                wrapper.dataset.url = data.url || '';

                wrapper.appendChild(button);
                break;
            }

            // 画像
            case 'image': {
                const src = data.src || '';
                const width = Number(style.imageWidth) || 100;
                const align = ['left', 'center', 'right'].includes(style.imageAlign)
                    ? style.imageAlign
                    : 'left';
                const radius = Number(style.imageRadius) || 0;
                const opacity = Math.min(
                    100,
                    Math.max(0, Number(style.imageOpacity ?? 100))
                );

                wrapper.dataset.src = src;
                wrapper.dataset.imageWidth = width;
                wrapper.dataset.imageAlign = align;
                wrapper.dataset.imageRadius = radius;
                wrapper.dataset.imageOpacity = opacity;
                wrapper.dataset.alt = data.alt || '';

                if (this.isSafeUrl(src)) {
                    const image = document.createElement('img');

                    image.className = 'editor-image';
                    image.src = src;
                    image.alt = data.alt || '';
                    image.style.width = `${width}%`;
                    image.style.borderRadius = `${radius}px`;
                    image.style.opacity = String(opacity / 100);
                    image.style.display = 'block';

                    image.style.marginLeft =
                        align === 'center' || align === 'right' ? 'auto' : '0';

                    image.style.marginRight =
                        align === 'center' || align === 'left' ? 'auto' : '0';

                    wrapper.appendChild(image);
                } else {
                    const placeholder = document.createElement('div');

                    placeholder.className = 'editor-image-placeholder';
                    placeholder.textContent = '画像を選択してください';

                    wrapper.appendChild(placeholder);
                }

                break;
            }

            // 入力欄
            case 'form': {
                const input = document.createElement('input');

                const allowedTypes = [
                    'text',
                    'email',
                    'number',
                    'tel',
                    'url'
                ];

                input.className = 'editor-input';
                input.type = allowedTypes.includes(style.inputType)
                    ? style.inputType
                    : 'text';

                input.placeholder = style.placeholder || '入力してください';
                input.value = data.value || '';
                input.disabled = !isEditor;

                wrapper.dataset.inputType = input.type;
                wrapper.dataset.placeholder = input.placeholder;
                wrapper.dataset.value = input.value;

                if (isEditor) {
                    input.addEventListener('input', () => {
                        wrapper.dataset.value = input.value;

                        wrapper.dispatchEvent(new Event('input', {
                            bubbles: true
                        }));
                    });
                }

                wrapper.appendChild(input);
                break;
            }

            // 区切り線
            case 'divider': {
                const divider = document.createElement('hr');

                const thickness = Number(style.dividerThickness) || 2;
                const color = style.dividerColor || '#000000';
                const lineStyle = style.dividerStyle || 'solid';
                const margin = Number(style.dividerMargin ?? 10);

                divider.className = 'editor-divider-element';
                divider.style.border = 'none';
                divider.style.borderTop = `${thickness}px ${lineStyle} ${color}`;
                divider.style.margin = `${margin}px 0`;

                wrapper.dataset.dividerStyle = lineStyle;
                wrapper.dataset.dividerThickness = thickness;
                wrapper.dataset.dividerColor = color;
                wrapper.dataset.dividerMargin = margin;

                wrapper.appendChild(divider);
                break;
            }

            // テーブル
            case 'table': {
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');

                table.className = 'editor-table';

                const rows = Array.isArray(data.rows) ? data.rows : [];
                const rowCount = rows.length || 3;

                const columnCount = rows.length
                    ? Math.max(1, ...rows.map(row =>
                        Array.isArray(row)
                            ? row.reduce((sum, cell) => {
                                if (cell?.mergedCells === 'hidden') return sum;

                                return sum + Math.max(
                                    1,
                                    Number(
                                        typeof cell === 'object' && cell !== null
                                            ? cell.colspan
                                            : 1
                                    ) || 1
                                );
                            }, 0)
                            : 0
                    ))
                    : 3;

                const savedWidths = Array.isArray(style.tableColumnWidths)
                    ? style.tableColumnWidths
                    : [];

                const savedHeights = Array.isArray(style.tableRowHeights)
                    ? style.tableRowHeights
                    : [];

                const columnWidths = Array.from(
                    { length: columnCount },
                    (_, i) => {
                        const width = Number(savedWidths[i]) || 150;
                        return Math.min(500, Math.max(50, width));
                    }
                );

                const rowHeights = Array.from(
                    { length: rowCount },
                    (_, i) => {
                        const height = Number(savedHeights[i]) || 60;
                        return Math.min(300, Math.max(30, height));
                    }
                );

                wrapper.dataset.tableRows = String(rowCount);
                wrapper.dataset.tableColumns = String(columnCount);

                wrapper.dataset.tableBorderStyle = style.tableBorderStyle || 'solid';
                wrapper.dataset.tableTextColor = style.tableTextColor || '#000000';
                wrapper.dataset.tableBackgroundColor = style.tableBackgroundColor || '#ffffff';
                wrapper.dataset.tableColumnWidths = JSON.stringify(columnWidths);
                wrapper.dataset.tableRowHeights = JSON.stringify(rowHeights);

                if (columnWidths.length) {
                    const colgroup = document.createElement('colgroup');

                    columnWidths.forEach(width => {
                        const col = document.createElement('col');
                        col.style.width = `${Number(width) || 150}px`;
                        colgroup.appendChild(col);
                    });

                    table.appendChild(colgroup);
                }

                const displayRows = rows.length
                    ? rows
                    : Array.from({ length: 3 }, () =>
                        Array.from({ length: 3 }, () => ({
                            text: 'テキスト'
                        }))
                    );

                displayRows.forEach((row, rowIndex) => {
                    const tr = document.createElement('tr');
                    const rowHeight = Number(rowHeights[rowIndex]);

                    if (rowHeight > 0) {
                        tr.style.height = `${rowHeight}px`;
                    }

                    (Array.isArray(row) ? row : []).forEach(cell => {
                        if (cell?.mergedCells === 'hidden') return;

                        const td = document.createElement('td');

                        const cellData = typeof cell === 'string'
                            ? { text: cell }
                            : (cell || {});

                        td.textContent = cellData.text || '';
                        td.colSpan = Math.max(1, Number(cellData.colspan) || 1);
                        td.rowSpan = Math.max(1, Number(cellData.rowspan) || 1);

                        td.style.color =
                            cellData.textColor ||
                            style.tableTextColor ||
                            '#000000';

                        td.style.backgroundColor =
                            cellData.backgroundColor ||
                            style.tableBackgroundColor ||
                            '#ffffff';

                        td.style.border =
                            cellData.border ||
                            `1px ${style.tableBorderStyle || 'solid'} #000000`;

                        td.contentEditable = String(editable);

                        if (rowHeight > 0) {
                            td.style.height = `${rowHeight}px`;
                        }

                        if (isEditor) {
                            td.dataset.mergedCells = cellData.mergedCells || '';
                        }

                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
                table.style.borderCollapse = 'collapse';
                table.style.border = `1px ${style.tableBorderStyle || 'solid'} #000000`;

                wrapper.appendChild(table);
                break;
            }

            default:
                return null;
        }

        return wrapper;
    }

    /**
     * 見出し・テキスト共通の文字スタイル
     */
    static applyTextStyle(element, style, defaultLineHeight = 1.5) {

        const bold = style.bold === true || style.bold === 'true';
        const italic = style.italic === true || style.italic === 'true';
        const underline = style.underline === true || style.underline === 'true';
        const strike = style.strike === true || style.strike === 'true';

        element.style.color = style.color || '#000000';
        element.style.fontWeight = bold ? '700' : '400';
        element.style.fontStyle = italic ? 'italic' : 'normal';

        element.style.textDecoration = [
            underline ? 'underline' : '',
            strike ? 'line-through' : ''
        ].filter(Boolean).join(' ');

        element.style.textAlign = style.align || 'left';

        // 行間を1.0～3.0に制限
        let lineHeight = Number(style.lineHeight);

        if (!Number.isFinite(lineHeight)) {
            lineHeight = defaultLineHeight;
        }

        lineHeight = Math.max(1.0, Math.min(3.0, lineHeight));

        element.style.lineHeight = lineHeight;
        element.style.letterSpacing = style.letterSpacing || '0px';
    }
    /**
     * 安全なURLか確認
     */
    static isSafeUrl(url) {

        if (typeof url !== 'string' || !url.trim()) {
            return false;
        }

        const value = url.trim();

        if (/^data:image\/(?:png|jpe?g|gif|webp);base64,[A-Za-z0-9+/]+={0,2}$/i.test(value)) {
            return true;
        }

        try {
            const parsed = new URL(value, window.location.origin);

            return ['http:', 'https:'].includes(parsed.protocol);
        } catch {
            return false;
        }
    }
}
