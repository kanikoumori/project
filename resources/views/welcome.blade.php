<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebCreate</title>

    {{-- CSS --}}
    @vite(['resources/css/style_main.css'])
</head>
<body>
    <header>
        <a href="#">
            <p>アイコンとか</p>
        </a>

        <a href="#">
            <p>ログイン情報ボタン</p>
        </a>
    </header>

    <div id="main">

        {{-- サイドメニュー --}}
        <div id="main_tab">
            <ul>
                <li>
                    <a href="#">
                        <p>作成</p>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <p>プレビュー</p>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <p>サイト分析</p>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <p class="last">設定</p>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <p class="last">プライバシーポリシー</p>
                    </a>
                </li>
            </ul>
        </div>

        {{-- メイン画面 --}}
        <div id="main_screen">
            <p>サイトを作成する</p>

            <div class="template-list">

                <img src="https://placehold.co/300x200" alt="template1">

                <img src="https://placehold.co/300x200" alt="template2">

                <img src="https://placehold.co/300x200" alt="template3">

                <img src="https://placehold.co/300x200" alt="template4">

                <img src="https://placehold.co/300x200" alt="template5">

                <img src="https://placehold.co/300x200" alt="template6">

                <p>
                    ・表示している画面にリンクしたメニューの色だけ変える → JavaScript
                </p>

                <p>
                    ・ヘッダー＆左メニューは固定。メイン画面はスクロール
                </p>

            </div>
        </div>

    </div>

    <footer>

    </footer>

</body>
</html>