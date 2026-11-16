
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">

    <meta name="csrf-token"
          content="{{ csrf_token() }}">

    @vite([
        'resources/css/app.css',
        'resources/js/app.js'
    ])
</head>

<body>
    <div id="editor-app">
        <div class="editor">

            @include('editor.toolbar')

            <div class="editor-body">

                {{-- 左サイドバー --}}
                <div id="editor-left-sidebar" class="editor-sidebar-panel">

                    <div class="editor-sidebar-header">
                        <span class="editor-sidebar-title">
                            要素・レイヤー
                        </span>

                        <button
                            type="button"
                            id="toggle-left-sidebar"
                            class="sidebar-toggle"
                            aria-label="左サイドバーを折りたたむ"
                            aria-expanded="true"
                            aria-controls="editor-left-sidebar"
                        >
                            ‹
                        </button>
                    </div>

                    <div class="editor-sidebar-content">
                        @include('editor.sidebar')
                    </div>

                </div>

                {{-- 中央の編集画面 --}}
                @include('editor.canvas')


                {{-- 右サイドバー --}}
                <div id="editor-right-sidebar" class="editor-property-panel">

                    <div class="editor-sidebar-header">
                        <button
                            type="button"
                            id="toggle-right-sidebar"
                            class="sidebar-toggle"
                            aria-label="右サイドバーを折りたたむ"
                            aria-expanded="true"
                            aria-controls="editor-right-sidebar"
                        >
                            ›
                        </button>

                        <span class="editor-sidebar-title">
                            プロパティ
                        </span>
                    </div>

                    <div class="editor-sidebar-content">
                        @include('editor.property')
                    </div>


                </div>

            </div> {{-- editor-body --}}

        </div> {{-- editor --}}

    </div> {{-- editor-app --}}

</body>
</html>