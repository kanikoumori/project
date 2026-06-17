import { HeadingBlock } from '../blocks/HeadingBlock.js';
import { TextBlock } from '../blocks/TextBlock.js';
import { ListBlock } from '../blocks/ListBlock.js';
import { ButtonBlock } from '../blocks/ButtonBlock.js';
import { ImageBlock } from '../blocks/ImageBlock.js';
import { FormBlock } from '../blocks/FormBlock.js';


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

    // ------キャンバス内の表示------
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
}