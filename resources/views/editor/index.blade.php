@vite(['resources/css/app.css', 'resources/js/app.js'])

<div class="editor">

    @include('editor.toolbar')

    <div class="editor-body">

        @include('editor.sidebar')

        @include('editor.canvas')

        @include('editor.property')

    </div>

</div>