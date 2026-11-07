export class PropertyManager {

    constructor(historyManager,editor) {
        this.panel =
            document.getElementById('block-settings');

        this.elementPanel =
            document.getElementById('element-settings');

        this.historyManager = historyManager;
        this.editor = editor;
    }

    safeColor(v) {
        return (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v))
            ? v
            : '#000000';
    }
    
    show(block) {

        const settings = document.getElementById('block-settings');

        if (!settings) return;

        const type = block.dataset.type;

        // 独立した区切り線の種類
        const currentDividerStyle =
            block.dataset.dividerStyle || 'solid';
        //区切り線の太さ
        const currentDividerThickness =
            block.dataset.dividerThickness || '2';

        // 区切り線の色
        const currentDividerColor =
            block.dataset.dividerColor || '#000000';
        
        // 区切り線の余白
        const currentDividerMargin =
            block.dataset.dividerMargin || '10';

        // 見出し色
        const currentColor = 
            block.dataset.color || '#000000';

        // 見出し文字サイズ
        const currentTag =
        block.dataset.tag || 'h1';

        // 見出し配置
        const currentAlign =
        block.dataset.align || 'left';

        // 見出し斜体
        const currentItalic =
        block.dataset.italic === 'true';

        const lineHeightValue = Number(block.dataset.lineHeight);

        const currentLineHeight =
            Number.isFinite(lineHeightValue)
                ? Math.max(1, lineHeightValue)
                : 1.5;

        // テキストブロックの高さ
        const heightValue = Number(block.dataset.height);

        const currentHeight =
            block.dataset.height === undefined || block.dataset.height === ''
                ? ''
                : (Number.isFinite(heightValue) && heightValue >= 1
                    ? heightValue
                    : '');

        // 見出し文字間隔
        const currentLetterSpacing =
        block.dataset.letterSpacing || '0px';

        // 見出し下線
        const currentUnderline =
            block.dataset.underline === 'true';

        // 見出し取り消し線
        const currentStrike =
            block.dataset.strike === 'true';

        switch (type) {

            // 見出しメニュー表示
            case 'heading':
                this.elementPanel.innerHTML = `
                    <div class="accordion-title">見出し設定</div>
                    <label>文字色</label>
                    <input
                        type="color"
                        id="heading-color"
                        value="${this.safeColor(currentColor)}"
                    >

                    <label>見出しサイズ</label>
                    <select id="heading-tag">
                        <option value="h1" ${currentTag === 'h1' ? 'selected' : ''}>H1</option>
                        <option value="h2" ${currentTag === 'h2' ? 'selected' : ''}>H2</option>
                        <option value="h3" ${currentTag === 'h3' ? 'selected' : ''}>H3</option>
                        <option value="h4" ${currentTag === 'h4' ? 'selected' : ''}>H4</option>
                        <option value="h5" ${currentTag === 'h5' ? 'selected' : ''}>H5</option>
                        <option value="h6" ${currentTag === 'h6' ? 'selected' : ''}>H6</option>
                    </select>

                    <label>配置</label>
                    <select id="heading-align">
                        <option value="left"
                            ${currentAlign === 'left' ? 'selected' : ''}>
                            左
                        </option>

                        <option value="center"
                            ${currentAlign === 'center' ? 'selected' : ''}>
                            中央
                        </option>

                        <option value="right"
                            ${currentAlign === 'right' ? 'selected' : ''}>
                            右
                        </option>
                    </select>
                    
                    <label>行間</label>
                    <input
                        type="number"
                        id="heading-line-height"
                        min="1.0"
                        step="0.1"
                        value="${currentLineHeight}"
                    >

                    <label>文字間隔（px）</label>
                    <input
                        type="number"
                        id="heading-letter-spacing"
                        step="0.1"
                        value="${Number.isFinite(parseFloat(currentLetterSpacing)) ? parseFloat(currentLetterSpacing) : 0}"
                    >                   
                    
                    <label>装飾</label>
                    <div class="property-toggle-group">

                        <button
                            type="button"
                            id="heading-italic"
                            class="toolbar-button property-toggle ${currentItalic ? 'active' : ''}"
                        >
                            <em>I</em>
                        </button>

                        <button
                            type="button"
                            id="heading-underline"
                            class="toolbar-button property-toggle ${currentUnderline ? 'active' : ''}"
                        >
                            <u>U</u>
                        </button>

                        <button
                            type="button"
                            id="heading-strike"
                            class="toolbar-button property-toggle ${currentStrike ? 'active' : ''}"
                        >
                            <s>S</s>
                        </button>

                    </div>

                    
                `;

                this.bindHeadingEvents(block);
                break;

            case 'text':

                this.elementPanel.innerHTML = `
                    <div class="accordion-title">テキスト設定</div>

                    <label>文字色</label>
                    <input
                        type="color"
                        id="text-color"
                        value="${this.safeColor(currentColor)}"
                    >

                    <label>文字サイズ</label>
                    <input
                        type="range"
                        id="text-size"
                        min="12"
                        max="72"
                        value="${Math.min(72, Math.max(12, Number(block.dataset.fontSize) || 16))}"
                    >

                    <label>配置</label>
                    <select id="text-align">
                        <option value="left"
                            ${block.dataset.align === 'left' ? 'selected' : ''}>
                            左
                        </option>

                        <option value="center"
                            ${block.dataset.align === 'center' ? 'selected' : ''}>
                            中央
                        </option>

                        <option value="right"
                            ${block.dataset.align === 'right' ? 'selected' : ''}>
                            右
                        </option>
                    </select>

                    <label>装飾</label>

                    <label>行間</label>
                    <input
                        type="number"
                        id="text-line-height"
                        min="1.0"
                        step="0.1"
                        value="${currentLineHeight}"
                    >
                    <label>文字間隔（px）</label>
                    <input
                        type="number"
                        id="text-letter-spacing"
                        step="0.1"
                        value="${Number.isFinite(parseFloat(block.dataset.letterSpacing)) ? parseFloat(block.dataset.letterSpacing) : 0}"
                    >

                    <label>ブロックの高さ（px）</label>
                    <input
                        type="number"
                        id="text-height"
                        min="1"
                        step="1"
                        placeholder="自動"
                        value="${currentHeight}"
                    >

                    <div class="property-toggle-group">

                        <button
                            type="button"
                            id="text-bold"
                            class="toolbar-button property-toggle
                                ${block.dataset.bold === 'true' ? 'active' : ''}"
                        >
                            <strong>B</strong>
                        </button>

                        <button
                            type="button"
                            id="text-italic"
                            class="toolbar-button property-toggle
                                ${block.dataset.italic === 'true' ? 'active' : ''}"
                        >
                            <em>I</em>
                        </button>

                        <button
                            type="button"
                            id="text-underline"
                            class="toolbar-button property-toggle
                                ${block.dataset.underline === 'true' ? 'active' : ''}"
                        >
                            <u>U</u>
                        </button>

                        <button
                            type="button"
                            id="text-strike"
                            class="toolbar-button property-toggle
                                ${block.dataset.strike === 'true' ? 'active' : ''}"
                        >
                            <s>S</s>
                        </button>

                    </div>
                `;

                this.bindTextEvents(block);

                break;

            case 'list':
                this.elementPanel.innerHTML = `
                    <div class="accordion-title">リスト設定</div>

                    <label>リストタイプ</label>
                    <select id="list-style">
                        <option value="disc" ${block.dataset.listStyle === 'disc' ? 'selected' : ''}>● 黒丸</option>
                        <option value="circle" ${block.dataset.listStyle === 'circle' ? 'selected' : ''}>○ 白丸</option>
                        <option value="decimal" ${block.dataset.listStyle === 'decimal' ? 'selected' : ''}>1. 2. 3.</option>
                    </select>

                    <label>文字色</label>
                    <input
                        type="color"
                        id="list-color"
                        value="${this.safeColor(block.dataset.listColor || '#000000')}"
                    >
                    <label>文字サイズ（px）</label>
                    <input
                        type="range"
                        id="list-font-size"
                        min="12"
                        max="72"
                        value="${Math.min(72, Math.max(12, Number(block.dataset.listFontSize) || 16))}"
                    >
                    <span id="list-font-size-value">
                        ${Math.min(72, Math.max(12, Number(block.dataset.listFontSize) || 16))}px
                    </span>
                `;

                this.bindListEvents(block);
                break;

            case 'button':

                this.elementPanel.innerHTML = `
                    <div class="accordion-title">ボタン設定</div>

                    <label>背景色</label>
                    <input
                        type="color"
                        id="button-color"
                        value="${this.safeColor(block.dataset.buttonColor)}"
                    >

                    <label>文字色</label>
                    <input
                        type="color"
                        id="button-text-color"
                        value="${this.safeColor(block.dataset.buttonTextColor)}"
                    >

                    <label>角丸</label>
                    <input
                        type="range"
                        id="button-radius"
                        min="0"
                        max="50"
                        value="${Math.min(50, Math.max(0, Number.isFinite(Number(block.dataset.buttonRadius)) && block.dataset.buttonRadius !== '' ? Number(block.dataset.buttonRadius) : 12))}"
                    >
                `;

                this.bindButtonEvents(block);

                break;

            case 'image':

                this.elementPanel.innerHTML = `
                    <div class="accordion-title">画像設定</div>

                    <input
                        type="file"
                        id="image-upload"
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                        style="display: none;"
                    >

                    <button
                        type="button"
                        id="image-select-button"
                        class="editor-button"
                    >
                        画像を選択
                    </button>

                    <label>画像サイズ</label>

                        <input
                            type="range"
                            id="image-width"
                            min="1"
                            max="100"
                            value="${Math.min(100, Math.max(1, Number(block.dataset.imageWidth) || 100))}"
                        >

                        <span id="image-width-value">
                            ${Math.min(100, Math.max(1, Number(block.dataset.imageWidth) || 100))} %
                        </span>
                `;

                this.bindImageEvents(block);

                break;
            case 'form':

            this.elementPanel.innerHTML = `
                <div class="accordion-title">入力欄設定</div>

                <label>プレースホルダー</label>

                <input
                    type="text"
                    id="form-placeholder"
                    class="editor-input"
                >
            `;

            document.getElementById('form-placeholder').value =
                block.dataset.placeholder || '';

            this.bindFormEvents(block);

            break;

            case 'divider':

                this.elementPanel.innerHTML = `
                    <div class="accordion-title">区切り線設定</div>

                    <label>区切り線の種類</label>
                    <select id="divider-style">
                        <option value="solid"
                            ${currentDividerStyle === 'solid' ? 'selected' : ''}>
                            実線
                        </option>

                        <option value="dashed"
                            ${currentDividerStyle === 'dashed' ? 'selected' : ''}>
                            破線
                        </option>

                        <option value="dotted"
                            ${currentDividerStyle === 'dotted' ? 'selected' : ''}>
                            点線
                        </option>

                        <option value="double"
                            ${currentDividerStyle === 'double' ? 'selected' : ''}>
                            二重線
                        </option>
                    </select>
                    <label>区切り線の太さ（px）</label>

                    <input
                        type="number"
                        id="divider-thickness"
                        min="1"
                        max="20"
                        value="${Math.min(20, Math.max(1, Number(currentDividerThickness) || 2))}"
                    >
                    <label>区切り線の色</label>
                    <input
                        type="color"
                        id="divider-color"
                        value="${this.safeColor(currentDividerColor)}"
                    >
                    <label>区切り線の余白（px）</label>
                    <input
                        type="number"
                        id="divider-margin"
                        min="0"
                        max="100"
                        step="1"
                        value="${Math.min(100, Math.max(0, Number(currentDividerMargin) || 0))}"
                    >
                 `;

                this.bindDividerEvents(block);

                break;


            // ここから下は元のまま
            default:
                this.elementPanel.innerHTML = `
                    <p>設定なし</p>
                `;
                        }
    }
// ↑↑↑switch block関数↑↑↑

// ↓↓↓bindEvents関数↓↓↓
    bindHeadingEvents(block) {

        document
            .getElementById('heading-color')
            ?.addEventListener('input', (e) => {

                const heading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );
                if (!heading) return;

                const color = this.safeColor(e.target.value);

                heading.style.color = color;
                block.dataset.color = color;
                this.historyManager.save();
                this.editor.markDirty();
            });
                // 文字間隔設定
        document
            .getElementById('heading-letter-spacing')
            ?.addEventListener('change', (e) => {

                const heading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );

                if (!heading) return;

                let spacing = Number(e.target.value);

                if (!Number.isFinite(spacing)) {
                    spacing = 0;
                }

                spacing = Math.max(-20, Math.min(100, spacing));

                e.target.value = spacing;

                const letterSpacing = `${spacing}px`;

                // 見出しに文字間隔を反映
                heading.style.letterSpacing = letterSpacing;

                // 文字間隔を保存用データに記録
                block.dataset.letterSpacing = letterSpacing;

                this.historyManager.save();
                this.editor.markDirty();
            });
            // 行間設定
        document
            .getElementById('heading-line-height')
            ?.addEventListener('change', (e) => {

                const heading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );

                if (!heading) return;

                let lineHeight = parseFloat(e.target.value);

                // 最小値を1.0にする
                if (!Number.isFinite(lineHeight) || lineHeight < 1.0) {
                    lineHeight = 1.0;
                }

                // 入力欄にも補正後の値を反映
                e.target.value = lineHeight;

                // テキストに行間を反映
                heading.style.lineHeight = lineHeight;

                // 行間を保存用データに記録
                block.dataset.lineHeight = lineHeight;

                this.historyManager.save();
                this.editor.markDirty();
            });
     

        document
            .getElementById('heading-tag')
            ?.addEventListener('change', (e) => {

                const oldHeading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );
                if (!oldHeading) return;

                const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

                const tag = allowedTags.includes(e.target.value)
                    ? e.target.value
                    : 'h1';

                const newHeading = document.createElement(tag);

                newHeading.textContent = oldHeading.textContent;
                newHeading.contentEditable = true;
                newHeading.className = oldHeading.className;
                newHeading.style.cssText = oldHeading.style.cssText;

                oldHeading.replaceWith(newHeading);

                block.dataset.tag = tag;
                this.historyManager.save();
                this.editor.markDirty();
            });

        document
            .getElementById('heading-align')
            ?.addEventListener('change', (e) => {

                const allowedAlignments = ['left', 'center', 'right'];

                const align = allowedAlignments.includes(e.target.value)
                    ? e.target.value
                    : 'left';

                block.style.textAlign = align;
                block.dataset.align = align;
                this.historyManager.save();
                this.editor.markDirty();
            });

        // I
        this.toggleButton(
            block,
            'heading-italic',
            'italic',
            () => {

                const heading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );
                if (!heading) return;

                heading.style.fontStyle =
                    block.dataset.italic === 'true'
                        ? 'italic'
                        : 'normal';
                
                this.historyManager.save();
                this.editor.markDirty();
            }
        );

        // U
        this.toggleButton(
            block,
            'heading-underline',
            'underline',
            () => {

                const heading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );

                this.updateTextDecoration(heading, block);
                this.historyManager.save();
                this.editor.markDirty();
            }
        );

        // S
        this.toggleButton(
            block,
            'heading-strike',
            'strike',
            () => {

                const heading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );

                this.updateTextDecoration(heading, block);
                this.historyManager.save();
                this.editor.markDirty();
            }
        );
    }
    updateTextDecoration(target,block) {
        if (!target) return;

        target.style.textDecoration = [
            block.dataset.underline === 'true'
                ? 'underline'
                : '',

            block.dataset.strike === 'true'
                ? 'line-through'
                : ''
        ]
        .filter(Boolean)
        .join(' ');
    }
    bindTextEvents(block) {

        const text = block.querySelector('p');

        if (!text) return;

        document.getElementById('text-color')
            .addEventListener('change', (e) => {

                const color = this.safeColor(e.target.value);

                text.style.color = color;
                block.dataset.color = color;
                this.historyManager.save();
                this.editor.markDirty();
            });

        document.getElementById('text-size')
            ?.addEventListener('change', (e) => {

                let fontSize = Number(e.target.value);

                if (!Number.isFinite(fontSize)) {
                    fontSize = 16;
                }

                fontSize = Math.max(12, Math.min(72, fontSize));

                e.target.value = fontSize;

                text.style.fontSize = `${fontSize}px`;

                block.dataset.fontSize = fontSize;
                this.historyManager.save();
                this.editor.markDirty();
            });

        document.getElementById('text-align')
            ?.addEventListener('change', (e) => {

                const allowedAlignments = ['left', 'center', 'right'];

                const align = allowedAlignments.includes(e.target.value)
                    ? e.target.value
                    : 'left';

                block.style.textAlign = align;
                block.dataset.align = align;
                this.historyManager.save();
                this.editor.markDirty();
            });
        
                // 行間設定
        document.getElementById('text-line-height')
            ?.addEventListener('change', (e) => {

                let lineHeight = parseFloat(e.target.value);

                // 最小値を1.0にする
                if (!Number.isFinite(lineHeight) || lineHeight < 1.0) {
                    lineHeight = 1.0;
                }

                // 入力欄にも補正後の値を反映
                e.target.value = lineHeight;

                // テキストに行間を反映
                text.style.lineHeight = lineHeight;

                // 行間を保存用データに記録
                block.dataset.lineHeight = lineHeight;

                this.historyManager.save();
                this.editor.markDirty();
            });
            // 文字間隔設定
        document.getElementById('text-letter-spacing')
            ?.addEventListener('change', (e) => {

                let spacing = Number(e.target.value);

                if (!Number.isFinite(spacing)) {
                    spacing = 0;
                }

                spacing = Math.max(-20, Math.min(100, spacing));

                e.target.value = spacing;

                const letterSpacing = `${spacing}px`;

                // テキストに文字間隔を反映
                text.style.letterSpacing = letterSpacing;

                // 文字間隔を保存用データに記録
                block.dataset.letterSpacing = letterSpacing;

                this.historyManager.save();
                this.editor.markDirty();
            });
                            // ブロックの高さ設定
        document.getElementById('text-height')
            ?.addEventListener('change', (e) => {

                const heightValue = e.target.value;

                if (heightValue === '') {
                    block.style.height = '';
                    delete block.dataset.height;
                } else {
                    let height = Number(heightValue);

                    if (!Number.isFinite(height)) {
                        height = 100;
                    }

                    height = Math.max(1, Math.min(2000, height));

                    e.target.value = height;

                    block.style.height = `${height}px`;
                    block.dataset.height = height;
                }
                this.historyManager.save();
                this.editor.markDirty();
            });

        this.toggleButton(
            block,
            'text-bold',
            'bold',
            () => {
                text.style.fontWeight =
                    block.dataset.bold === 'true'
                        ? '700'
                        : '400';
            }
        );

        this.toggleButton(
            block,
            'text-italic',
            'italic',
            () => {
                text.style.fontStyle =
                    block.dataset.italic === 'true'
                        ? 'italic'
                        : 'normal';
            }
        );

        this.toggleButton(
            block,
            'text-underline',
            'underline',
            () => {
                this.updateTextDecoration(text, block);
            }
        );

        this.toggleButton(
            block,
            'text-strike',
            'strike',
            () => {
                this.updateTextDecoration(text, block);
                this.historyManager.save();
                this.editor.markDirty();
            }
        );
    }

    toggleButton(block, buttonId, datasetKey, applyStyle) {

        document
            .getElementById(buttonId)
            ?.addEventListener('click', () => {

                const nextState =
                    block.dataset[datasetKey] !== 'true';

                block.dataset[datasetKey] = String(nextState);

                applyStyle();

                document
                    .getElementById(buttonId)
                    ?.classList.toggle(
                        'active',
                        nextState
                    );
                    
                this.historyManager.save();
                this.editor.markDirty();
            });
    }
    
    bindListEvents(block) {

        const ul = block.querySelector('ul');

        if (!ul) return;

        // リストタイプ設定
        document.getElementById('list-style')
            ?.addEventListener('change', (e) => {

                const allowedStyles = ['disc', 'circle', 'decimal'];

                const style = allowedStyles.includes(e.target.value)
                    ? e.target.value
                    : 'disc';

                ul.style.listStyleType = style;
                block.dataset.listStyle = style;

                this.historyManager.save();
                this.editor.markDirty();
            });

        // 文字色設定
        document.getElementById('list-color')
            ?.addEventListener('input', (e) => {

                const color = this.safeColor(e.target.value);

                ul.style.color = color;
                block.dataset.listColor = color;

                this.historyManager.save();
                this.editor.markDirty();
            });
                    // 文字サイズ設定
        document.getElementById('list-font-size')
            ?.addEventListener('input', (e) => {

                let fontSize = Number(e.target.value);

                if (!Number.isFinite(fontSize)) {
                    fontSize = 16;
                }

                fontSize = Math.max(12, Math.min(72, fontSize));

                e.target.value = fontSize;

                const items = block.querySelectorAll('li');

                items.forEach((li) => {
                    li.style.fontSize = `${fontSize}px`;
                });

                block.dataset.listFontSize = fontSize;

                const label = document.getElementById('list-font-size-value');

                if (label) {
                    label.textContent = `${fontSize}px`;
                }

                this.historyManager.save();
                this.editor.markDirty();
            });
    }

    bindButtonEvents(block) {

        const button = block.querySelector('.editor-button');

        if (!button) return;

        document.getElementById('button-color')
            ?.addEventListener('input', (e) => {

                const color = this.safeColor(e.target.value);

                button.style.backgroundColor = color;
                block.dataset.buttonColor = color;
                this.historyManager.save();
                this.editor.markDirty();
            });

        document.getElementById('button-text-color')
            ?.addEventListener('input', (e) => {

                const color = this.safeColor(e.target.value);

                button.style.color = color;
                block.dataset.buttonTextColor = color;
                this.historyManager.save();
                this.editor.markDirty();
            });

        document.getElementById('button-radius')
            ?.addEventListener('change', (e) => {

                let radius = Number(e.target.value);

                if (!Number.isFinite(radius)) {
                    radius = 12;
                }

                radius = Math.max(0, Math.min(50, radius));

                e.target.value = radius;

                button.style.borderRadius = `${radius}px`;

                block.dataset.buttonRadius = radius;
                this.historyManager.save();
                this.editor.markDirty();
            });
    }

    bindImageEvents(block) {

        const fileInput =
            document.getElementById('image-upload');

        document.getElementById('image-select-button')
            ?.addEventListener('click', () => {

                fileInput?.click();
            });

        fileInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];

            if (!file) return;

            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp'
            ];

            if (!allowedTypes.includes(file.type)) {
                alert('JPEG、PNG、GIF、WebP形式の画像を選択してください。');
                e.target.value = '';
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('画像ファイルは5MB以下にしてください。');
                e.target.value = '';
                return;
            }
            const reader = new FileReader();



            reader.onload = () => {

                if (typeof reader.result !== 'string') {
                    alert('画像の読み込みに失敗しました。');
                    return;
                }


                const img = document.createElement('img');

                img.src = reader.result;
                img.className = 'editor-image';
                let width = Number(block.dataset.imageWidth);

                if (!Number.isFinite(width)) {
                    width = 100;
                }

                width = Math.max(1, Math.min(100, width));

                img.style.width = `${width}%`;

                block.replaceChildren(img);

                block.dataset.src = reader.result;
                this.historyManager.save();
                this.editor.markDirty();
            };
            reader.onerror = () => {
                alert('画像の読み込みに失敗しました。');
            };

            reader.readAsDataURL(file);
        });

        document.getElementById('image-width')
            ?.addEventListener('change', (e) => {

                const img = block.querySelector('img');

                if (!img) return;

                let width = Number(e.target.value);

                if (!Number.isFinite(width)) {
                    width = 100;
                }

                width = Math.max(1, Math.min(100, width));

                e.target.value = width;

                block.dataset.imageWidth = width;

                img.style.width = `${width}%`;

                const label =
                    document.getElementById('image-width-value');

                if (label) {
                    label.textContent = `${width}%`;
                }
                this.historyManager.save();
                this.editor.markDirty();
            });
    }

    // 入力欄の設定
bindFormEvents(block) {

    const input = block.querySelector('input');

    if (!input) return;

    document.getElementById('form-placeholder')
        ?.addEventListener('input', (e) => {

            input.placeholder = e.target.value;

            block.dataset.placeholder = e.target.value;
            this.historyManager.save();
            this.editor.markDirty();
        });
}

// 独立した区切り線の設定
bindDividerEvents(block) {

    // 区切り線の要素を取得
    const divider = block.querySelector('.editor-divider-element');

    if (!divider) return;

    // 区切り線の種類が変更されたとき
    document.getElementById('divider-style')
        ?.addEventListener('change', (e) => {

            const allowedStyles = ['solid', 'dashed', 'dotted', 'double'];

            const style = allowedStyles.includes(e.target.value)
                ? e.target.value
                : 'solid';

            e.target.value = style;

            // 区切り線の見た目を変更
            divider.style.borderTopStyle = style;

            // 設定をブロックに保存
            block.dataset.dividerStyle = style;

            // 履歴保存・変更通知
            this.historyManager.save();
            this.editor.markDirty();
        });
            // 区切り線の太さが変更されたとき
    document.getElementById('divider-thickness')
        ?.addEventListener('change', (e) => {

            let thickness = parseInt(e.target.value, 10);

            // 最小値1、最大値20に制限
            if (!Number.isFinite(thickness)) {
                thickness = 1;
            }

            thickness = Math.max(1, Math.min(20, thickness));

            // 入力欄にも補正後の値を反映
            e.target.value = thickness;

            // 区切り線に太さを反映
            divider.style.borderTopWidth = `${thickness}px`;

            // 保存用データに記録
            block.dataset.dividerThickness = String(thickness);

            this.historyManager.save();
            this.editor.markDirty();
        });
            // 区切り線の色が変更されたとき
    document.getElementById('divider-color')
        ?.addEventListener('input', (e) => {

            const color = this.safeColor(e.target.value);

            // 区切り線に色を反映
            divider.style.borderTopColor = color;

            // 保存用データに記録
            block.dataset.dividerColor = color;

            this.historyManager.save();
            this.editor.markDirty();
        });
        // 区切り線の余白が変更されたとき
    document.getElementById('divider-margin')
        ?.addEventListener('change', (e) => {

            let margin = parseInt(e.target.value, 10);

            // 最小値0、最大値100に制限
            if (!Number.isFinite(margin)) {
                margin = 10;
            }

            margin = Math.max(0, Math.min(100, margin));

            // 入力欄にも補正後の値を反映
            e.target.value = margin;

            // 区切り線の上下に余白を反映
            divider.style.marginTop = `${margin}px`;
            divider.style.marginBottom = `${margin}px`;

            // 保存用データに記録
            block.dataset.dividerMargin = String(margin);

            this.historyManager.save();
            this.editor.markDirty();
        });
}
}