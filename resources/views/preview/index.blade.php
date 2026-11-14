
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/preview.js'])
    <title>{{ $page->title }} - プレビュー</title>
</head>
<body>

    <header class="preview-header">
        <h1>{{ $page->title }} - プレビュー</h1>

        <a href="{{ route('editor.show', $page) }}">
            編集画面に戻る
        </a>
    </header>

    <main class="preview-container">
        <div
            id="preview-canvas"
            data-page-id="{{ $page->id }}"
        >
        </div>
    </main>

</body>
</html>
