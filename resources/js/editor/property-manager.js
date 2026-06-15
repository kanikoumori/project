export class PropertyManager {

    constructor() {
        this.panel = document.getElementById('property-panel');
    }

    show(block) {

        const settings = document.getElementById('block-settings');

        if (!settings) return;

        const type = block.dataset.type;

        // 見出しカラー
        const currentColor = 
            block.dataset.color || '#000000'

        // 見出し文字サイズ
        const currentTag =
        block.dataset.tag || 'h1';

        // 見出し配置
        const currentAlign =
        block.dataset.align || 'left';

        // 見出し斜体
        const currentItalic =
        block.dataset.italic === 'true';

        // 見出し下線
        const currentUnderline =
            block.dataset.underline === 'true';

        // 見出し取り消し線
        const currentStrike =
            block.dataset.strike === 'true';

        switch (type) {

            // 見出しメニュー表示
            case 'heading':
                settings.innerHTML = `
                    <div class="accordion-title">見出し設定</div>
                    <label>文字色</label>
                    <input
                        type="color"
                        id="heading-color"
                        value="${currentColor}"
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

                settings.innerHTML = `
                    <div class="accordion-title">テキスト設定</div>

                    <label>文字色</label>
                    <input
                        type="color"
                        id="text-color"
                        value="${block.dataset.color || '#000000'}"
                    >

                    <label>文字サイズ</label>
                    <input
                        type="range"
                        id="text-size"
                        min="12"
                        max="72"
                        value="${block.dataset.fontSize || '16'}"
                    >

                    <label>太さ</label>
                    <select id="text-weight">
                        <option value="400"
                            ${block.dataset.fontWeight === '400' ? 'selected' : ''}>
                            標準
                        </option>

                        <option value="700"
                            ${block.dataset.fontWeight === '700' ? 'selected' : ''}>
                            太字
                        </option>
                    </select>

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

                    <div class="property-toggle-group">

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
                settings.innerHTML = `
                    <div class="accordion-title">リスト設定</div>

                    <label>リストタイプ</label>
                    <select id="list-style">
                        <option value="disc">● 黒丸</option>
                        <option value="circle">○ 白丸</option>
                        <option value="decimal">1. 2. 3.</option>
                    </select>
                `;

                this.bindListEvents(block);
                break;

            case 'button':

                settings.innerHTML = `
                    <div class="accordion-title">ボタン設定</div>

                    <label>背景色</label>
                    <input
                        type="color"
                        id="button-color"
                        value="${block.dataset.buttonColor || '#5B9DFF'}"
                    >

                    <label>文字色</label>
                    <input
                        type="color"
                        id="button-text-color"
                        value="${block.dataset.buttonTextColor || '#ffffff'}"
                    >

                    <label>角丸</label>
                    <input
                        type="range"
                        id="button-radius"
                        min="0"
                        max="50"
                        value="${block.dataset.buttonRadius || '12'}"
                    >
                `;

                this.bindButtonEvents(block);

                break;

            case 'image':

                settings.innerHTML = `
                    <div class="accordion-title">画像設定</div>

                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
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
                            value="${block.dataset.imageWidth || '100'}"
                        >

                        <span id="image-width-value">
                            ${block.dataset.imageWidth || '100'} %
                        </span>
                `;

                this.bindImageEvents(block);

                break;
            case 'form':

            settings.innerHTML = `
                <div class="accordion-title">入力欄設定</div>

                <label>プレースホルダー</label>

                <input
                    type="text"
                    id="form-placeholder"
                    class="editor-input"
                    value="${block.dataset.placeholder || ''}"
                >
            `;

            this.bindFormEvents(block);

            break;

            default:
                settings.innerHTML = `
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

                heading.style.color = e.target.value;

                block.dataset.color = e.target.value;
            });

        document
            .getElementById('heading-tag')
            ?.addEventListener('change', (e) => {

                const oldHeading = block.querySelector(
                    'h1, h2, h3, h4, h5, h6'
                );

                const newHeading = document.createElement(
                    e.target.value
                );

                newHeading.innerHTML = oldHeading.innerHTML;
                newHeading.contentEditable = true;
                newHeading.className = oldHeading.className;
                newHeading.style.cssText = oldHeading.style.cssText;

                oldHeading.replaceWith(newHeading);

                block.dataset.tag = e.target.value;
            });

        document
            .getElementById('heading-align')
            ?.addEventListener('change', (e) => {

                block.style.textAlign = e.target.value;

                block.dataset.align = e.target.value;
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
            ?.addEventListener('input', (e) => {

                text.style.color = e.target.value;

                block.dataset.color = e.target.value;
            });

        document.getElementById('text-size')
            ?.addEventListener('input', (e) => {

                text.style.fontSize = `${e.target.value}px`;

                block.dataset.fontSize = e.target.value;
            });

        document.getElementById('text-weight')
            ?.addEventListener('change', (e) => {

                text.style.fontWeight = e.target.value;

                block.dataset.fontWeight = e.target.value;
            });

        document.getElementById('text-align')
            ?.addEventListener('change', (e) => {

                block.style.textAlign = e.target.value;

                block.dataset.align = e.target.value;
            });

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
            });
    }
    
    bindListEvents(block) {
        document.getElementById('list-style')
            ?.addEventListener('change', (e) => {
                const ul = block.querySelector('ul');
                if (!ul) return;

                ul.style.listStyleType = e.target.value;

                block.dataset.listStyle = e.target.value;
            });
    }

    bindButtonEvents(block) {

        const button = block.querySelector('button');

        if (!button) return;

        document.getElementById('button-color')
            ?.addEventListener('input', (e) => {

                button.style.backgroundColor = e.target.value;

                block.dataset.buttonColor = e.target.value;
            });

        document.getElementById('button-text-color')
            ?.addEventListener('input', (e) => {

                button.style.color = e.target.value;

                block.dataset.buttonTextColor = e.target.value;
            });

        document.getElementById('button-radius')
            ?.addEventListener('input', (e) => {

                button.style.borderRadius = `${e.target.value}px`;

                block.dataset.buttonRadius = e.target.value;
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

            const reader = new FileReader();

            reader.onload = () => {

                block.innerHTML = `
                    <img
                        src="${reader.result}"
                        class="editor-image"
                        style="
                            width:${block.dataset.imageWidth || 100}%;
                        "
                    >
                `;

                block.dataset.src = reader.result;
            };

            reader.readAsDataURL(file);
        });

        document.getElementById('image-width')
            ?.addEventListener('input', (e) => {

                const img = block.querySelector('img');

                if (!img) return;

                const width = e.target.value;

                block.dataset.imageWidth = width;

                img.style.width = `${width}%`;

                const label =
                    document.getElementById('image-width-value');

                if (label) {
                    label.textContent = `${width}%`;
                }
            });
    }

    bindFormEvents(block) {

        const input = block.querySelector('input');

        if (!input) return;

        document.getElementById('form-placeholder')
            ?.addEventListener('input', (e) => {

                input.placeholder = e.target.value;

                block.dataset.placeholder = e.target.value;
            });
    }
}