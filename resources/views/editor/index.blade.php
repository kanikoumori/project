<div class="editor">

    @include('editor.toolbar')

    <div class="editor-body">

        @include('editor.sidebar')

        @include('editor.canvas')

        @include('editor.property')

    </div>

</div>

<script>

    function setupBlock(block) {

        block.addEventListener('click', () => {

            document.querySelectorAll('.block')
                .forEach(b => b.classList.remove('ring-2', 'ring-blue-500'));

            block.classList.add('ring-2', 'ring-blue-500');

        });

    }

    // 見出し
    document.getElementById('add-heading').addEventListener('click', () => {

        const block = document.createElement('div');

        block.className = 'block border p-4 rounded mb-4';
        setupBlock(block);

        block.innerHTML = `
            <h1 contenteditable="true">
                見出しを入力
            </h1>
        `;

        document.getElementById('canvas').appendChild(block);

    });

    // テキスト
    document.getElementById('add-text').addEventListener('click', () => {

        const block = document.createElement('div');

        block.className = 'block border p-4 rounded mb-4';
        setupBlock(block);

        block.innerHTML = `
            <p contenteditable="true">
                テキストを入力
            </p>
        `;

        document.getElementById('canvas').appendChild(block);

    });

    // リスト
    document.getElementById('add-list').addEventListener('click', () => {

        const block = document.createElement('div');

        block.className = 'block border p-4 rounded mb-4';
        setupBlock(block);

        block.innerHTML = `
            <ul class="list-disc pl-6">
                <li contenteditable="true">項目1</li>
                <li contenteditable="true">項目2</li>
                <li contenteditable="true">項目3</li>
            </ul>
        `;

        document.getElementById('canvas').appendChild(block);

    });
    
    // ボタン
    document.getElementById('add-button').addEventListener('click', () => {

        const block = document.createElement('div');

        block.className = 'block border p-4 rounded mb-4';
        setupBlock(block);

        block.innerHTML = `
            <button class="px-4 py-2 bg-blue-500 text-white rounded">
                ボタン
            </button>
        `;

        document.getElementById('canvas').appendChild(block);

    });

    // 画像
    document.getElementById('add-image').addEventListener('click', () => {

    const input = document.createElement('input');

        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = (event) => {

            const file = event.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = (e) => {

                const block = document.createElement('div');

                block.className = 'block border p-4 rounded mb-4';
                setupBlock(block);

                block.innerHTML = `
                    <img
                        src="${e.target.result}"
                        class="max-w-full"
                        alt="アップロード画像"
                    >
                `;

                document.getElementById('canvas').appendChild(block);

            };

            reader.readAsDataURL(file);

        };

        input.click();

    });

    // 入力欄
    document.getElementById('add-form').addEventListener('click', () => {

        const block = document.createElement('div');

        block.className = 'block border p-4 rounded mb-4';
        setupBlock(block);

        block.innerHTML = `
            <input
                type="text"
                placeholder="入力してください"
                class="border rounded p-2 w-full"
            >
        `;

        document.getElementById('canvas').appendChild(block);

    });
</script>