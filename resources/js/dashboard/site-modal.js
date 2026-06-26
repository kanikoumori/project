
document.addEventListener('DOMContentLoaded', function () {


    // ブラウザの戻る時にフォームを初期化
    window.addEventListener('pageshow', function () {

        const form = document.getElementById('siteForm');

        if (form) {
            form.reset();
        }

    });
    // 新規サイト作成モーダルを開く
    window.openSiteModal = function () {

        const modal = document.getElementById('siteModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };


    // 新規サイト作成モーダルを閉じる
    window.closeSiteModal = function () {

        const modal = document.getElementById('siteModal');
        const form = document.getElementById('siteForm');
        const errorMessage = document.getElementById('errorMessage');

        modal.classList.remove('flex');
        modal.classList.add('hidden');

        // 入力内容をリセット
        form.reset();

        // エラーメッセージを削除
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
    };

    // 編集モーダルを開く
    window.openSiteEditModal = function (button) {

        const modal = document.getElementById('editSiteModal');

        document.getElementById('editSiteId').value =
            button.dataset.id;

        document.getElementById('editTitle').value =
            button.dataset.title;

        document.getElementById('editDescription').value =
            button.dataset.description;

        document.getElementById('editSlug').value =
            button.dataset.slug;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };


    // 編集モーダルを閉じる
    window.closeSiteEditModal = function () {

        const modal = document.getElementById('editSiteModal');
        const form = document.getElementById('editSiteForm');
        const errorMessage =
            document.getElementById('editErrorMessage');

        modal.classList.remove('flex');
        modal.classList.add('hidden');

        form.reset();

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
    };


    // =====================
    // 削除モーダル関連
    // =====================

    // 削除確認モーダルを開く
    window.openSiteDeleteModal = function(id) {

        document.getElementById('deleteSiteId').value = id;

        const modal =
            document.getElementById('deleteModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };


    // 削除確認モーダルを閉じる
    window.closeSiteDeleteModal = function() {

        const modal =
            document.getElementById('deleteModal');

        modal.classList.remove('flex');
        modal.classList.add('hidden');
    };


    // サイト削除
    window.deleteSite = async function() {

        const id =
            document.getElementById('deleteSiteId').value;

        try {

            const response = await fetch(`/sites/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN':
                        document.querySelector(
                            'meta[name="csrf-token"]'
                        ).content,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('削除失敗');
            }

            location.reload();

        } catch (e) {

            alert('削除に失敗しました');
            console.error(e);
        }
    };
    const form = document.getElementById('siteForm');

    if (form) {
        
    
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
    
    }


    // ここから編集更新処理を追加

    const editForm = document.getElementById('editSiteForm');

    if (editForm) {

        editForm.addEventListener('submit', async function(event) {

            event.preventDefault();

            const id = document.getElementById('editSiteId').value;
            const title = document.getElementById('editTitle').value;
            const description = document.getElementById('editDescription').value;
            const slug = document.getElementById('editSlug').value;

            const response = await fetch(`/sites/${id}`, {
                method: 'PUT',
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

            const errorMessage =
                document.getElementById('editErrorMessage');

            if (!response.ok) {

                const errorData = await response.json();

                if (errorData.errors &&
                    errorData.errors.slug) {

                    errorMessage.textContent =
                        `✖ ${errorData.errors.slug[0]}`;

                    errorMessage.classList.remove('hidden');
                }

                return;
            }

            // 更新成功時
            location.reload();

        });

    }


});