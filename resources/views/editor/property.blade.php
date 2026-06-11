<div class="property">

    <h2 class="property-title">
        プロパティ
    </h2>

    <!-- サイト設定 -->
    <h3 class="accordion-title" data-target="site-settings">
        ▼ サイト設定
    </h3>

    <div id="site-settings" class="accordion-content open">

        <label>サイト名</label>
        <input type="text" id="site-title">

        <label>背景色</label>
        <input type="color" id="site-bgcolor">

        <label>最大幅</label>
        <input type="text" id="site-max-width" placeholder="例: 1200px">

        <label>共通フォント</label>
        <select id="site-font">
            <option>sans-serif</option>
            <option>serif</option>
            <option>monospace</option>
        </select>

    </div>

    <!-- ブロック共通設定 -->
    <h3 class="accordion-title" data-target="common-settings">
        ▼ ブロック共通設定
    </h3>

    <div id="common-settings" class="accordion-content">

        <div id="common-property-panel">

            <p>要素を選択してください</p>

            <!-- 要素選択時にJSで表示 -->
        </div>

    </div>

    <!-- 要素設定 -->
    <h3 class="accordion-title" data-target="element-settings">
        ▼ 要素設定
    </h3>

    <div id="element-settings" class="accordion-content open">

        <div id="element-property-panel">
            <p>要素を選択してください</p>
        </div>

    </div>

</div>