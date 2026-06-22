
document.addEventListener('DOMContentLoaded', function () {


    // ブラウザの戻る時にフォームを初期化
    window.addEventListener('pageshow', function () {

        const form = document.getElementById('siteForm');

        if (form) {
            form.reset();
            
        }

    });

    //-----モーダル制御関数を追加-----//
    window.openModal = function () {

        const modal = document.getElementById('siteModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    window.closeModal = function () {

        const modal = document.getElementById('siteModal');
        const form = document.getElementById('siteForm');
        const errorMessage = document.getElementById('errorMessage');

        modal.classList.remove('flex');
        modal.classList.add('hidden');

        form.reset();

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

    };
    const form = document.getElementById('siteForm');

    if (!form) {
        return;
    }
    const slugInput = document.getElementById('slug');
    const errorMessage = document.getElementById('errorMessage');

    if (slugInput && errorMessage) {
        slugInput.addEventListener('input', function () {
            errorMessage.classList.add('hidden');
            errorMessage.textContent = '';
        });
    }


    form.addEventListener('submit', async function(event) {


        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const slug = document.getElementById('slug').value;

        const response = await fetch('/sites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN':
                    document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                slug
            })
        });

        if (!response.ok) {

            const errorData = await response.json();


            let message = 'サイトの作成に失敗しました';

            if (errorData.errors) {
                message = Object.values(errorData.errors)
                    .flat()
                    .join('\n');
            }

            const errorMessage = document.getElementById('errorMessage');

            errorMessage.textContent = `✖ ${message}`;
            errorMessage.classList.remove('hidden');

            return;
        }

        const site = await response.json();

        window.location.href = `/dashboard/sites/${site.id}/pages`;         
    });

});