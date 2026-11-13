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
            block.dataset.dividerMargin ?? '10';

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
                : 1.0;

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
                        max="3.0"
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
                        max="3.0"
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
                        <option value="square" ${block.dataset.listStyle === 'square' ? 'selected' : ''}>▪ 四角</option>
                        <option value="decimal" ${block.dataset.listStyle === 'decimal' ? 'selected' : ''}>1. 2. 3.</option>
                        <option value="none" ${block.dataset.listStyle === 'none' ? 'selected' : ''}>なし</option>
                    </select>
                    <label>マーカー位置</label>
                    <select id="list-position">
                        <option value="outside" ${block.dataset.listPosition === 'outside' || !block.dataset.listPosition ? 'selected' : ''}>外側</option>
                        <option value="inside" ${block.dataset.listPosition === 'inside' ? 'selected' : ''}>内側</option>
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
                                        <div class="property-toggle-group">

                        <button
                            type="button"
                            id="list-bold"
                            class="toolbar-button property-toggle
                                ${block.dataset.listBold === 'true' ? 'active' : ''}"
                        >
                            <strong>B</strong>
                        </button>

                        <button
                            type="button"
                            id="list-italic"
                            class="toolbar-button property-toggle
                                ${block.dataset.listItalic === 'true' ? 'active' : ''}"
                        >
                            <em>I</em>
                        </button>

                        <button
                            type="button"
                            id="list-underline"
                            class="toolbar-button property-toggle
                                ${block.dataset.listUnderline === 'true' ? 'active' : ''}"
                        >
                            <u>U</u>
                        </button>

                        <button
                            type="button"
                            id="list-strike"
                            class="toolbar-button property-toggle
                                ${block.dataset.listStrike === 'true' ? 'active' : ''}"
                        >
                            <s>S</s>
                        </button>

                    </div>
                `;


                this.bindListEvents(block);
                break;

            
        case 'button': {
            const buttonWidth = Math.min(500, Math.max(
                50, Number(block.dataset.buttonWidth) || 150
            ));

            const buttonHeight = Math.min(200, Math.max(
                20, Number(block.dataset.buttonHeight) || 48
            ));
            const buttonBorderWidth = Math.min(10, Math.max(
                0, Number(block.dataset.buttonBorderWidth) || 0
            ));

            const buttonBorderColor =
                this.safeColor(block.dataset.buttonBorderColor);

            const buttonBorderStyle =
                ['solid', 'dashed', 'dotted'].includes(block.dataset.buttonBorderStyle)
                    ? block.dataset.buttonBorderStyle
                    : 'solid';

            this.elementPanel.innerHTML = `
                <div class="accordion-title">ボタン設定</div>

                <label>リンク先URL</label>
                <input
                    type="url"
                    id="button-url"
                    placeholder="https://example.com"
                >

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
                    value="${Math.min(50, Math.max(0, Number(block.dataset.buttonRadius ?? 12)))}"
                >
                <label>枠線の太さ（px）</label>
                <input
                    type="number"
                    id="button-border-width-number"
                    min="0"
                    max="10"
                    value="${buttonBorderWidth}"
                >
                <input
                    type="range"
                    id="button-border-width-range"
                    min="0"
                    max="10"
                    value="${buttonBorderWidth}"
                >

                <label>枠線の色</label>
                <input
                    type="color"
                    id="button-border-color"
                    value="${buttonBorderColor}"
                >

                <label>枠線の種類</label>
                <select id="button-border-style">
                    <option value="solid" ${buttonBorderStyle === 'solid' ? 'selected' : ''}>実線</option>
                    <option value="dashed" ${buttonBorderStyle === 'dashed' ? 'selected' : ''}>破線</option>
                    <option value="dotted" ${buttonBorderStyle === 'dotted' ? 'selected' : ''}>点線</option>
                </select>

                <hr>

                <div class="accordion-title">サイズ設定</div>

                <label>幅（px）</label>
                <input
                    type="number"
                    id="button-width-number"
                    min="50"
                    max="500"
                    value="${buttonWidth}"
                >
                <input
                    type="range"
                    id="button-width-range"
                    min="50"
                    max="500"
                    value="${buttonWidth}"
                >

                <label>高さ（px）</label>
                <input
                    type="number"
                    id="button-height-number"
                    min="20"
                    max="200"
                    value="${buttonHeight}"
                >
                <input
                    type="range"
                    id="button-height-range"
                    min="20"
                    max="200"
                    value="${buttonHeight}"
                >
            `;
            const buttonUrlInput =
                document.getElementById('button-url');

            if (buttonUrlInput) {
                buttonUrlInput.value = block.dataset.url || '';
            }

            this.bindButtonEvents(block);

            break;
}


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
                    <label>配置</label>
                    <select id="image-align">
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
                    <input
                        type="number"
                        id="image-width-number"
                        min="1"
                        max="100"
                        value="${Math.min(100, Math.max(1, Number(block.dataset.imageWidth) || 100))}"
                    >

                    <label>角丸（px）</label>
                        <input
                            type="range"
                            id="image-radius"
                            min="0"
                            max="50"
                            value="${Math.min(50, Math.max(0, Number(block.dataset.imageRadius) || 0))}"
                        >

                        <span id="image-radius-value">
                            ${Math.min(50, Math.max(0, Number(block.dataset.imageRadius) || 0))}px
                        </span>
                        <input
                            type="number"
                            id="image-radius-number"
                            min="0"
                            max="50"
                            value="${Math.min(50, Math.max(0, Number(block.dataset.imageRadius) || 0))}"
                        >

                        <hr>
                    <label>透明度（%）</label>
                    <input
                        type="range"
                        id="image-opacity"
                        min="0"
                        max="100"
                        value="${block.dataset.imageOpacity ?? 100}"
                    >
                    <span id="image-opacity-value">
                        ${block.dataset.imageOpacity ?? 100}%
                    </span>
                    <input
                        type="number"
                        id="image-opacity-number"
                        min="0"
                        max="100"
                        value="${block.dataset.imageOpacity ?? 100}"
                    >

                    <label>代替テキスト（ALT）</label>
                    <input
                        type="text"
                        id="image-alt"
                        placeholder="画像の内容を入力してください"
                        value="${(block.dataset.alt || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}"
                    >
                `;

                const imageAlign =
                    document.getElementById('image-align');

                if (imageAlign) {
                    imageAlign.value =
                        ['left', 'center', 'right'].includes(block.dataset.imageAlign)
                            ? block.dataset.imageAlign
                            : 'left';
                }

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
    case 'table': {
        const rows = Math.min(20, Math.max(1,
            Number(block.dataset.tableRows) || 3
        ));

        const columns = Math.min(10, Math.max(1,
            Number(block.dataset.tableColumns) || 3
        ));

        let columnWidths = [];
        let rowHeights = [];

        try {
            columnWidths = JSON.parse(
                block.dataset.tableColumnWidths || '[]'
            );
            rowHeights = JSON.parse(
                block.dataset.tableRowHeights || '[]'
            );
        } catch {
            columnWidths = [];
            rowHeights = [];
        }

        this.elementPanel.innerHTML = `
            <div class="accordion-title">テーブル設定</div>

            <label>行数</label>
            <input
                type="number"
                id="table-rows"
                min="1"
                max="20"
                value="${rows}"
            >

            <label>列数</label>
            <input
                type="number"
                id="table-columns"
                min="1"
                max="10"
                value="${columns}"
            >

            <label>文字色</label>
            <input
                type="color"
                id="table-text-color"
                value="${this.safeColor(block.dataset.tableTextColor || '#000000')}"
            >

            <label>背景色</label>
            <input
                type="color"
                id="table-background-color"
                value="${this.safeColor(block.dataset.tableBackgroundColor || '#ffffff')}"
            >

            <label>枠線の種類</label>
            <select id="table-border-style">
                <option value="solid">実線</option>
                <option value="dashed">破線</option>
                <option value="dotted">点線</option>
                <option value="double">二重線</option>
            </select>
            <hr>

            <div class="accordion-title">セルの結合</div>

            <div style="display: flex; flex-direction: column; gap: 8px;">

            

                <button
                    type="button"
                    id="table-merge-cells"
                    class="editor-button"
                >
                    セルを結合
                </button>

                <button
                    type="button"
                    id="table-unmerge-cells"
                    class="editor-button"
                >
                    結合を解除
                </button>

            </div>

            
            <hr>

            <div class="accordion-title">列幅設定</div>

            ${Array.from({ length: columns }, (_, i) => {
                const width = Math.min(500, Math.max(
                    50, Number(columnWidths[i]) || 150
                ));

                return `
                    <label>${i + 1}列目（px）</label>
                    <input
                        type="number"
                        class="table-column-width-number"
                        data-index="${i}"
                        min="50"
                        max="500"
                        value="${width}"
                    >
                    <input
                        type="range"
                        class="table-column-width-range"
                        data-index="${i}"
                        min="50"
                        max="500"
                        value="${width}"
                    >
                `;
            }).join('')}

            <hr>

            <div class="accordion-title">行高さ設定</div>

            ${Array.from({ length: rows }, (_, i) => {
                const height = Math.min(300, Math.max(
                    30, Number(rowHeights[i]) || 60
                ));

                return `
                    <label>${i + 1}行目（px）</label>
                    <input
                        type="number"
                        class="table-row-height-number"
                        data-index="${i}"
                        min="30"
                        max="300"
                        value="${height}"
                    >
                    <input
                        type="range"
                        class="table-row-height-range"
                        data-index="${i}"
                        min="30"
                        max="300"
                        value="${height}"
                    >
                `;
            }).join('')}
        `;

        document.getElementById('table-border-style').value =
            block.dataset.tableBorderStyle || 'solid';

        this.bindTableEvents(block);

        break;
    }

            case 'divider':

                this.elementPanel.innerHTML = `
                    <div class="accordion-title">水平線設定</div>

                    <label>水平線の種類</label>
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
                    <label>水平線の太さ（px）</label>

                    <input
                        type="number"
                        id="divider-thickness"
                        min="1"
                        max="20"
                        value="${Math.min(20, Math.max(1, Number(currentDividerThickness) || 2))}"
                    >
                    <label>水平線の色</label>
                    <input
                        type="color"
                        id="divider-color"
                        value="${this.safeColor(currentDividerColor)}"
                    >
                    <label>水平線の余白（px）</label>
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

                // 最小値1.0、最大値3.0に制限
                if (!Number.isFinite(lineHeight)) {
                    lineHeight = 1.0;
                }

                lineHeight = Math.max(1.0, Math.min(3.0, lineHeight));

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

                // リスト文字装飾
        const applyListDecoration = () => {

            const items = ul.querySelectorAll('li');

            items.forEach((li) => {

                // 太字
                li.style.fontWeight =
                    block.dataset.listBold === 'true'
                        ? '700'
                        : '400';

                // 斜体
                li.style.fontStyle =
                    block.dataset.listItalic === 'true'
                        ? 'italic'
                        : 'normal';

                // 下線・取り消し線
                li.style.textDecoration = [
                    block.dataset.listUnderline === 'true'
                        ? 'underline'
                        : '',

                    block.dataset.listStrike === 'true'
                        ? 'line-through'
                        : ''
                ]
                .filter(Boolean)
                .join(' ');
            });
        };

        this.toggleButton(
            block,
            'list-bold',
            'listBold',
            applyListDecoration
        );

        this.toggleButton(
            block,
            'list-italic',
            'listItalic',
            applyListDecoration
        );

        this.toggleButton(
            block,
            'list-underline',
            'listUnderline',
            applyListDecoration
        );

        this.toggleButton(
            block,
            'list-strike',
            'listStrike',
            applyListDecoration
        );

        // リストタイプ設定
        document.getElementById('list-style')
            ?.addEventListener('change', (e) => {

                const allowedStyles = ['disc', 'circle', 'square', 'decimal', 'none'];

                const style = allowedStyles.includes(e.target.value)
                    ? e.target.value
                    : 'disc';

                ul.style.listStyleType = style;
                block.dataset.listStyle = style;

                this.historyManager.save();
                this.editor.markDirty();
            });
        
        // マーカー位置設定
    document.getElementById('list-position')
        ?.addEventListener('change', (e) => {

            const allowedPositions = ['outside', 'inside'];

            const position = allowedPositions.includes(e.target.value)
                ? e.target.value
                : 'outside';

            ul.style.listStylePosition = position;
            block.dataset.listPosition = position;

            this.historyManager.save();
            this.editor.markDirty();
        });

        // 文字色設定
    document.getElementById('list-color')
        ?.addEventListener('input', (e) => {

            const color = this.safeColor(e.target.value);

            const items = block.querySelectorAll('li');

            items.forEach((li) => {
                li.style.color = color;
            });

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

        // 編集画面ではリンク遷移を無効にする
        button.addEventListener('click', (e) => {

            // 編集画面では遷移しない
            if (!this.editor.isPreview) {
                e.preventDefault();
                return;
            }

            // プレビュー中のリンク先を取得
            const url = block.dataset.url?.trim();

            if (!url) {
                e.preventDefault();
                return;
            }

            try {
                const parsedUrl = new URL(url);

                // HTTP・HTTPS以外のURLは許可しない
                if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
                    e.preventDefault();
                    return;
                }

                window.location.href = parsedUrl.href;

            } catch {
                e.preventDefault();
            }
        });
                        // リンク先URL
        document.getElementById('button-url')
            ?.addEventListener('change', (e) => {

                const url = e.target.value.trim();

                block.dataset.url = url;

                this.historyManager.save();
                this.editor.markDirty();
            });

        // 背景色
        document.getElementById('button-color')
            ?.addEventListener('input', (e) => {

                const color = this.safeColor(e.target.value);

                button.style.backgroundColor = color;
                block.dataset.buttonColor = color;
                this.historyManager.save();
                this.editor.markDirty();
            });

        // 文字色
        document.getElementById('button-text-color')
            ?.addEventListener('input', (e) => {

                const color = this.safeColor(e.target.value);

                button.style.color = color;
                block.dataset.buttonTextColor = color;
                this.historyManager.save();
                this.editor.markDirty();
            });

        // 角丸
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

                // 枠線の設定
        const applyButtonBorder = () => {

            const width = Math.min(10, Math.max(
                0, Number(block.dataset.buttonBorderWidth) || 0
            ));

            const color = this.safeColor(
                block.dataset.buttonBorderColor || '#000000'
            );

            const allowedStyles = ['solid', 'dashed', 'dotted'];

            const style = allowedStyles.includes(
                block.dataset.buttonBorderStyle
            )
                ? block.dataset.buttonBorderStyle
                : 'solid';

            button.style.border = `${width}px ${style} ${color}`;
        };

        // 枠線の太さ
        const borderWidthNumber = document.getElementById(
            'button-border-width-number'
        );

        const borderWidthRange = document.getElementById(
            'button-border-width-range'
        );

        const updateBorderWidth = (value) => {

            if (value === '') return;

            let width = Number(value);

            if (!Number.isFinite(width)) return;

            width = Math.max(0, Math.min(10, width));

            borderWidthNumber.value = width;
            borderWidthRange.value = width;

            block.dataset.buttonBorderWidth = String(width);

            applyButtonBorder();
            this.editor.markDirty();
        };

        borderWidthNumber?.addEventListener('input', () => {
            updateBorderWidth(borderWidthNumber.value);
        });

        borderWidthRange?.addEventListener('input', () => {
            updateBorderWidth(borderWidthRange.value);
        });

        borderWidthNumber?.addEventListener('change', () => {
            updateBorderWidth(borderWidthNumber.value);
            this.historyManager.save();
        });

        borderWidthRange?.addEventListener('change', () => {
            updateBorderWidth(borderWidthRange.value);
            this.historyManager.save();
        });

        // 枠線の色
        document.getElementById('button-border-color')
            ?.addEventListener('input', (e) => {

                const color = this.safeColor(e.target.value);

                block.dataset.buttonBorderColor = color;

                applyButtonBorder();

                this.historyManager.save();
                this.editor.markDirty();
            });

        // 枠線の種類
        document.getElementById('button-border-style')
            ?.addEventListener('change', (e) => {

                const allowedStyles = ['solid', 'dashed', 'dotted'];

                const style = allowedStyles.includes(e.target.value)
                    ? e.target.value
                    : 'solid';

                block.dataset.buttonBorderStyle = style;

                applyButtonBorder();

                this.historyManager.save();
                this.editor.markDirty();
            });

        // 幅・高さの設定
        const bindSizeControl = (
            numberId,
            rangeId,
            datasetName,
            styleProperty,
            min,
            max
        ) => {

            const numberInput = document.getElementById(numberId);
            const rangeInput = document.getElementById(rangeId);

            if (!numberInput || !rangeInput) return;

            const update = (value) => {

                if (value === '') return;

                let size = Number(value);

                if (!Number.isFinite(size)) return;

                size = Math.max(min, Math.min(max, size));

                numberInput.value = size;
                rangeInput.value = size;

                button.style[styleProperty] = `${size}px`;
                block.dataset[datasetName] = String(size);

                this.editor.markDirty();
            };

            numberInput.addEventListener('input', () => {
                update(numberInput.value);
            });

            rangeInput.addEventListener('input', () => {
                update(rangeInput.value);
            });

            numberInput.addEventListener('change', () => {
                update(numberInput.value);
                this.historyManager.save();
            });

            rangeInput.addEventListener('change', () => {
                update(rangeInput.value);
                this.historyManager.save();
            });
        };

        // 幅：50～500px
        bindSizeControl(
            'button-width-number',
            'button-width-range',
            'buttonWidth',
            'width',
            50,
            500
        );

        // 高さ：20～200px
        bindSizeControl(
            'button-height-number',
            'button-height-range',
            'buttonHeight',
            'height',
            20,
            200
        );
    }

    bindImageEvents(block) {

        const fileInput =
            document.getElementById('image-upload');
                    // 画像の配置設定
    document.getElementById('image-align')
        ?.addEventListener('change', (e) => {

            const allowedAlignments = ['left', 'center', 'right'];

            const align = allowedAlignments.includes(e.target.value)
                ? e.target.value
                : 'left';

            const img = block.querySelector('.editor-image');

            if (!img) return;

            img.style.display = 'block';

            if (align === 'left') {
                img.style.marginLeft = '0';
                img.style.marginRight = 'auto';
            } else if (align === 'center') {
                img.style.marginLeft = 'auto';
                img.style.marginRight = 'auto';
            } else {
                img.style.marginLeft = 'auto';
                img.style.marginRight = '0';
            }

            block.dataset.imageAlign = align;

            this.historyManager.save();
            this.editor.markDirty();
        });
        
                document.getElementById('image-alt')
            ?.addEventListener('input', (e) => {

                const alt = e.target.value;

                const img = block.querySelector('.editor-image');

                if (img) {
                    img.alt = alt;
                }

                block.dataset.alt = alt;

                this.editor.markDirty();
            });

        document.getElementById('image-alt')
            ?.addEventListener('change', () => {
                this.historyManager.save();
            });

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
                block.dataset.src = reader.result;
                img.alt = block.dataset.alt || '';
                let width = Number(block.dataset.imageWidth);

                if (!Number.isFinite(width)) {
                    width = 100;
                }

                width = Math.max(1, Math.min(100, width));

                img.style.width = `${width}%`;
                // 角丸を反映
                const radius = Math.max(
                    0,
                    Math.min(50, Number(block.dataset.imageRadius) || 0)
                );

                img.style.borderRadius = `${radius}px`;
                // 透明度を反映
                const opacityValue = Number(block.dataset.imageOpacity);

                const opacity = Number.isFinite(opacityValue)
                    ? Math.max(0, Math.min(100, opacityValue))
                    : 100;

img.style.opacity = String(opacity / 100);

                // 画像の配置を反映
                const align = ['left', 'center', 'right'].includes(block.dataset.imageAlign)
                    ? block.dataset.imageAlign
                    : 'left';

                img.style.display = 'block';

                if (align === 'left') {
                    img.style.marginLeft = '0';
                    img.style.marginRight = 'auto';
                } else if (align === 'center') {
                    img.style.marginLeft = 'auto';
                    img.style.marginRight = 'auto';
                } else {
                    img.style.marginLeft = 'auto';
                    img.style.marginRight = '0';
                }

            // 削除ボタンとドラッグボタンを残して、画像だけを入れ替える
            Array.from(block.children).forEach(child => {
                if (
                    !child.classList.contains('delete-button') &&
                    !child.classList.contains('drag-handle')
                ) {
                    child.remove();
                }
            });

            block.appendChild(img);            
        
                    this.historyManager.save();
            this.editor.markDirty();};
        
            reader.onerror = () => {
                alert('画像の読み込みに失敗しました。');
            };

            reader.readAsDataURL(file);
        });

        // 画像サイズ設定
        const widthSlider = document.getElementById('image-width');
        const widthNumber = document.getElementById('image-width-number');

        const updateImageWidth = (value) => {

            let width = Number(value);

            if (!Number.isFinite(width)) {
                width = 100;
            }

            width = Math.max(1, Math.min(100, width));

            const img = block.querySelector('.editor-image');

            if (img) {
                img.style.width = `${width}%`;
            }

            if (widthSlider) {
                widthSlider.value = width;
            }

            if (widthNumber) {
                widthNumber.value = width;
            }

            block.dataset.imageWidth = String(width);

            const label = document.getElementById('image-width-value');

            if (label) {
                label.textContent = `${width}%`;
            }

            this.historyManager.save();
            this.editor.markDirty();
        };

        widthSlider?.addEventListener('input', (e) => {
            updateImageWidth(e.target.value);
        });

        widthNumber?.addEventListener('change', (e) => {
            updateImageWidth(e.target.value);
        });
            // 角丸設定
            const radiusSlider = document.getElementById('image-radius');
            const radiusNumber = document.getElementById('image-radius-number');

            const updateImageRadius = (value) => {

                let radius = Number(value);

                if (!Number.isFinite(radius)) {
                    radius = 0;
                }

                radius = Math.max(0, Math.min(50, radius));

                const img = block.querySelector('.editor-image');

                if (img) {
                    img.style.borderRadius = `${radius}px`;
                }

                if (radiusSlider) {
                    radiusSlider.value = radius;
                }

                if (radiusNumber) {
                    radiusNumber.value = radius;
                }

                block.dataset.imageRadius = String(radius);

                const label = document.getElementById('image-radius-value');

                if (label) {
                    label.textContent = `${radius}px`;
                }

                this.historyManager.save();
                this.editor.markDirty();
            };

            radiusSlider?.addEventListener('input', (e) => {
                updateImageRadius(e.target.value);
            });

            radiusNumber?.addEventListener('change', (e) => {
                updateImageRadius(e.target.value);
            });
                        // 透明度設定
        const opacitySlider = document.getElementById('image-opacity');
        const opacityNumber = document.getElementById('image-opacity-number');

        const updateImageOpacity = (value) => {

            let opacity = Number(value);

            if (!Number.isFinite(opacity)) {
                opacity = 100;
            }

            opacity = Math.max(0, Math.min(100, opacity));

            const img = block.querySelector('.editor-image');

            if (img) {
                img.style.opacity = String(opacity / 100);
            }

            if (opacitySlider) {
                opacitySlider.value = opacity;
            }

            if (opacityNumber) {
                opacityNumber.value = opacity;
            }

            block.dataset.imageOpacity = String(opacity);

            const label = document.getElementById('image-opacity-value');

            if (label) {
                label.textContent = `${opacity}%`;
            }

            this.historyManager.save();
            this.editor.markDirty();
        };

        opacitySlider?.addEventListener('input', (e) => {
            updateImageOpacity(e.target.value);
        });

        opacityNumber?.addEventListener('change', (e) => {
            updateImageOpacity(e.target.value);
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
// テーブルの設定
bindTableEvents(block) {

    const table = block.querySelector('.editor-table');

    if (!table) return;

    // 指定した行・列の位置にセルを挿入
    const insertCellAtPosition = (targetRow, newCell, targetCol) => {

        const currentRows = [...table.querySelectorAll('tr')];

        const targetRowIndex = currentRows.indexOf(targetRow);

        if (targetRowIndex === -1) return;

        // 現在のセル配置を把握する
        const grid = Array.from(
            { length: currentRows.length },
            () => []
        );

        const cellPositions = [];

        currentRows.forEach((tr, rowIndex) => {

            let colIndex = 0;

            [...tr.querySelectorAll('td, th')].forEach(currentCell => {

                while (grid[rowIndex][colIndex]) {
                    colIndex++;
                }

                const rowspan = Math.max(1, currentCell.rowSpan || 1);
                const colspan = Math.max(1, currentCell.colSpan || 1);

                cellPositions.push({
                    cell: currentCell,
                    row: rowIndex,
                    col: colIndex
                });

                for (
                    let r = rowIndex;
                    r < rowIndex + rowspan;
                    r++
                ) {
                    for (
                        let c = colIndex;
                        c < colIndex + colspan;
                        c++
                    ) {
                        if (grid[r]) {
                            grid[r][c] = currentCell;
                        }
                    }
                }

                colIndex += colspan;
            });
        });

        const beforePosition = cellPositions.find(position => {
            return position.row === targetRowIndex &&
                position.col >= targetCol;
        });

        targetRow.insertBefore(
            newCell,
            beforePosition ? beforePosition.cell : null
        );
    };

    
    // セルのドラッグ選択
    if (table.dataset.selectionBound !== 'true') {

        table.dataset.selectionBound = 'true';

        table._selectedCells = [];

        let isSelecting = false;
        let startCell = null;
        
    

        // 選択状態を解除
        const clearCellSelection = () => {

            table._selectedCells.forEach(cell => {
                cell.style.outline = '';
                cell.style.outlineOffset = '';
            });

            table._selectedCells = [];
        };

        // ドラッグ範囲のセルを選択
    const selectCellRange = (endCell) => {

        if (!startCell || !endCell) return;

        clearCellSelection();

        const rows = [...table.querySelectorAll('tr')];

        // 結合セルを考慮したセル配置表を作成
        const grid = Array.from(
            { length: rows.length },
            () => []
        );

        rows.forEach((tr, rowIndex) => {

            const cells = [...tr.querySelectorAll('td, th')];

            let colIndex = 0;

            cells.forEach(cell => {

                // すでに結合セルで埋まっている位置を飛ばす
                while (grid[rowIndex][colIndex]) {
                    colIndex++;
                }

                const rowspan = Math.max(1, cell.rowSpan || 1);
                const colspan = Math.max(1, cell.colSpan || 1);

                // 結合セルが占める範囲を記録
                for (let r = rowIndex; r < rowIndex + rowspan; r++) {

                    for (let c = colIndex; c < colIndex + colspan; c++) {

                        if (grid[r]) {
                            grid[r][c] = cell;
                        }
                    }
                }

                colIndex += colspan;
            });
        });

        // セルの位置を取得
        const getCellPosition = (targetCell) => {

            for (let r = 0; r < grid.length; r++) {

                for (let c = 0; c < grid[r].length; c++) {

                    if (grid[r][c] === targetCell) {
                        return { row: r, col: c };
                    }
                }
            }

            return null;
        };

        const start = getCellPosition(startCell);
        const end = getCellPosition(endCell);

        if (!start || !end) return;

        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);

        const minCol = Math.min(start.col, end.col);
        const maxCol = Math.max(start.col, end.col);

        // 範囲内のセルを重複なく選択
        const selectedCells = new Set();

        for (let r = minRow; r <= maxRow; r++) {

            for (let c = minCol; c <= maxCol; c++) {

                const cell = grid[r][c];

                if (cell) {
                    selectedCells.add(cell);
                }
            }
        }

        selectedCells.forEach(cell => {

            cell.style.outline = '2px solid #3b82f6';
            cell.style.outlineOffset = '-2px';

            table._selectedCells.push(cell);
        });
    };
        // マウスを押したとき
        table.addEventListener('mousedown', (e) => {

            if (e.button !== 0) return;

            const cell = e.target.closest('td, th');

            if (!cell || !table.contains(cell)) return;

            isSelecting = true;
            startCell = cell;

            selectCellRange(cell);
        });

        // マウスを動かしたとき
        table.addEventListener('mouseover', (e) => {

            if (!isSelecting) return;

            const cell = e.target.closest('td, th');

            if (!cell || !table.contains(cell)) return;

            selectCellRange(cell);
        });

        // マウスを離したとき
        document.addEventListener('mouseup', () => {

            isSelecting = false;
        });
    }
        // セルの選択状態を解除
    const clearCellSelection = () => {

        if (!Array.isArray(table._selectedCells)) return;

        table._selectedCells.forEach(cell => {
            cell.style.outline = '';
            cell.style.outlineOffset = '';
        });

        table._selectedCells = [];
    };

    // セルの結合
    document.getElementById('table-merge-cells')
        ?.addEventListener('click', () => {

            const selectedCells = table._selectedCells || [];

            if (selectedCells.length < 2) {
                alert('結合するセルを2つ以上選択してください。');
                return;
            }

            const rows = [...table.querySelectorAll('tr')];

            // セルの配置を把握する
            const grid = Array.from(
                { length: rows.length },
                () => []
            );

            rows.forEach((tr, rowIndex) => {

                let colIndex = 0;

                [...tr.querySelectorAll('td, th')].forEach(cell => {

                    while (grid[rowIndex][colIndex]) {
                        colIndex++;
                    }

                    const rowspan = Math.max(1, cell.rowSpan || 1);
                    const colspan = Math.max(1, cell.colSpan || 1);

                    for (let r = rowIndex; r < rowIndex + rowspan; r++) {
                        for (let c = colIndex; c < colIndex + colspan; c++) {
                            if (grid[r]) {
                                grid[r][c] = cell;
                            }
                        }
                    }

                    colIndex += colspan;
                });
            });

            // 選択セルの位置を取得
            const positions = [];

            grid.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {

                    if (selectedCells.includes(cell)) {
                        positions.push({
                            cell,
                            row: rowIndex,
                            col: colIndex
                        });
                    }
                });
            });

            if (positions.length === 0) return;

            const minRow = Math.min(...positions.map(p => p.row));
            const maxRow = Math.max(...positions.map(p => p.row));
            const minCol = Math.min(...positions.map(p => p.col));
            const maxCol = Math.max(...positions.map(p => p.col));

            const rowspan = maxRow - minRow + 1;
            const colspan = maxCol - minCol + 1;

            // 選択範囲が長方形か確認
            for (let r = minRow; r <= maxRow; r++) {
                for (let c = minCol; c <= maxCol; c++) {

                    if (!grid[r] || !grid[r][c] ||
                        !selectedCells.includes(grid[r][c])) {

                        alert('隣接したセルを長方形に選択してください。');
                        return;
                    }
                }
            }

            // 結合するセルを取得
            const mergedCells = [];

            for (let r = minRow; r <= maxRow; r++) {
                for (let c = minCol; c <= maxCol; c++) {

                    const cell = grid[r][c];

                    if (!mergedCells.includes(cell)) {
                        mergedCells.push(cell);
                    }
                }
            }

            // 左上のセルを残す
            const mainCell = grid[minRow][minCol];

            // 結合前の情報と位置を保存
            const backup = mergedCells.map(cell => {

                let cellRow = -1;
                let cellCol = -1;

                // セルが元々あった行・列を取得
                for (let r = 0; r < grid.length; r++) {
                    for (let c = 0; c < grid[r].length; c++) {

                        if (grid[r][c] === cell) {
                            cellRow = r;
                            cellCol = c;
                            break;
                        }
                    }

                    if (cellRow !== -1) break;
                }

                return {
                    row: cellRow,
                    col: cellCol,
                    text: cell.textContent,
                    textColor: cell.style.color,
                    backgroundColor: cell.style.backgroundColor,
                    border: cell.style.border,
                    colspan: cell.colSpan,
                    rowspan: cell.rowSpan,
                    mergedCells: cell.dataset.mergedCells || null,
                };
            });

            mainCell.dataset.mergedCells = JSON.stringify(backup);

            mainCell.colSpan = colspan;
            mainCell.rowSpan = rowspan;

            // ほかのセルを削除
            mergedCells.forEach(cell => {
                if (cell !== mainCell) {
                    cell.remove();
                }
            });

            clearCellSelection();

            this.historyManager.save();
            this.editor.markDirty();
        });

    // セルの結合解除
    document.getElementById('table-unmerge-cells')
        ?.addEventListener('click', () => {

            const selectedCells = table._selectedCells || [];

            if (selectedCells.length !== 1) {
                alert('結合を解除するセルを1つ選択してください。');
                return;
            }

            const cell = selectedCells[0];

            if (!cell.dataset.mergedCells) {
                alert('このセルは結合されていません。');
                return;
            }

    
            let backup;

            try {
                backup = JSON.parse(cell.dataset.mergedCells);
            } catch {
                alert('セルの結合情報を読み込めませんでした。');
                return;
            }

            if (!Array.isArray(backup) || backup.length === 0) {
                alert('セルの結合情報が正しくありません。');
                return;
            }


            // 結合前の情報を復元
            const mainBackup = backup[0];

            cell.colSpan = mainBackup.colspan || 1;
            cell.rowSpan = mainBackup.rowspan || 1;

            cell.textContent = mainBackup.text ?? mainBackup.html ?? '';

            cell.style.color = mainBackup.textColor || '';
            cell.style.backgroundColor = mainBackup.backgroundColor || '';
            cell.style.border = mainBackup.border || '';

            // 以前の結合情報も復元
            if (mainBackup.mergedCells) {
                cell.dataset.mergedCells = mainBackup.mergedCells;
            } else {
                delete cell.dataset.mergedCells;
            }

            // 追加するセルを元の位置に復元
    const restoreCells = backup.slice(1).sort((a, b) => {
        return a.row - b.row || a.col - b.col;
    });

// 保存した位置に順番にセルを復元
restoreCells.forEach(saved => {

    const targetRow = [...table.querySelectorAll('tr')][saved.row];

    if (!targetRow) return;

    const newCell = document.createElement('td');

    newCell.contentEditable = 'true';

    // 編集内容を変更として記録
    newCell.addEventListener('input', () => {
        this.editor.markDirty();
    });

    // 編集終了時に履歴を保存
    newCell.addEventListener('blur', () => {
        this.historyManager.save();
    });

    newCell.textContent = saved.text ?? saved.html ?? '';

    newCell.style.color = saved.textColor || '';
    newCell.style.backgroundColor = saved.backgroundColor || '';
    newCell.style.border = saved.border || '';

    newCell.colSpan = saved.colspan || 1;
    newCell.rowSpan = saved.rowspan || 1;

    // 以前の結合情報を復元
    if (saved.mergedCells) {
        newCell.dataset.mergedCells = saved.mergedCells;
    }

    insertCellAtPosition(targetRow, newCell, saved.col);
});


            clearCellSelection();

            this.historyManager.save();
            this.editor.markDirty();
        });


    // 列幅の取得
    const getColumnWidths = () => {
        let values = [];

        try {
            values = JSON.parse(
                block.dataset.tableColumnWidths || '[]'
            );
        } catch {
            values = [];
        }

        const columns = Number(block.dataset.tableColumns) || 3;

        return Array.from({ length: columns }, (_, i) => {
            return Math.min(500, Math.max(50, Number(values[i]) || 150));
        });
    };

    // 行高さの取得
    const getRowHeights = () => {
        let values = [];

        try {
            values = JSON.parse(
                block.dataset.tableRowHeights || '[]'
            );
        } catch {
            values = [];
        }

        const rows = Number(block.dataset.tableRows) || 3;

        return Array.from({ length: rows }, (_, i) => {
            return Math.min(300, Math.max(30, Number(values[i]) || 60));
        });
    };

    // 列幅・行高さを反映
    const applyTableDimensions = () => {

        const widths = getColumnWidths();
        const heights = getRowHeights();

        block.dataset.tableColumnWidths = JSON.stringify(widths);
        block.dataset.tableRowHeights = JSON.stringify(heights);

        let colgroup = table.querySelector('colgroup');

        if (!colgroup) {
            colgroup = document.createElement('colgroup');
            table.insertBefore(colgroup, table.firstChild);
        }

        colgroup.replaceChildren();

        widths.forEach(width => {
            const col = document.createElement('col');
            col.style.width = `${width}px`;
            colgroup.appendChild(col);
        });

        table.querySelectorAll('tr').forEach((tr, i) => {
            const height = heights[i];

            if (height === undefined) return;

            tr.style.height = `${height}px`;

            tr.querySelectorAll('td, th').forEach(cell => {
                cell.style.height = `${height}px`;
            });
        });
    };

    // 文字色・背景色・枠線
    const applyTableStyles = (
        targetCells = table._selectedCells?.length
            ? table._selectedCells
            : [...table.querySelectorAll('td, th')],
        preserveExisting = false
    ) => {

        const textColor =
            this.safeColor(block.dataset.tableTextColor || '#000000');

        const backgroundColor =
            this.safeColor(block.dataset.tableBackgroundColor || '#ffffff');

        const allowedStyles = ['solid', 'dashed', 'dotted', 'double'];

        const borderStyle = allowedStyles.includes(block.dataset.tableBorderStyle)
            ? block.dataset.tableBorderStyle
            : 'solid';

        targetCells.forEach(cell => {

            if (!preserveExisting || !cell.style.color) {
                cell.style.color = textColor;
            }

            if (!preserveExisting || !cell.style.backgroundColor) {
                cell.style.backgroundColor = backgroundColor;
            }

            if (!preserveExisting || !cell.style.border) {
                cell.style.border = `1px ${borderStyle} #000000`;
            }
        });
    };

    // 数値入力とスライダーの連動
    const bindDimensionInputs = (
        numberSelector,
        rangeSelector,
        min,
        max,
        getValues,
        datasetName
    ) => {

        const numbers =
            this.elementPanel.querySelectorAll(numberSelector);

        const ranges =
            this.elementPanel.querySelectorAll(rangeSelector);

        numbers.forEach(numberInput => {

            const index = Number(numberInput.dataset.index);

            const rangeInput = [...ranges].find(input =>
                Number(input.dataset.index) === index
            );

            if (!rangeInput) return;

            const update = () => {

                let value = Number(numberInput.value);

                if (!Number.isFinite(value)) return;

                value = Math.min(max, Math.max(min, value));

                numberInput.value = value;
                rangeInput.value = value;

                const values = getValues();

                values[index] = value;

                block.dataset[datasetName] =
                    JSON.stringify(values);

                applyTableDimensions();

                this.editor.markDirty();
            };

            numberInput.addEventListener('input', update);

            rangeInput.addEventListener('input', () => {
                numberInput.value = rangeInput.value;
                update();
            });

            numberInput.addEventListener('change', () => {
                this.historyManager.save();
            });

            rangeInput.addEventListener('change', () => {
                this.historyManager.save();
            });
        });
    };

    // 列幅設定
    bindDimensionInputs(
        '.table-column-width-number',
        '.table-column-width-range',
        50,
        500,
        getColumnWidths,
        'tableColumnWidths'
    );

    // 行高さ設定
    bindDimensionInputs(
        '.table-row-height-number',
        '.table-row-height-range',
        30,
        300,
        getRowHeights,
        'tableRowHeights'
    );

        // 行数・列数の変更
    const updateTableSize = () => {

        let rows = Number(document.getElementById('table-rows').value);
        let columns = Number(document.getElementById('table-columns').value);

        rows = Number.isFinite(rows) ? Math.max(1, Math.min(20, rows)) : 3;
        columns = Number.isFinite(columns) ? Math.max(1, Math.min(10, columns)) : 3;

        document.getElementById('table-rows').value = rows;
        document.getElementById('table-columns').value = columns;

        // 変更前の行・列情報を取得
        const oldWidths = getColumnWidths();
        const oldHeights = getRowHeights();

        const oldRows = [...table.querySelectorAll('tr')];

        // 変更前の結合情報を記録する
const mergeRecords = [];
const recordedMerges = new Set();

const collectNestedMerges = (
    row,
    col,
    rowspan,
    colspan,
    backupJson
) => {

    const key = `${row}:${col}:${rowspan}:${colspan}`;

    if (recordedMerges.has(key)) return;

    recordedMerges.add(key);

    mergeRecords.push({
        row,
        col,
        rowspan,
        colspan
    });

    let backup;

    try {
        backup = JSON.parse(backupJson);
    } catch {
        return;
    }

    if (!Array.isArray(backup)) return;

    // 結合セルの中にある、さらに結合されたセルも記録する
    backup.forEach(saved => {

        if (!saved.mergedCells) return;

        collectNestedMerges(
            saved.row,
            saved.col,
            Math.max(1, saved.rowspan || 1),
            Math.max(1, saved.colspan || 1),
            saved.mergedCells
        );
    });
};

        // 現在のテーブル配置から結合セルの位置を取得する
        const currentGrid = Array.from(
            { length: oldRows.length },
            () => []
        );

        oldRows.forEach((tr, rowIndex) => {

            let colIndex = 0;

            [...tr.querySelectorAll('td, th')].forEach(cell => {

                while (currentGrid[rowIndex][colIndex]) {
                    colIndex++;
                }

                const rowspan = Math.max(1, cell.rowSpan || 1);
                const colspan = Math.max(1, cell.colSpan || 1);

                if (cell.dataset.mergedCells) {
                    collectNestedMerges(
                        rowIndex,
                        colIndex,
                        rowspan,
                        colspan,
                        cell.dataset.mergedCells
                    );
                }

                for (
                    let r = rowIndex;
                    r < rowIndex + rowspan;
                    r++
                ) {
                    for (
                        let c = colIndex;
                        c < colIndex + colspan;
                        c++
                    ) {
                        if (currentGrid[r]) {
                            currentGrid[r][c] = cell;
                        }
                    }
                }

                colIndex += colspan;
            });
        });

                // 結合セルをすべて解除する（入れ子の結合にも対応）
        const mergedCells = [
            ...table.querySelectorAll(
                'td[data-merged-cells], th[data-merged-cells]'
            )
        ];

        const mergeQueue = [...mergedCells];

        while (mergeQueue.length > 0) {

            const cell = mergeQueue.shift();

            if (!cell.isConnected || !cell.dataset.mergedCells) {
                continue;
            }

            const backupJson = cell.dataset.mergedCells;

            // 処理済みとして一度結合情報を削除
            delete cell.dataset.mergedCells;

            let backup;

            try {
                backup = JSON.parse(backupJson);
            } catch {
                console.error('セルの結合情報を読み込めませんでした。');
                continue;
            }

            if (!Array.isArray(backup) || backup.length === 0) {
                continue;
            }

            // 結合前のセル情報を位置順に並べる
            const restoreCells = [...backup].sort((a, b) => {
                return a.row - b.row || a.col - b.col;
            });

            // 左上セルを復元
            const mainBackup = restoreCells[0];

            cell.colSpan = mainBackup.colspan || 1;
            cell.rowSpan = mainBackup.rowspan || 1;
            cell.textContent = mainBackup.text ?? mainBackup.html ?? '';

            cell.style.color = mainBackup.textColor || '';
            cell.style.backgroundColor = mainBackup.backgroundColor || '';
            cell.style.border = mainBackup.border || '';

            // 左上セルに入れ子の結合情報があれば再度処理する
            if (mainBackup.mergedCells) {
                cell.dataset.mergedCells = mainBackup.mergedCells;
                mergeQueue.push(cell);
            }

            // 残りのセルを元の位置に復元
            restoreCells.slice(1).forEach(saved => {

                const targetRow = oldRows[saved.row];

                if (!targetRow) return;

                const newCell = document.createElement('td');

                newCell.contentEditable = 'true';
                newCell.textContent = saved.text ?? saved.html ?? '';

                newCell.style.color = saved.textColor || '';
                newCell.style.backgroundColor = saved.backgroundColor || '';
                newCell.style.border = saved.border || '';

                newCell.colSpan = saved.colspan || 1;
                newCell.rowSpan = saved.rowspan || 1;

                // 入れ子の結合情報を引き継ぐ
                if (saved.mergedCells) {
                    newCell.dataset.mergedCells = saved.mergedCells;
                    mergeQueue.push(newCell);
                }

                newCell.addEventListener('input', () => {
                    this.editor.markDirty();
                });

                newCell.addEventListener('blur', () => {
                    this.historyManager.save();
                });

                // 元の列位置に挿入
                insertCellAtPosition(targetRow, newCell, saved.col);
            });
}
            // 結合解除後のセル配置表を作成
            const oldGrid = Array.from(
                { length: oldRows.length },
                () => []
            );

            oldRows.forEach((tr, rowIndex) => {

                let colIndex = 0;

                [...tr.querySelectorAll('td, th')].forEach(cell => {

                    while (oldGrid[rowIndex][colIndex]) {
                        colIndex++;
                    }

                    const rowspan = Math.max(1, cell.rowSpan || 1);
                    const colspan = Math.max(1, cell.colSpan || 1);

                    for (
                        let r = rowIndex;
                        r < rowIndex + rowspan;
                        r++
                    ) {
                        for (
                            let c = colIndex;
                            c < colIndex + colspan;
                            c++
                        ) {
                            if (oldGrid[r]) {
                                oldGrid[r][c] = cell;
                            }
                        }
                    }

                    colIndex += colspan;
                });
            });

            // 結合解除後のセル情報を取得
            const tbody = document.createElement('tbody');

            for (let i = 0; i < rows; i++) {

                const tr = document.createElement('tr');

                for (let j = 0; j < columns; j++) {

                    const td = document.createElement('td');

                    const oldCell = oldGrid[i]?.[j];

                    td.contentEditable = 'true';

                    if (oldCell) {

                        // 文字内容を引き継ぐ
                        td.textContent = oldCell.textContent;

                        // セルごとの設定を引き継ぐ
                        td.style.color = oldCell.style.color;
                        td.style.backgroundColor = oldCell.style.backgroundColor;
                        td.style.border = oldCell.style.border;

                    } else {

                        td.textContent = 'テキスト';
                    }

                    // 編集内容を変更として記録
                    td.addEventListener('input', () => {
                        this.editor.markDirty();
                    });

                    // 編集終了時に履歴を保存
                    td.addEventListener('blur', () => {
                        this.historyManager.save();
                    });

                    tr.appendChild(td);
                }

                tbody.appendChild(tr);
            }

        // セルの選択状態を解除
        if (Array.isArray(table._selectedCells)) {

            table._selectedCells.forEach(cell => {
                cell.style.outline = '';
                cell.style.outlineOffset = '';
            });

            table._selectedCells = [];
        }

        // テーブルを再構築
        table.replaceChildren(tbody);

        // 変更後のテーブルに結合セルを再適用する
        const newRows = [...tbody.querySelectorAll('tr')];

        const newGrid = newRows.map(tr => [
            ...tr.querySelectorAll('td, th')
        ]);

        // セルの元の位置を記録する
        const cellPositions = new Map();

        newGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                cellPositions.set(cell, {
                    row: rowIndex,
                    col: colIndex
                });
            });
        });

        // 入れ子の結合を先に復元するため、小さい結合から処理する
        mergeRecords.sort((a, b) => {
            return (a.rowspan * a.colspan) - (b.rowspan * b.colspan);
        });

        mergeRecords.forEach(record => {

            // テーブルの範囲外にある結合は無視する
            if (
                record.row < 0 ||
                record.col < 0 ||
                record.row >= rows ||
                record.col >= columns
            ) {
                return;
            }

            // 新しいテーブルの範囲内に結合範囲を収める
            const clippedRowspan = Math.min(
                record.rowspan,
                rows - record.row
            );

            const clippedColspan = Math.min(
                record.colspan,
                columns - record.col
            );

            if (
                clippedRowspan < 1 ||
                clippedColspan < 1 ||
                (clippedRowspan === 1 && clippedColspan === 1)
            ) {
                return;
            }

            const mainCell = newGrid[record.row][record.col];

            if (!mainCell) return;

            // 結合範囲内のセルを重複なく取得する
            const uniqueCells = new Set();

            for (
                let r = record.row;
                r < record.row + clippedRowspan;
                r++
            ) {
                for (
                    let c = record.col;
                    c < record.col + clippedColspan;
                    c++
                ) {
                    const cell = newGrid[r]?.[c];

                    if (cell) {
                        uniqueCells.add(cell);
                    }
                }
            }

            if (uniqueCells.size < 2) return;

            // 結合前のセル情報を保存する
            const backup = [...uniqueCells].map(cell => {

                const position = cellPositions.get(cell);

                return {
                    row: position.row,
                    col: position.col,
                    text: cell.textContent,
                    textColor: cell.style.color,
                    backgroundColor: cell.style.backgroundColor,
                    border: cell.style.border,
                    colspan: cell.colSpan,
                    rowspan: cell.rowSpan,
                    mergedCells: cell.dataset.mergedCells || null
                };
            });

            // 結合セルを作成する
            mainCell.dataset.mergedCells = JSON.stringify(backup);
            mainCell.colSpan = clippedColspan;
            mainCell.rowSpan = clippedRowspan;

            // 左上以外のセルを削除する
            uniqueCells.forEach(cell => {
                if (cell !== mainCell) {
                    cell.remove();
                }
            });

            // 配置表を更新する
            for (
                let r = record.row;
                r < record.row + clippedRowspan;
                r++
            ) {
                for (
                    let c = record.col;
                    c < record.col + clippedColspan;
                    c++
                ) {
                    newGrid[r][c] = mainCell;
                }
            }
        });

        // 行数・列数を保存
        block.dataset.tableRows = String(rows);
        block.dataset.tableColumns = String(columns);

        // 列幅を引き継ぐ
        block.dataset.tableColumnWidths = JSON.stringify(
            Array.from({ length: columns }, (_, i) => oldWidths[i] || 150)
        );

        // 行高さを引き継ぐ
        block.dataset.tableRowHeights = JSON.stringify(
            Array.from({ length: rows }, (_, i) => oldHeights[i] || 60)
        );

        // セルのスタイルを反映
        applyTableStyles(
            [...table.querySelectorAll('td, th')],
            true
        );

        // 列幅・行高さを反映
        applyTableDimensions();

        this.historyManager.save();
        this.editor.markDirty();

        // 右サイドバーを最新の状態に更新
        this.show(block);
    };

    document.getElementById('table-rows')
        ?.addEventListener('change', updateTableSize);

    document.getElementById('table-columns')
        ?.addEventListener('change', updateTableSize);

    // 文字色
    document.getElementById('table-text-color')
        ?.addEventListener('input', (e) => {

            block.dataset.tableTextColor = this.safeColor(e.target.value);

            applyTableStyles();

            this.historyManager.save();
            this.editor.markDirty();
        });

    // 背景色
    document.getElementById('table-background-color')
        ?.addEventListener('input', (e) => {

            block.dataset.tableBackgroundColor = this.safeColor(e.target.value);

            applyTableStyles();

            this.historyManager.save();
            this.editor.markDirty();
        });

    // 枠線の種類
    document.getElementById('table-border-style')
        ?.addEventListener('change', (e) => {

            const allowedStyles = ['solid', 'dashed', 'dotted', 'double'];

            const style = allowedStyles.includes(e.target.value)
                ? e.target.value
                : 'solid';

            block.dataset.tableBorderStyle = style;

            applyTableStyles();

            this.historyManager.save();
            this.editor.markDirty();
        });

    applyTableStyles(
        [...table.querySelectorAll('td, th')],
        true
    );

    applyTableDimensions()
}
}
