export class BlockManager {
    constructor(propertyManager) {
        this.canvas = document.getElementById('canvas');
        this.propertyManager = propertyManager;
    }

    initialize() {
        this.setupToolbar();
    }

    setupBlock(block) {
        block.addEventListener('click', () => {
            document.querySelectorAll('.block')
                .forEach(b => b.classList.remove('selected'));
            
            block.classList.add('selected');
            this.propertyManager.show(block);
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
        const block = document.createElement('div');

        block.className = 'block p-6 rounded mb-4';

        // ＊＊＊見出し表示初期値＊＊＊
        block.dataset.type = 'heading';
        block.dataset.tag = 'h1'
        block.dataset.align = 'left';
        block.dataset.italic = 'false';
        block.dataset.underline = 'false';
        block.dataset.strike = 'false';

        this.setupBlock(block);

        block.innerHTML = `
            <h1 contenteditable="true" class="editor-heading">
                見出しを入力
            </h1>
        `;

        this.canvas.appendChild(block);
    }

    addText() {
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        // テキスト初期値
        block.dataset.type = 'text';
        block.dataset.color = '#000000';
        block.dataset.fontSize = '16';
        block.dataset.fontWeight = '400';
        block.dataset.align = 'left';
        block.dataset.italic = 'false';
        block.dataset.underline = 'false';
        block.dataset.strike = 'false';

        this.setupBlock(block);

        block.innerHTML = `
            <p contenteditable="true"class="editor-text">
                テキストを入力
            </p>
        `;

        this.canvas.appendChild(block);
    }
    addList() {
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        // リスト初期値
        block.dataset.type = 'list';
        block.dataset.listStyle = 'disc';

        this.setupBlock(block);

        block.innerHTML = `
            <ul class="editor-list" contenteditable="true">
                <li>リスト項目</li>
                <li>リスト項目</li>
                <li>リスト項目</li>
            </ul>
        `;

        this.canvas.appendChild(block);
    }
    addButton() {
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        // ボタン初期値
        block.dataset.type = 'button';
        block.dataset.buttonColor = '#5B9DFF';
        block.dataset.buttonTextColor = '#ffffff';
        block.dataset.buttonRadius = '12';

        this.setupBlock(block);

        block.innerHTML = `
            <button
                class="editor-button"
                contenteditable="true"
                style="
                    background-color:#5B9DFF;
                    color:#ffffff;
                    border:none;
                    border-radius:12px;
                    padding:12px 24px;
                "
            >
                ボタン
            </button>
        `;

        this.canvas.appendChild(block);
    }

    addImage() {
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        // 画像初期値
        block.dataset.type = 'image';
        block.dataset.imageWidth = '100';
        block.dataset.src = '';

        this.setupBlock(block);

        block.innerHTML = `
            <div class="editor-image-placeholder">
                画像を選択してください
            </div>
        `;

        this.canvas.appendChild(block);
    }

    addForm() {
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        block.dataset.type = 'form';
        block.dataset.placeholder = '入力してください';

        this.setupBlock(block);

        block.innerHTML = `
            <input
                type="text"
                class="editor-input"
                placeholder="入力してください"
            >
        `;

        this.canvas.appendChild(block);
    }
}