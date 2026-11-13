import { HeadingBlock } from '../blocks/HeadingBlock.js';
import { TextBlock } from '../blocks/TextBlock.js';
import { ListBlock } from '../blocks/ListBlock.js';
import { ButtonBlock } from '../blocks/ButtonBlock.js';
import { ImageBlock } from '../blocks/ImageBlock.js';
import { FormBlock } from '../blocks/FormBlock.js';
import { DividerBlock } from '../blocks/DividerBlock.js';
import { TableBlock } from '../blocks/TableBlock.js';
import { BlockRenderer } from '../renderers/BlockRenderer.js';

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

                // プレビュー中は削除できない
                if (this.editor.isPreview) {
                    return;
                }

                block.remove();

                this.historyManager.save();

                this.editor.markDirty();
            });
        }

        if (block.dataset.clickBound !== 'true') {

            block.dataset.clickBound = 'true';

            block.addEventListener('click', () => {

                // プレビュー中は設定画面を開かない
                if (this.editor.isPreview) {
                    return;
                }

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

                    // プレビュー中は自動保存しない
                    if (this.editor.isPreview) {
                        return;
                    }

                    this.editor.markDirty();
                });

                element.addEventListener('blur', () => {

                    // プレビュー中は履歴を保存しない
                    if (this.editor.isPreview) {
                        return;
                    }

                    this.historyManager.save();
                });
            });
                    // 入力欄の変更検知
        const formInput = block.querySelector('.editor-input');

            if (formInput && formInput.dataset.changeBound !== 'true') {
                formInput.dataset.changeBound = 'true';

                formInput.addEventListener('input', () => {
                    if (this.editor.isPreview) return;

                    block.dataset.value = formInput.value;
                    this.editor.markDirty();
                });

                formInput.addEventListener('change', () => {
                    if (this.editor.isPreview) return;

                    this.historyManager.save();
                });
            }
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


    addHeadingFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

    addTextFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }


    addButtonFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }
    addImageFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

    addFormFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }
    // 独立した区切り線の保存復元
    addDividerFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }
            // テーブルの保存データを復元

    // テーブルの保存データを復元

    addTableFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }

    addListFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.canvas.appendChild(el);
    }
}
