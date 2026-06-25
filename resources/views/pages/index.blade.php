<x-app-layout>
    

    <div class="max-w-7xl mx-auto p-8">

        {{-- タイトル --}}
        <div class="flex justify-between items-center mb-8">

            <h1 class="text-3xl font-bold">
                ページ管理
            </h1>   
            
            {{-- TODO: モーダル表示に変更予定 --}}

            <button
                onclick="openPageModal()"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + 新規ページ作成
            </button>

        </div>

        {{-- ページ一覧 --}}
        <div class="space-y-6">

            {{-- TODO: PageController接続後に$pagesを受け取る --}}
            @forelse($pages as $page)

                <div class="bg-white rounded-lg shadow p-6">

                    <div class="flex justify-between items-start">

                        <div class="flex items-center justify-between mb-2">
                            <h2 class="text-xl font-semibold">
                                {{ $page->title }}
                            </h2>

                        </div>
                        <span
                            class="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded">

                            非公開

                        </span>

                    </div>

                    <div class="flex gap-2 mt-4">

                        {{-- TODO: editor.show 接続 --}}
                        <button
                                onclick="openEditModal(@js($page))"
                                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            編集
                        </button>
                        {{-- TODO: pages.destroy 接続 --}}

                            <button
                                onclick="openDeleteModal(@js($page))"
                                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">

                                削除
                            </button>

                    </div>

                </div>

            @empty
                <div class="bg-white rounded-lg shadow p-8 text-center">

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
                <label class="block mb-1">ページ名</label>

                <input
                    id="editPageTitle"
                    name="title"
                    type="text"
                    class="w-full border rounded p-2"
                    placeholder="TOPページ">
                
                <p id="editPageError" class="text-red-600 text-sm mt-1"></p>
            </div>

            <div class="mb-4">
                <label class="block mb-1">slug (URL識別子)</label>

                <input
                    id="editPageSlug"
                    name="slug"
                    type="text"
                    class="w-full border rounded p-2"
                    placeholder="home">

                <p id="editSlugError" class="text-red-600 text-sm mt-1"></p>
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
    onclick="closePageModal()"
    class="hidden fixed inset-0 bg-black/50 items-center justify-center z-50">

    <div
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-2xl font-bold mb-4">
            新規ページ作成
        </h2>

        <form id="createPageForm" method="POST" action="/sites/{{ $site->id }}/pages">
            @csrf

            {{-- TODO: POST /sites/{site}/pages --}}
            {{-- TODO: 作成成功後 /editor/{page} へ遷移 --}}
            {{-- TODO: レスポンスJSONから page.id を取得 --}}

            <div class="mb-4">

                <label class="block mb-1">
                    ページ名
                </label>

                <input
            id="createPageTitle"
            name="title"
            type="text"
            class="w-full border rounded p-2 @error('title') border-red-500 @enderror"
            placeholder="TOPページ">

            <p id="titleError" class="text-red-500 text-sm mt-1"></p>
            </div>
            <div class="mb-4">

                <label class="block mb-1">
                   slug (URL識別子)
                </label>

                <input
            id="createPageSlug"
            name="slug"
            type="text"
            class="w-full border rounded p-2 @error('slug') border-red-500 @enderror"
            placeholder="home">
            
            <p id="slugError" class="text-red-500 text-sm mt-1"></p>    

        @error('slug')
            <div class="text-red-500 text-sm mt-1">
                {{ $message }}
            </div>
        @enderror
            <div class="flex justify-end gap-2">

                <button
                    type="button"
                    onclick="closePageModal()"
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

    function openDeleteModal(page) {

        deleteTarget = page.id;

        document.getElementById('deleteTargetTitle').innerText = page.title;

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

    function openPageModal() {

    const modal = document.getElementById('pageModal');

    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

    function closePageModal() {

        const modal = document.getElementById('pageModal');
        const form = document.getElementById('createPageForm');

    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }

    if (form) {
        form.reset();
    }
    }


    function openEditModal(page) {

        document.getElementById('editPageTitle').value = page.title;
        document.getElementById('editPageSlug').value = page.slug;

        const modal = document.getElementById('editModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    function closeEditModal() {

        const modal = document.getElementById('editModal');

        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
    
    // ① 送信処理
    document
    .getElementById('createPageForm')
    document.addEventListener('DOMContentLoaded', function () {

        const form = document.getElementById('createPageForm');

        if (!form) {
            console.error('createPageFormが見つかりません');
            return;
        }

        form.addEventListener('submit', async function (e) {

            e.preventDefault();

            const title = document.getElementById('createPageTitle').value.trim();
            const slug = document.getElementById('createPageSlug').value.trim();

            document.getElementById('titleError').innerText = '';
            document.getElementById('slugError').innerText = '';

            let hasError = false;

            if (!title) {
                showBubble('titleErrorBubble');
                hasError = true;
            } else {
                hideBubble('titleErrorBubble');
            }

            if (!slug) {
                showBubble('slugErrorBubble');
                hasError = true;
            } else {
                hideBubble('slugErrorBubble');
            }

            if (hasError) return;

            const siteId = @js($site->id);

            const response = await fetch(`/sites/${siteId}/pages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ title, slug })
            });

            const page = await response.json();

            if (!page.id) {
                document.getElementById('slugError').innerText =
                    'ページIDの取得に失敗しました';
                return;
            }

            const editorBase = @js(url('/editor'));
            window.location.href = `${editorBase}/${page.id}`;
        });

});

    document.getElementById('pageSlug')
        .addEventListener('input', function () {
        });

</script>
</x-app-layout>