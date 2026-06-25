<x-app-layout>

    <div class="max-w-7xl mx-auto p-8">

        {{-- タイトル --}}
        <div class="flex justify-between items-center mb-8">

            <h1 class="text-3xl font-bold">
                ページ管理
            </h1>   
            
            {{-- TODO: モーダル表示に変更予定 --}}

            <button     
                onclick="openModal()"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + 新規ページ作成
            </button>

        </div>

        {{-- ページ一覧 --}}
        <div class="space-y-6">

            {{-- TODO: PageController接続後に$pagesを受け取る --}}
            @forelse($pages as $page)

                <div
                    class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
                    onclick="location.href='{{ route('editor.show', $page->id) }}'">

                    <div class="flex justify-between items-start">

                        <div>

                            <h2 class="text-xl font-semibold mb-2">
                                {{ $page->title }}
                            </h2>

                            <p class="text-gray-500 mb-2">
                                slug : {{ $page->slug }}
                            </p>

                            <p class="text-sm text-gray-400">
                                更新日 : {{ $page->updated_at }}
                            </p>

                        </div>

                        <span
                            class="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded">

                            Draft

                        </span>

                    </div>

                    <div class="flex gap-2 mt-4">

                        {{-- TODO: editor.show 接続 --}}
                        <button
                            onclick="event.stopPropagation(); openEditModal(
                                @js($page->title ?? ''),
                                @js($page->slug ?? '')
                            )"
                            class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">

                            編集

                        </button>

                        {{-- TODO: pages.destroy 接続 --}}
                        <button
                            onclick="event.stopPropagation(); openDeleteModal(
                                @js($page->title ?? '未設定'),
                                @js($page->id)
                            )"
                            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">

                            削除

                        </button>

                    </div>

                </div>

            @empty

            <div class="bg-white rounded-lg shadow p-6 text-center">
                <p class="text-gray-500 text-lg">
                    作成されたページはありません
                </p>

                <p class="text-sm text-gray-400 mt-2">
                    「新規ページ作成」から最初のページを作成してください
                </p>
            </div>

            @endforelse

        </div>

    </div>

<!-- 新規ページ作成モーダル -->

<!-- 編集モーダル -->
<div
    id="editModal"
    onclick="closeEditModal()"
    class="hidden fixed inset-0 bg-black/50 items-center justify-center z-50">

    <div
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-2xl font-bold mb-4">
            ページ編集
        </h2>

        <form>

            {{-- TODO: pages.update 接続 --}}

            <div class="mb-4">

                <label class="block mb-1">
                    ページ名
                </label>

                <input
                    id="editTitle"
                    type="text"
                    class="w-full border rounded p-2">

            </div>

            <div class="mb-4">

                <label class="block mb-1">
                    slug
                </label>

                <input
                    id="editSlug"
                    type="text"
                    class="w-full border rounded p-2">

            </div>

            <div class="flex justify-end gap-2">

                <button
                    type="button"
                    onclick="closeEditModal()"
                    class="bg-gray-300 px-4 py-2 rounded">

                    キャンセル

                </button>

                <button
                    type="submit"
                    class="bg-indigo-600 text-white px-4 py-2 rounded">

                    保存

                </button>

            </div>

        </form>

    </div>

</div>
<!-- 削除モーダル -->
<div
    id="deleteModal"
    onclick="closeDeleteModal()"
    class="hidden fixed inset-0 bg-black/50 items-center justify-center z-50">

    <div
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-xl font-bold text-red-600 mb-3">
            ページ削除
        </h2>

        <p class="text-gray-600 mb-4">
            このページを削除してもよろしいですか？
        </p>

        <p class="text-sm text-gray-400 mb-6">
            対象: <span id="deleteTargetTitle"></span>
        </p>

        <div class="flex justify-end gap-2">

            <button
                type="button"
                onclick="closeDeleteModal()"
                class="bg-gray-300 px-4 py-2 rounded">

                キャンセル
            </button>

            <button
                type="button"
                onclick="confirmDelete()"
                class="bg-red-600 text-white px-4 py-2 rounded">

                削除
            </button>

        </div>

    </div>
</div>
<div
    id="pageModal"
    onclick="closeModal()"
    class="hidden fixed inset-0 bg-black/50 items-center justify-center z-50">

    <div
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-2xl font-bold mb-4">
            新規ページ作成
        </h2>

        <form id="createPageForm">

            {{-- TODO: POST /sites/{site}/pages --}}
            {{-- TODO: 作成成功後 /editor/{page} へ遷移 --}}
            {{-- TODO: レスポンスJSONから page.id を取得 --}}

            <div class="mb-4">

                <label class="block mb-1">
                    ページ名
                </label>

                <input
                    id="pageTitle"
                    name="title"
                    type="text"
                    class="w-full border rounded p-2"
                    placeholder="TOPページ">

            </div>

            <div class="mb-4">

                <label class="block mb-1">
                    slug
                </label>

                <input
                    id="pageSlug"
                    name="slug"
                    type="text"
                    class="w-full border rounded p-2"
                    placeholder="home">

            </div>

            <div class="flex justify-end gap-2">

                <button
                    type="button"
                    onclick="closeModal()"
                    class="bg-gray-300 px-4 py-2 rounded">

                    キャンセル

                </button>

                <button
                    type="submit"
                    class="bg-blue-600 text-white px-4 py-2 rounded">

                    作成

                </button>

            </div>

        </form>

    </div>

</div>  
{{-- TODO: JS肥大化時は resources/js/pages へ移動 --}}
<script>

    let deleteTarget = null;

    function openDeleteModal(title, id) {

        deleteTarget = id;

        document.getElementById('deleteTargetTitle').innerText = title;

        const modal = document.getElementById('deleteModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeDeleteModal() {

        const modal = document.getElementById('deleteModal');

        modal.classList.remove('flex');
        modal.classList.add('hidden');

        deleteTarget = null;
    }

    function confirmDelete() {

        if (!deleteTarget) return;

        // TODO: Laravel削除処理

        closeDeleteModal();
    }

    function openModal() {

        const modal = document.getElementById('pageModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeModal() {

        const modal = document.getElementById('pageModal');

        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }

    function openEditModal(title, slug) {

        document.getElementById('editTitle').value = title;
        document.getElementById('editSlug').value = slug;

        const modal = document.getElementById('editModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeEditModal() {

        const modal = document.getElementById('editModal');

        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }

    document
    .getElementById('createPageForm')
    .addEventListener('submit', async function (e) {

        e.preventDefault();

        const title =
            document.getElementById('pageTitle').value.trim();

        const slug =
            document.getElementById('pageSlug').value.trim();

        // ここに追加
        if (!title || !slug) {
            alert('ページ名とslugを入力してください');
            return;
        }

        const siteId = @js($site->id);

        try {

            const response = await fetch(
                `/sites/${siteId}/pages`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN':
                            document.querySelector(
                                'meta[name="csrf-token"]'
                            ).content
                    },
                    body: JSON.stringify({
                        title,
                        slug
                    })
                }
            );

            if (!response.ok) {

                let message = '通信に失敗しました';

                try {
                    const errorData = await response.json();

                    message = errorData.errors
                        ? Object.values(errorData.errors)
                            .flat()
                            .join('\n')
                        : errorData.message ?? message;

                } catch {
                    // JSONでないレスポンスの場合
                }

                throw new Error(message);
            }

            const page = await response.json();

            if (!page.id) {
                throw new Error('ページIDの取得に失敗しました');
            }

            const editorBase = @js(url('/editor'));

            window.location.href = `${editorBase}/${page.id}`;

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

</script>
</x-app-layout>