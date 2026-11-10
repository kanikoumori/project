import { HeadingBlock } from '../blocks/HeadingBlock.js';
import { TextBlock } from '../blocks/TextBlock.js';
import { ListBlock } from '../blocks/ListBlock.js';
import { ButtonBlock } from '../blocks/ButtonBlock.js';
import { ImageBlock } from '../blocks/ImageBlock.js';
import { FormBlock } from '../blocks/FormBlock.js';
import { DividerBlock } from '../blocks/DividerBlock.js';
import { TableBlock } from '../blocks/TableBlock.js';

import { BlockSerializer }
    from '../serializers/BlockSerializer.js';

export class BlockManager {
    constructor(propertyManager, historyManager, selectionManager,editor){
        this.canvas = document.getElementById('canvas');
        this.propertyManager = propertyManager;
        this.historyManager = historyManager;
        this.selectionManager = selectionManager;
        this.editor = editor;
    }

    initialize() {
        this.setupToolbar();
    }

    createFromData(block) {

        switch (block.type) {

            case 'heading':
                return this.addHeadingFromData(block);

            case 'text':
                return this.addTextFromData(block);

            case 'button':
                return this.addButtonFromData(block);

            case 'list':
                return this.addListFromData(block);

            case 'image':
                return this.addImageFromData(block);

            case 'form':
                return this.addFormFromData(block);
            
            case 'divider':
                return this.addDividerFromData(block);
            
            case 'table':
                return this.addTableFromData(block);
        }
    }

    setupBlock(block) {
        let dragHandle =
            block.querySelector('.drag-handle');

        if (!dragHandle) {

            dragHandle = document.createElement('button');

            dragHandle.className = 'drag-handle';
            dragHandle.textContent = '⋮⋮';

            block.prepend(dragHandle);
        }
        let deleteButton =
            block.querySelector('.delete-button');

        if (!deleteButton) {
            deleteButton = document.createElement('button');

            deleteButton.className = 'delete-button';
            deleteButton.textContent = '×';

            block.appendChild(deleteButton);
        }

        if (deleteButton.dataset.bound !== 'true') {

            deleteButton.dataset.bound = 'true';

            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();

                block.remove();

                this.historyManager.save();

                this.editor.markDirty();
            });
        }       

        if (block.dataset.clickBound !== 'true') {

            block.dataset.clickBound = 'true';

            block.addEventListener('click', () => {
                this.selectionManager.select(block);
                this.propertyManager.show(block);
            });
        }
        
         // テキスト編集終了時
        block.querySelectorAll('[contenteditable="true"]')
            .forEach(element => {

                if (element.dataset.blurBound === 'true') return;

                element.dataset.blurBound = 'true';

                element.addEventListener('input', () => {
                    this.editor.markDirty();

                });
                element.addEventListener('blur', () => {
                    this.historyManager.save();
                });
            });
    }

    setupToolbar() {
        document.getElementById('add-heading')
            ?.addEventListener('click', () => this.addHeading());

        document.getElementById('add-text')
            ?.addEventListener('click', () => this.addText());

        document.getElementById('add-list')
            ?.addEventListener('click', () => this.addList());

        document.getElementById('add-button')
            ?.addEventListener('click', () => this.addButton());

        document.getElementById('add-image')
            ?.addEventListener('click', () => this.addImage());

        document.getElementById('add-form')
            ?.addEventListener('click', () => this.addForm());
        
        document.getElementById('add-divider')
            ?.addEventListener('click', () => this.addDivider());
        
        document.getElementById('add-table')
            ?.addEventListener('click', () => this.addTable());
    }

    // ------キャンバス内の追加表示------
    addHeading() {
        const block = HeadingBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addText() {
        const block = TextBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addList() {
        const block = ListBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addButton() {
        const block = ButtonBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addImage() {
        const block = ImageBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addForm() {
        const block = FormBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addDivider() {
        const block = DividerBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addTable() {
        const block = TableBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();
        this.editor.markDirty();
    }

    // 保存復元用
    addHeadingFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block');
        el.dataset.type = 'heading';

        const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        const tag = allowedTags.includes(block.data.tag)
            ? block.data.tag
            : 'h1';

        const heading = document.createElement(tag);

        heading.className = 'editor-heading';
        heading.contentEditable = 'true';
        heading.textContent = block.data.content || '';

        el.appendChild(heading);

        const style = block.data.style || {};

        el.dataset.tag = tag;
        el.dataset.color = style.color;
        el.dataset.bold = style.bold;
        el.dataset.italic = style.italic;
        el.dataset.underline = style.underline;
        el.dataset.strike = style.strike;
        el.dataset.align = style.align;
        el.dataset.lineHeight = style.lineHeight || '1.0';
        el.dataset.letterSpacing = style.letterSpacing || '0px';

        heading.style.color = style.color || '';
        heading.style.lineHeight = style.lineHeight || '1.0';
        heading.style.letterSpacing = style.letterSpacing || '0px';

        heading.style.fontWeight =
            style.bold ? '700' : '400';

        heading.style.fontStyle =
            style.italic ? 'italic' : 'normal';

        heading.style.textDecoration = [
            style.underline ? 'underline' : '',
            style.strike ? 'line-through' : ''
        ]
        .filter(Boolean)
        .join(' ');

        el.style.textAlign =
            style.align || 'left';

        this.setupBlock(el);

        document
            .getElementById('canvas')
            .appendChild(el);
    }

    addTextFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block');
        el.dataset.type = 'text';

        const text = document.createElement('p');

        text.className = 'editor-text';
        text.contentEditable = 'true';
        text.textContent = block.data.content || '';

        el.appendChild(text);

        const style = block.data.style || {};

        el.dataset.color = style.color;
        el.dataset.fontSize = style.fontSize;
        el.dataset.bold = String(style.bold);
        el.dataset.italic = style.italic;
        el.dataset.underline = style.underline;
        el.dataset.strike = style.strike;
        el.dataset.align = style.align;
        el.dataset.lineHeight = style.lineHeight || '1.0';
        el.dataset.letterSpacing = style.letterSpacing || '0px';

        // ブロックの高さを復元
        el.dataset.height = style.height || '';

        if (style.height) {
            el.style.height = `${style.height}px`;
        }


        text.style.color = style.color || '#000000';

        text.style.fontSize =
            (style.fontSize || 16) + 'px';
        text.style.lineHeight = style.lineHeight || '1.0';
        text.style.letterSpacing = style.letterSpacing || '0px';

        text.style.fontStyle =
            style.italic ? 'italic' : 'normal';

        text.style.fontWeight =
            style.bold ? '700' : '400';

        text.style.textDecoration = [
            style.underline ? 'underline' : '',
            style.strike ? 'line-through' : ''
        ]
        .filter(Boolean)
        .join(' ');

        el.style.textAlign =
            style.align || 'left';

        this.setupBlock(el);

        document.getElementById('canvas').appendChild(el);
    }

    addListFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block', 'list-block');
        el.dataset.type = 'list';

        const style = block.data.style || {};

        const listColor = style.listColor || '#000000';
        const listStyle = style.listStyle || 'disc';
        const listFontSize = style.listFontSize || '16';
        const listPosition = style.listPosition || 'outside';

        // リスト本体を作成
        const ul = document.createElement('ul');

        ul.className = 'editor-list';
        ul.style.listStyleType = listStyle;
        ul.style.color = listColor;
        ul.style.listStylePosition = listPosition;

        // 保存されたリスト項目を復元
        const items = Array.isArray(block.data.items)
            ? block.data.items
            : [];

        items.forEach((item) => {
            const li = document.createElement('li');

            li.contentEditable = 'true';
            li.textContent = item || '';
            li.style.fontSize = `${listFontSize}px`;

            ul.appendChild(li);
    });

    el.appendChild(ul);

    // 設定値を保存
    el.dataset.listStyle = listStyle;
    el.dataset.listColor = listColor;
    el.dataset.listFontSize = listFontSize;
    el.dataset.listPosition = listPosition;

    this.setupBlock(el);
    this.canvas.appendChild(el);
}

    addButtonFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block');
        el.dataset.type = 'button';

        const style = block.data.style || {};

        // ボタンの幅・高さを取得
        const buttonWidth = Math.min(
            500,
            Math.max(50, Number(style.buttonWidth) || 150)
        );

        const buttonHeight = Math.min(
            200,
            Math.max(20, Number(style.buttonHeight) || 48)
        );

        // 枠線の太さを取得
        const buttonBorderWidth = Math.min(
            10,
            Math.max(0, Number(style.buttonBorderWidth) || 0)
        );

        // 枠線の色を取得
        const buttonBorderColor =
            /^#[0-9a-fA-F]{6}$/.test(style.buttonBorderColor || '')
                ? style.buttonBorderColor
                : '#000000';

        // 枠線の種類を取得
        const allowedBorderStyles = ['solid', 'dashed', 'dotted'];

        const buttonBorderStyle = allowedBorderStyles.includes(
            style.buttonBorderStyle
        )
            ? style.buttonBorderStyle
            : 'solid';

        // ボタン本体を作成
        const btn = document.createElement('button');

        btn.className = 'editor-button';
        btn.contentEditable = 'true';
        btn.textContent = block.data.label || 'ボタン';

        // ボタンの設定を復元
        btn.style.backgroundColor =
            style.buttonColor || '#5B9DFF';

        btn.style.color =
            style.buttonTextColor || '#ffffff';

        btn.style.borderRadius =
            `${style.buttonRadius ?? 12}px`;

        btn.style.width = `${buttonWidth}px`;
        btn.style.height = `${buttonHeight}px`;

        // 枠線を復元
        btn.style.border =
            `${buttonBorderWidth}px ${buttonBorderStyle} ${buttonBorderColor}`;

        btn.style.boxSizing = 'border-box';

        el.appendChild(btn);

        // 設定値を保存
        el.dataset.buttonColor =
            style.buttonColor || '#5B9DFF';

        el.dataset.buttonTextColor =
            style.buttonTextColor || '#ffffff';

        el.dataset.buttonRadius =
            style.buttonRadius ?? '12';

        el.dataset.buttonWidth = String(buttonWidth);
        el.dataset.buttonHeight = String(buttonHeight);

        // 枠線の設定値を保存
        el.dataset.buttonBorderWidth = String(buttonBorderWidth);
        el.dataset.buttonBorderColor = buttonBorderColor;
        el.dataset.buttonBorderStyle = buttonBorderStyle;

        el.dataset.url = block.data.url || '';

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }
    addImageFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block');
        el.dataset.type = 'image';

        const style = block.data.style || {};

        const src = block.data.src || '';
        const imageWidth = style.imageWidth || '100';
        const imageAlign = ['left', 'center', 'right'].includes(style.imageAlign)
            ? style.imageAlign
            : 'left';

        const imageRadius = Math.max(
            0,
            Math.min(50, Number(style.imageRadius) || 0)
        );

        const opacityValue = Number(style.imageOpacity);

        const imageOpacity = Number.isFinite(opacityValue)
            ? Math.max(0, Math.min(100, opacityValue))
            : 100;

        const alt = block.data.alt || '';

        // 画像が保存されている場合
        if (src) {
            const img = document.createElement('img');

            img.className = 'editor-image';
            img.src = src;
            img.style.width = `${imageWidth}%`;
            img.style.borderRadius = `${imageRadius}px`;
            img.style.opacity = String(imageOpacity / 100);
            img.style.display = 'block';
            img.alt = alt;

            // 配置を復元
            if (imageAlign === 'left') {
                img.style.marginLeft = '0';
                img.style.marginRight = 'auto';
            } else if (imageAlign === 'center') {
                img.style.marginLeft = 'auto';
                img.style.marginRight = 'auto';
            } else {
                img.style.marginLeft = 'auto';
                img.style.marginRight = '0';
            }

            el.appendChild(img);

        } else {
            // 画像が未選択の場合
            const placeholder = document.createElement('div');

            placeholder.className = 'editor-image-placeholder';
            placeholder.textContent = '画像を選択してください';

            el.appendChild(placeholder);
        }

        // 設定値を保存
        el.dataset.src = src;
        el.dataset.imageWidth = imageWidth;
        el.dataset.imageAlign = imageAlign;
        el.dataset.imageRadius = String(imageRadius);
        el.dataset.imageOpacity = String(imageOpacity);
        el.dataset.alt = alt;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

    addFormFromData(block) {

        const el = document.createElement('div');

        el.className = 'block p-4 rounded mb-4';
        el.dataset.type = 'form';

        const style = block.data.style || {};

        const input = document.createElement('input');

        input.className = 'editor-input';

        input.type = style.inputType || 'text';
        input.placeholder = style.placeholder || '入力してください';
        input.value = block.data.value || '';

        el.appendChild(input);

        el.dataset.inputType = input.type;
        el.dataset.placeholder = input.placeholder;
        el.dataset.value = input.value;

        input.addEventListener('input', (e) => {
            el.dataset.value = e.target.value;
            this.editor.markDirty();
        });

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }
    // 独立した区切り線の保存復元
    addDividerFromData(block) {

        const el = DividerBlock.create();
        const savedStyle = block.data.style || {};

        // 保存データから設定を取得
        const style =
            savedStyle.dividerStyle || 'solid';

        const thickness =
            savedStyle.dividerThickness || '2';

        const color =
            savedStyle.dividerColor || '#000000';

        const margin =
            savedStyle.dividerMargin ?? '10';

        // 区切り線本体を取得
        const divider =
            el.querySelector('.editor-divider-element');

        // 設定を復元
        if (divider) {
            divider.style.borderTopStyle = style;
            divider.style.borderTopWidth = `${thickness}px`;
            divider.style.borderTopColor = color;
            divider.style.margin = `${margin}px 0`;
        }

        // 設定値を保存
        el.dataset.dividerStyle = style;
        el.dataset.dividerThickness = thickness;
        el.dataset.dividerColor = color;
        el.dataset.dividerMargin = margin;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    } 
            // テーブルの保存データを復元
    
    // テーブルの保存データを復元
    addTableFromData(block) {

        const el = TableBlock.create();

        const table = el.querySelector('.editor-table');

        const savedRows = Array.isArray(block.data.rows)
            ? block.data.rows
            : [];

        const style = block.data.style || {};

        // テーブルの基本設定を復元
        el.dataset.tableBorderStyle =
            style.tableBorderStyle || 'solid';

        el.dataset.tableTextColor =
            style.tableTextColor || '#000000';

        el.dataset.tableBackgroundColor =
            style.tableBackgroundColor || '#ffffff';

        // 保存されたセルを復元
        if (table && savedRows.length > 0) {

            const tbody = document.createElement('tbody');

            savedRows.forEach(row => {

                const tr = document.createElement('tr');

                row.forEach(savedCell => {

                    const td = document.createElement('td');

                    td.contentEditable = 'true';

                    // 旧形式（文字列）と新形式（オブジェクト）の両方に対応
                    const cellData =
                        typeof savedCell === 'object' && savedCell !== null
                            ? savedCell
                            : { text: savedCell };

                    td.textContent = cellData.text || '';

                    // セルの文字色
                    td.style.color =
                        cellData.textColor ||
                        el.dataset.tableTextColor;

                    // セルの背景色
                    td.style.backgroundColor =
                        cellData.backgroundColor ||
                        el.dataset.tableBackgroundColor;

                    // セルの枠線
                    td.style.border =
                        cellData.border ||
                        `1px ${el.dataset.tableBorderStyle} #000000`;

                    // セル結合
                    td.colSpan =
                        Math.max(1, Number(cellData.colspan) || 1);

                    td.rowSpan =
                        Math.max(1, Number(cellData.rowspan) || 1);
                    
                    // セルの結合情報を復元
                    if (cellData.mergedCells) {
                        td.dataset.mergedCells = cellData.mergedCells;
                    }

                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });

            table.replaceChildren(tbody);
        }

        // 行数・列数を復元
        const rowCount = savedRows.length || 3;

        const columnCount = savedRows.length > 0
            ? Math.max(
                1,
                ...savedRows.map(row =>
                    row.reduce((total, cell) => {
                        const colspan =
                            typeof cell === 'object' && cell !== null
                                ? Number(cell.colspan) || 1
                                : 1;

                        return total + colspan;
                    }, 0)
                )
            )
            : 3;

        el.dataset.tableRows = String(rowCount);
        el.dataset.tableColumns = String(columnCount);

        // 列幅を復元
        const savedWidths = Array.isArray(style.tableColumnWidths)
            ? style.tableColumnWidths
            : [];

        const columnWidths = Array.from(
            { length: columnCount },
            (_, i) => {
                const width = Number(savedWidths[i]) || 150;
                return Math.min(500, Math.max(50, width));
            }
        );

        el.dataset.tableColumnWidths =
            JSON.stringify(columnWidths);

        // 行高さを復元
        const savedHeights = Array.isArray(style.tableRowHeights)
            ? style.tableRowHeights
            : [];

        const rowHeights = Array.from(
            { length: rowCount },
            (_, i) => {
                const height = Number(savedHeights[i]) || 60;
                return Math.min(300, Math.max(30, height));
            }
        );

        el.dataset.tableRowHeights =
            JSON.stringify(rowHeights);

        // テーブルの見た目を復元
        if (table) {

            const colgroup = document.createElement('colgroup');

            columnWidths.forEach(width => {

                const col = document.createElement('col');

                col.style.width = `${width}px`;

                colgroup.appendChild(col);
            });

            table.insertBefore(colgroup, table.firstChild);

            table.querySelectorAll('tr').forEach((tr, i) => {

                const height = rowHeights[i] || 60;

                tr.style.height = `${height}px`;

                tr.querySelectorAll('td, th').forEach(cell => {
                    cell.style.height = `${height}px`;
                });
            });
        }

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

}