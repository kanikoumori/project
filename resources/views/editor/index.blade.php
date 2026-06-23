@vite(['resources/css/app.css', 'resources/js/app.js'])

<div id="editor-app">

    @include('editor.toolbar')

    <div class="editor-body">

        @include('editor.sidebar')

        @include('editor.canvas')

        @include('editor.property')

    </div>

</div>