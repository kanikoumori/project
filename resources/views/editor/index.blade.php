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

                @include('editor.sidebar')

                @include('editor.canvas')

                @include('editor.property')

            </div>

        </div>

    </div>

</body>
</html>