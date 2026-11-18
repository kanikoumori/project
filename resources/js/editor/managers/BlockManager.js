import { HeadingBlock } from '../blocks/HeadingBlock.js';
import { TextBlock } from '../blocks/TextBlock.js';
import { ListBlock } from '../blocks/ListBlock.js';
import { ButtonBlock } from '../blocks/ButtonBlock.js';
import { ImageBlock } from '../blocks/ImageBlock.js';
import { FormBlock } from '../blocks/FormBlock.js';
import { DividerBlock } from '../blocks/DividerBlock.js';
import { TableBlock } from '../blocks/TableBlock.js';
import { EmbedBlock } from '../blocks/EmbedBlock.js';
import { ContainerBlock } from '../blocks/ContainerBlock.js';
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

            case 'embed':
                return this.addEmbedFromData(block);

            case 'container':
                return this.addContainerFromData(block);
        }
    }
    setupBlock(block) {
        let dragHandle =
            block.querySelector(':scope > .drag-handle');

        if (!dragHandle) {

            dragHandle = document.createElement('button');

            dragHandle.className = 'drag-handle';
            dragHandle.textContent = '⋮⋮';

            block.prepend(dragHandle);
        }
        let deleteButton =
            block.querySelector(':scope > .delete-button');

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


                // YouTube動画の監視処理を解除
                block.querySelectorAll('.editor-embed-container')
                    .forEach(container => {
                        if (typeof container.youtubeCleanup === 'function') {
                            container.youtubeCleanup();
                            delete container.youtubeCleanup;
                        }
                    });

                block.remove();

                this.historyManager.save();

                this.editor.markDirty();
            });
        }

        if (block.dataset.clickBound !== 'true') {

            block.dataset.clickBound = 'true';

            block.addEventListener('click', (e) => {

                // クリックされたブロックだけを選択する
                if (e.target.closest('.block') !== block) {
                    return;
                }

                this.selectionManager.select(block);
                this.propertyManager.show(block);
            });
        }

                 // テキスト編集終了時
        block.querySelectorAll('[contenteditable="true"]')
            .forEach(element => {

                // 自分自身の編集要素だけを対象にする
                if (element.closest('.block') !== block) return;

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
        const formInput = Array.from(
            block.querySelectorAll('.editor-input')
        ).find(element => element.closest('.block') === block);

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

        document.getElementById('add-container')
            ?.addEventListener('click', () => this.addContainer());
    }
    // ------キャンバス内の追加表示------
    // 新しいブロックの追加先を取得
    getInsertionTarget() {

        const selected = this.canvas.querySelector('.block.selected');

        // コンテナを選択している場合
        if (selected?.dataset.type === 'container') {

            const content = selected.querySelector(
                ':scope > .container-content'
            );

            if (content) {
                return content;
            }
        }

        // 通常はキャンバスに追加
        return this.canvas;
    }
    // コンテナの追加
    addContainer() {

        const block = ContainerBlock.create();

        this.setupBlock(block);

        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addHeading() {
        const block = HeadingBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addText() {
        const block = TextBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addList() {
        const block = ListBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addButton() {
        const block = ButtonBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }

    addImage() {
        const block = ImageBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addForm() {
        const block = FormBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addEmbed() {
        const block = EmbedBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();
        this.editor.markDirty();
    }

    addDivider() {
        const block = DividerBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();

        this.editor.markDirty();
    }
    addTable() {
        const block = TableBlock.create();

        this.setupBlock(block);
        this.getInsertionTarget().appendChild(block);

        this.historyManager.save();
        this.editor.markDirty();
    }


    addHeadingFromData(block) {
        const el = BlockRenderer.create(block, { mode: 'editor' });

        if (!el) return;

        // 埋め込みブロックの自由配置を復元
        const savedPosition = block.data?.blockSettings?.position;

        if (savedPosition?.mode === 'free') {
            const x = Number(savedPosition.x);
            const y = Number(savedPosition.y);

            el.classList.add('free-positioned');
            // 保存されたブロック幅を取得
            const savedWidth = Number(block.data?.blockSettings?.width);

            const blockWidth =
                Number.isFinite(savedWidth) &&
                savedWidth >= 1 &&
                savedWidth <= 100
                    ? savedWidth
                    : 100;

            // ブロックの幅に合わせて横位置を制限
            const maxLeft = Math.max(0, 100 - blockWidth);

            const safeX = Number.isFinite(x)
                ? Math.min(Math.max(0, x), maxLeft)
                : 0;

            el.style.left = `${safeX}%`;

            // 縦位置はピクセル単位で復元
            el.style.top = `${Number.isFinite(y) ? Math.max(0, y) : 0}px`;
        }


        this.setupBlock(el);
        this.canvas.appendChild(el);
    }
    // 保存されたコンテナを復元
    addContainerFromData(block) {

        const el = BlockRenderer.create(block, {
            mode: 'editor'
        });

        if (!el) return;

        // 親コンテナの編集イベントを登録
        this.setupBlock(el);

        // すべての子ブロックの編集イベントを登録
        el.querySelectorAll('.block').forEach(child => {

            this.setupBlock(child);
        });

        this.canvas.appendChild(el);

        return el;
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
