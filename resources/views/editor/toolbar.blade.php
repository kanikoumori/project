<div class="toolbar">

    <a href="/dashboard" class="editor-logo">
        <img src="{{ asset('images/logo.png') }}" alt="ロゴ">
    </a>

    <div class="toolbar-menu">
        <div class="toolbar-dropdown">
            <button class="toolbar-menu-item">
                ファイル
            </button>

            <div class="dropdown-menu">
                <button id="save-button">保存</button>
                <button>公開</button>
            </div>
        </div>

        <div class="toolbar-dropdown">
            <button class="toolbar-menu-item">
                編集
            </button>

            <div class="dropdown-menu">
                <button>元に戻す</button> <!-- ctrl+Z -->
                <button>やり直す</button> <!-- ctrl+Y -->
                <button>コピー</button> <!-- ctrl+C -->
                <button>切り取り</button> <!-- ctrl+X -->
                <button>貼り付け</button> <!-- ctrl+V -->
                <button>複製</button> <!-- ctrl+ D -->
                <button>削除</button> <!-- Delete -->
                <button>すべて選択</button> <!-- ctrl+A -->
            </div>
        </div>

        <div class="toolbar-dropdown">
            <button class="toolbar-menu-item">
                レイヤー
            </button>

            <div class="dropdown-menu">
                <button>上部へ</button>
                <button>最上部へ</button>
                <button>下部へ</button>
                <button>最下部へ</button>
                <button>ロック</button>
                <button>非表示</button>
            </div>
        </div>

        <div class="toolbar-dropdown">
            <button class="toolbar-menu-item">
                表示
            </button>

            <div class="dropdown-menu">
                <button>PC</button>
                <button>タブレット</button>
                <button>スマホ</button>
            </div>
        </div>

        <div class="toolbar-dropdown">
            <button class="toolbar-menu-item">
                モード
            </button>

            <div class="dropdown-menu">
                <button id="edit-mode-button">編集モード</button>
                <button id="sort-mode-button">並び替えモード</button>
            </div>
        </div>

        <div class="toolbar-dropdown">
            <button class="toolbar-menu-item">
                設定
            </button>

            <div class="dropdown-menu">
                <button>サイト設定</button>
                <button>テーマ設定</button>
                <button>グリッド表示</button>
                <button>スナップON/OFF</button>
                <button>ショートカット一覧</button>
            </div>
        </div>
        
    </div>

</div>