console.log("script読み込みOK");

document.addEventListener('DOMContentLoaded', function () {

    console.log("DOM準備完了");

    // ブラウザの戻る時にフォームを初期化
    window.addEventListener('pageshow', function () {

        const form = document.getElementById('siteForm');

        if (form) {
            form.reset();
            console.log("pageshow: フォームをリセットしました");
        }

    });

    //-----モーダル制御関数を追加-----//
    window.openModal = function () {
        console.log("openModal 発火");

        const modal = document.getElementById('siteModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    window.closeModal = function () {
        console.log("closeModal 発火");

        const modal = document.getElementById('siteModal');
        const form = document.getElementById('siteForm');
        const errorMessage = document.getElementById('errorMessage');

        modal.classList.remove('flex');
        modal.classList.add('hidden');

        form.reset();
        console.log("フォームをリセットしました");

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

        console.log("エラーメッセージをリセットしました");
    };
    const form = document.getElementById('siteForm');

    if (!form) {
        console.error("siteFormが見つかりません");
        return;
    }

    console.log("siteForm取得成功");

    form.addEventListener('submit', async function(event) {

        console.log("submit発火");

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

            console.log(errorData);

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

        console.log("作成されたSite:", site);

        console.log("移動先URL", `/dashboard/sites/${site.id}/pages`);

        window.location.href = `/dashboard/sites/${site.id}/pages`;         
    });

});