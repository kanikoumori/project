import { HeadingBlock } from '../blocks/HeadingBlock.js';
import { TextBlock } from '../blocks/TextBlock.js';
import { ListBlock } from '../blocks/ListBlock.js';
import { ButtonBlock } from '../blocks/ButtonBlock.js';
import { ImageBlock } from '../blocks/ImageBlock.js';
import { FormBlock } from '../blocks/FormBlock.js';
import { DividerBlock } from '../blocks/DividerBlock.js';
import { TableBlock } from '../blocks/TableBlock.js';
import { EmbedBlock } from '../blocks/EmbedBlock.js';
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
        // ブロックの追加先を管理する共通処理
    appendBlock(block, target = this.canvas) {
        target.appendChild(block);
        return block;
    }


    createFromData(block) {
        const beforeCount = this.canvas.children.length;

        switch (block.type) {
            case 'container':
                this.addContainerFromData(block);
                break;
            case 'heading':
                this.addHeadingFromData(block);
                break;

            case 'text':
                this.addTextFromData(block);
                break;

            case 'button':
                this.addButtonFromData(block);
                break;

            case 'list':
                this.addListFromData(block);
                break;

            case 'image':
                this.addImageFromData(block);
                break;

            case 'form':
                this.addFormFromData(block);
                break;

            case 'divider':
                this.addDividerFromData(block);
                break;

            case 'table':
                this.addTableFromData(block);
                break;

            case 'embed':
                this.addEmbedFromData(block);
                break;

            default:
                return null;
        }

        // 復元処理でブロックが1つ追加されたことを確認
        if (this.canvas.children.length !== beforeCount + 1) {
            return null;
        }

        const el = this.canvas.lastElementChild;

        // Undo・Redoでも同じブロックとして識別できるようにする
        if (
            typeof block.clientKey === 'string' &&
            block.clientKey.trim() !== ''
        ) {
            el.dataset.clientKey = block.clientKey;
        }

        // DBのIDをHTML要素に保持する
        const blockId = Number(block.id);

        if (Number.isSafeInteger(blockId) && blockId > 0) {
            el.dataset.blockId = String(blockId);
        }

        return el;
    }

    setupBlock(block) {
        // 画面内でブロックを識別するための固有ID
        if (!block.dataset.clientKey) {
            block.dataset.clientKey = crypto.randomUUID();
        }

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

            // コンテナ削除時は不要になったSortableJSも解除する
            if (block.dataset.type === 'container') {
                this.editor.dragDrop?.refreshContainers();
            }

            this.historyManager.save();

            this.editor.markDirty();

            });
        }

        if (block.dataset.clickBound !== 'true') {

            block.dataset.clickBound = 'true';


            block.addEventListener('click', (event) => {
                // 子ブロックのクリックでは親コンテナを選択しない
                if (event.target.closest('.block') !== block) {
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


                    this.editor.markDirty();
                });

                element.addEventListener('blur', () => {


                    this.historyManager.save();
                });
            });
                    // 入力欄の変更検知
        const formInput = block.querySelector('.editor-input');

            if (formInput && formInput.dataset.changeBound !== 'true') {
                formInput.dataset.changeBound = 'true';

                formInput.addEventListener('input', () => {

                    block.dataset.value = formInput.value;
                    this.editor.markDirty();
                });

                formInput.addEventListener('change', () => {

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

        document.getElementById('add-embed')
            ?.addEventListener('click', () => this.addEmbed());
        // 既存のコンテナ追加ボタンを利用
        const containerButton = document.getElementById('add-container');

        if (containerButton) {
            // コンテナ機能の動作確認が完了したため有効化
            containerButton.disabled = false;

            containerButton.addEventListener('click', () => {
                this.addContainer();
            });
        }
    }

    // ------キャンバス内の追加表示------
    addHeading() {
        const block = HeadingBlock.create();
        this.setupBlock(block);
        this.appendBlock(block);

        // 新規コンテナ内のドラッグ＆ドロップを登録
        this.editor.dragDrop?.refreshContainers();

        // Undo・Redoの履歴に追加
        this.historyManager.save();


        this.editor.markDirty();
    }

    // 新しいコンテナを追加
    addContainer() {
        const block = BlockRenderer.create(
            {
                type: 'container',
                settings: {
                    direction: 'column',
                    gap: 16
                }
            },
            { mode: 'editor' }
        );

        if (!block) return;


        this.setupBlock(block);
        this.appendBlock(block);

        // 新規コンテナにドラッグ＆ドロップを登録
        this.editor.dragDrop?.refreshContainers();

        // Undo・Redoの履歴に追加
        this.historyManager.save();


        // 自動保存の対象にする
        this.editor.markDirty();
    }


    addText() {
        const block = TextBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addList() {
        const block = ListBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addButton() {
        const block = ButtonBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addImage() {
        const block = ImageBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addForm() {
        const block = FormBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addEmbed() {
        const block = EmbedBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();
        this.editor.markDirty();
    }

    addDivider() {
        const block = DividerBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addTable() {
        const block = TableBlock.create();

        this.setupBlock(block);
        this.appendBlock(block);

        this.historyManager.save();
        this.editor.markDirty();
    }


    addHeadingFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }

    addTextFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }


    addButtonFromData(block) {

            const el = BlockRenderer.create(block, {
                mode: 'editor'
            });

            if (!el) return;

            this.setupBlock(el);
            this.appendBlock(el);
        }
        // 保存された埋め込みブロックを復元
    addEmbedFromData(block) {

        const data = block.data || {};
        const style = data.style || {};

        const el = EmbedBlock.create();

        el.dataset.embedType = data.embedType || 'youtube';
        el.dataset.embedUrl = data.url || '';

        const width = Number(style.embedWidth);
        const height = Number(style.embedHeight);

        el.dataset.embedWidth = String(
            Number.isFinite(width) && width >= 20 && width <= 100
                ? width
                : 100
        );

        el.dataset.embedHeight = String(
            Number.isFinite(height) && height >= 150 && height <= 800
                ? height
                : 400
        );

        const container = el.querySelector('.editor-embed-container');

        if (container) {
            container.style.width = `${el.dataset.embedWidth}%`;
            container.style.height = `${el.dataset.embedHeight}px`;
        }

        EmbedBlock.updatePreview(el);

        this.setupBlock(el);
        this.appendBlock(el);
    }
    addImageFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }

    addFormFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }
    // 独立した区切り線の保存復元
    addDividerFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }
            // テーブルの保存データを復元

    // テーブルの保存データを復元

    addTableFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }

    addListFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }

    addContainerFromData(block) {
        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        this.setupBlock(el);
        this.appendBlock(el);
    }

}
