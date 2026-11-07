import { HeadingBlock } from '../blocks/HeadingBlock.js';
import { TextBlock } from '../blocks/TextBlock.js';
import { ListBlock } from '../blocks/ListBlock.js';
import { ButtonBlock } from '../blocks/ButtonBlock.js';
import { ImageBlock } from '../blocks/ImageBlock.js';
import { FormBlock } from '../blocks/FormBlock.js';
import { DividerBlock } from '../blocks/DividerBlock.js';

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

    addDivider() {
        const block = DividerBlock.create();

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
        el.dataset.lineHeight = style.lineHeight || '1.3';
        el.dataset.letterSpacing = style.letterSpacing || '0px';

        heading.style.color = style.color || '';
        heading.style.lineHeight = style.lineHeight || '1.3';
        heading.style.letterSpacing = style.letterSpacing || '0px';
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
        el.dataset.lineHeight = style.lineHeight || '1.7';
        el.dataset.letterSpacing = style.letterSpacing || '0px';

        // ブロックの高さを復元
        el.dataset.height = style.height || '';

        if (style.height) {
            el.style.height = `${style.height}px`;
        }


        text.style.color = style.color || '#000000';

        text.style.fontSize =
            (style.fontSize || 16) + 'px';
        text.style.lineHeight = style.lineHeight || '1.7';
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

        // リスト本体を作成
        const ul = document.createElement('ul');

        ul.className = 'editor-list';
        ul.style.listStyleType = listStyle;
        ul.style.color = listColor;

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

    this.setupBlock(el);
    this.canvas.appendChild(el);
}

    addButtonFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block');
        el.dataset.type = 'button';

        const style = block.data.style || {};

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

        el.appendChild(btn);

        // 設定値を保存
        el.dataset.buttonColor =
            style.buttonColor || '#5B9DFF';

        el.dataset.buttonTextColor =
            style.buttonTextColor || '#ffffff';

        el.dataset.buttonRadius =
            style.buttonRadius ?? '12';

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

        // 画像が保存されている場合
        if (src) {
            const img = document.createElement('img');

            img.className = 'editor-image';
            img.src = src;
            img.style.width = `${imageWidth}%`;

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

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

    addFormFromData(block) {

        const el = document.createElement('div');

        el.className = 'block p-4 rounded mb-4';
        el.dataset.type = 'form';

        const input = document.createElement('input');

        input.className = 'editor-input';

        input.type = block.data.style?.inputType || 'text';
        input.placeholder = block.data.style?.placeholder || '入力してください';
        input.value = '';

        el.appendChild(input);

        el.dataset.inputType = input.type;
        el.dataset.placeholder = input.placeholder;

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
            savedStyle.dividerMargin || '10';

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

}