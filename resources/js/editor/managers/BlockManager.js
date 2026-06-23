import { HeadingBlock } from '../blocks/HeadingBlock.js';
import { TextBlock } from '../blocks/TextBlock.js';
import { ListBlock } from '../blocks/ListBlock.js';
import { ButtonBlock } from '../blocks/ButtonBlock.js';
import { ImageBlock } from '../blocks/ImageBlock.js';
import { FormBlock } from '../blocks/FormBlock.js';

import { BlockSerializer }
    from '../serializers/BlockSerializer.js';

export class BlockManager {
    constructor(propertyManager, historyManager, selectionManager){
        this.canvas = document.getElementById('canvas');
        this.propertyManager = propertyManager;
        this.historyManager = historyManager;
        this.selectionManager = selectionManager;
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
        }
    }

    setupBlock(block) {
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
    }

    // ------キャンバス内の追加表示------
    addHeading() {
        const block = HeadingBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();
    }

    addText() {
        const block = TextBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();
    }

    addList() {
        const block = ListBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();
    }

    addButton() {
        const block = ButtonBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();
    }

    addImage() {
        const block = ImageBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();
    }

    addForm() {
        const block = FormBlock.create();

        this.setupBlock(block);
        this.canvas.appendChild(block);

        this.historyManager.save();
    }

    // 保存復元用
    addHeadingFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block');
        el.dataset.type = 'heading';

        const tag = block.data.tag || 'h1';

        el.innerHTML = `
            <${tag}
                class="editor-heading"
                contenteditable="true"
            >
                ${block.data.content}
            </${tag}>
        `;

        const style = block.data.style;

        el.dataset.tag = tag;
        el.dataset.color = style.color;
        el.dataset.bold = style.bold;
        el.dataset.italic = style.italic;
        el.dataset.underline = style.underline;
        el.dataset.strike = style.strike;
        el.dataset.align = style.align;

        const heading =
            el.querySelector('.editor-heading');

        heading.style.color = style.color || '';
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

        el.innerHTML = `
            <p class="editor-text" contenteditable="true">
                ${block.data.content}
            </p>
        `;

        const style = block.data.style;

        el.dataset.color = style.color;
        el.dataset.fontSize = style.fontSize;
        el.dataset.bold = String(style.bold);
        el.dataset.italic = style.italic;
        el.dataset.underline = style.underline;
        el.dataset.strike = style.strike;
        el.dataset.align = style.align;

        const text = el.querySelector('.editor-text');

        text.style.color = style.color || '#000000';

        text.style.fontSize =
            (style.fontSize || 16) + 'px';

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
        el.classList.add('block');
        el.dataset.type = 'list';

        const style = block.data.style || {};

        el.innerHTML = `
            <ul style="list-style-type:${style.listStyle || 'disc'}">
                ${block.data.items.map(item =>
                    `<li contenteditable="true">${item}</li>`
                ).join('')}
            </ul>
        `;

        el.dataset.listStyle =
            style.listStyle || 'disc';

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

    addButtonFromData(block) {

        const el = document.createElement('div');
        el.classList.add('block');
        el.dataset.type = 'button';

        el.innerHTML = `
            <button class="editor-button" contenteditable="true">
                ${block.data.label}
            </button>
        `;

        const btn = el.querySelector('.editor-button');
        const style = block.data.style || {};

        btn.style.backgroundColor =
            style.buttonColor || '';

        btn.style.color =
            style.buttonTextColor || '';

        btn.style.borderRadius =
            `${style.buttonRadius || 0}px`;

        el.dataset.buttonColor =
            style.buttonColor || '#3b82f6';

        el.dataset.buttonTextColor =
            style.buttonTextColor || '#ffffff';

        el.dataset.buttonRadius =
            style.buttonRadius || 0;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

    addImageFromData(block) {

        const el = ImageBlock.create();

        if (block.data?.src) {

            el.innerHTML = `
                <img
                    src="${block.data.src}"
                    class="editor-image"
                    style="width:${block.data.style.imageWidth || 100}%"
                >
            `;

            el.dataset.src = block.data.src;
        }

        el.dataset.imageWidth =
            block.data?.style?.imageWidth || '100';

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
}