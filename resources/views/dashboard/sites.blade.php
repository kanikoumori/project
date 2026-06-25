<x-app-layout>

    <div class="flex min-h-[calc(100vh-64px)]">

        @include('dashboard.sidebar')

        <main class="flex-1 p-8">

            <div class="max-w-7xl mx-auto">

                {{-- タイトル --}}
                <div class="flex justify-between items-center mb-8">

                    <h1 class="text-3xl font-bold">
                        サイト管理
                    </h1>

                    <button
                        onclick="openModal()"
                        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        + 新規サイト作成
                    </button>

                </div>

                {{-- サイト一覧 --}}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    @forelse ($sites as $site)

                        <div
                            class="relative bg-white rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition-all duration-200 group p-4">

                            <a
                                href="{{ route('pages.manage', $site) }}"
                                class="inline-block p-1 rounded-sm">

                                <div class="space-y-3">

                                    <div>
                                        <p class="text-sm text-gray-500">
                                            サイト名
                                        </p>

                                        <h2 class="text-xl font-bold">
                                            {{ $site->title }}
                                        </h2>
                                    </div>

                                    <div>
                                        <p class="text-sm text-gray-500">
                                            サイト説明
                                        </p>

                                        <p class="text-gray-700">
                                            {{ $site->description }}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-sm text-gray-500">
                                            URL (slug)
                                        </p>

                                        <p class="text-gray-700">
                                            {{ $site->slug }}
                                        </p>
                                    </div>

                                    <p class="text-sm text-gray-400">
                                        更新日：{{ $site->updated_at }}
                                    </p>

                                </div>

                            </a>

                            <div
                                class="absolute top-2 right-2 z-20 flex gap-2
                                    opacity-0 group-hover:opacity-100
                                    transition pointer-events-auto">

                                <button
                                    type="button"
                                    onclick="openEditModal(this)"
                                    data-id="{{ $site->id }}"
                                    data-title="{{ $site->title }}"
                                    data-description="{{ $site->description }}"
                                    data-slug="{{ $site->slug }}"
                                    class="text-gray-500 hover:text-green-600 text-xl">
                                    ⚙
                                </button>

                                <button
                                    type="button"
                                    onclick="openDeleteModal({{ $site->id }})"
                                    class="text-gray-500 hover:text-red-600 text-xl">
                                    ✕
                                </button>

                            </div>

                        </div>

                    @empty

                        <div class="col-span-full text-center text-gray-500">
                            サイトがありません
                        </div>

                    @endforelse

                </div>

            </div>

        </main>

    </div>

<!-- 新規サイト作成モーダル -->
<div
    id="siteModal"
    onclick="closeModal()"
    class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div 
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-2xl font-bold mb-4">
            新規サイト作成
        </h2>

        <form
            id="siteForm"
            method="POST"
            action="{{ route('sites.store') }}">   

            @csrf
            <div class="mb-4">
                <label class="block mb-1">
                    サイト名
                </label>

                <input
                    id="title"
                    type="text"
                    name="title"
                    class="w-full p-2"
                    placeholder="My Site"
                    required>

            </div>

            <div class="mb-4">
                <label class="block mb-1">
                    サイト説明
                </label>

                <textarea
                    id="description"
                    name="description"
                    class="w-full p-2"
                    rows="3"></textarea>
            </div>

            <div class="mb-4">
                <label class="block mb-1">
                    slug(URL識別子)
                </label>

                <input
                    id="slug"
                    type="text"
                    name="slug"
                    class="w-full p-2"
                    placeholder="my-site"
                    required>

                <div
                    id="errorMessage"
                    class="hidden text-red-600 text-sm mt-2">
                </div>
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
<!-- Site編集モーダル -->
<div
    id="editSiteModal"
    onclick="closeEditModal()"
    class="hidden fixed inset-0 bg-black/50 items-center justify-center z-50">

    <div
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-2xl font-bold mb-4">
            サイト編集
        </h2>

        <form id="editSiteForm">

            <input
                type="hidden"
                id="editSiteId">

            <div class="mb-4">
                <label class="block mb-1">
                    サイト名
                </label>

                <input
                    id="editTitle"
                    type="text"
                    class="w-full border rounded p-2"
                    required>
            </div>

            <div class="mb-4">
                <label class="block mb-1">
                    サイト説明
                </label>

                <textarea
                    id="editDescription"
                    class="w-full border rounded p-2"
                    rows="3">
                </textarea>
            </div>

            <div class="mb-4">
                <label class="block mb-1">
                    slug (URL識別子)
                </label>

                <input
                    id="editSlug"
                    type="text"
                    class="w-full border rounded p-2"
                    required>

                <div
                    id="editErrorMessage"
                    class="hidden text-red-600 text-sm mt-2">
                </div>
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
                    class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    更新
                </button>

            </div>

        </form>

    </div>

</div>
<!-- 削除確認モーダル -->
<div
    id="deleteModal"
    onclick="closeDeleteModal()"
    class="hidden fixed inset-0 bg-black/50 items-center justify-center z-50">

    <div
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-xl font-bold mb-4 text-red-600">
            サイトを削除しますか？
        </h2>

        <p class="text-gray-600 mb-6">
            この操作は取り消せません。
        </p>

        <input type="hidden" id="deleteSiteId">

        <div class="flex justify-end gap-2">

            <button
                type="button"
                onclick="closeDeleteModal()"
                class="bg-gray-300 px-4 py-2 rounded">
                キャンセル
            </button>

            <button
                type="button"
                onclick="deleteSite()"
                class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                削除する
            </button>

        </div>

    </div>
</div>
{{-- TODO: JS肥大化時は resources/js/dashboard へ移動 --}}
<script>
    // 新規作成モーダルを開く
    function openModal() {
        const modal = document.getElementById('siteModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }


    // 新規作成モーダルを閉じる
    function closeModal() {

        const modal = document.getElementById('siteModal');
        const form = document.getElementById('siteForm');
        const errorMessage = document.getElementById('errorMessage');

        modal.classList.add('hidden');
        modal.classList.remove('flex');

        // 入力内容を消す
        form.reset();

        // エラーも消す
        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
    }

    // 編集モーダルを開く
    function openEditModal(button) {

        document.getElementById('editSiteId').value =
            button.dataset.id;

        document.getElementById('editTitle').value =
            button.dataset.title;

        document.getElementById('editDescription').value =
            button.dataset.description;

        document.getElementById('editSlug').value =
            button.dataset.slug;

        const modal = document.getElementById('editSiteModal');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }


    // 編集モーダルを閉じる
    function closeEditModal() {

        const modal = document.getElementById('editSiteModal');
        const form = document.getElementById('editSiteForm');
        const errorMessage =
            document.getElementById('editErrorMessage');

        modal.classList.add('hidden');
        modal.classList.remove('flex');

        form.reset();

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
    }


    // 削除確認モーダルを開く
    function openDeleteModal(id) {
        document.getElementById('deleteSiteId').value = id;
        document.getElementById('deleteModal').classList.remove('hidden');
        document.getElementById('deleteModal').classList.add('flex');
    }


    // 削除確認モーダルを閉じる
    function closeDeleteModal() {
        document.getElementById('deleteModal').classList.add('hidden');
        document.getElementById('deleteModal').classList.remove('flex');
    }


    // サイト削除
    async function deleteSite() {
        const id = document.getElementById('deleteSiteId').value;

        try {
            const res = await fetch(`/sites/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('削除失敗');
            }

            location.reload();

        } catch (e) {
            alert('削除に失敗しました');
            console.error(e);
        }
    }

    // サイト更新
    document.getElementById('editSiteForm')
        .addEventListener('submit', async function (e) {

        e.preventDefault();

        const id = document.getElementById('editSiteId').value;

        const data = {
            title: document.getElementById('editTitle').value,
            description: document.getElementById('editDescription').value,
            slug: document.getElementById('editSlug').value,
        };

        try {
            const res = await fetch(`/sites/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {

                const errorData = await res.json();

                if (
                    errorData.errors &&
                    errorData.errors.slug
                ) {

                    const errorMessage =
                        document.getElementById('editErrorMessage');

                    errorMessage.textContent =
                        `✖ ${errorData.errors.slug[0]}`;

                    errorMessage.classList.remove('hidden');
                }

                return;
            }

            closeEditModal();

            location.reload();

        } catch (e) {
            alert('更新に失敗しました');
            console.error(e);
        }
    });

    // 編集モーダルのslug入力でエラーを消す//
    document.getElementById('editSlug')
        .addEventListener('input', function () {

        const errorMessage =
            document.getElementById('editErrorMessage');

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
    });

    // 新規サイト作成のslug入力でエラーを消す//
    document.getElementById('slug')
        .addEventListener('input', function () {

        const errorMessage =
            document.getElementById('errorMessage');

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

    });

    // 新規サイト作成のサイト名入力でエラーを消す
    document.getElementById('title')
        .addEventListener('input', function () {

        const errorMessage =
            document.getElementById('errorMessage');

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';
    });

    document.getElementById('siteForm')
        .addEventListener('submit', async function (e) {

        e.preventDefault();

        const data = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            slug: document.getElementById('slug').value,
        };

        const errorMessage =
            document.getElementById('errorMessage');

        errorMessage.classList.add('hidden');
        errorMessage.textContent = '';

        try {

            const res = await fetch('/sites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {

                const errorData = await res.json();

                if (
                    errorData.errors &&
                    errorData.errors.slug
                ) {

                    errorMessage.textContent =
                        `✖ ${errorData.errors.slug[0]}`;

                    errorMessage.classList.remove('hidden');
                }

                return;
            }

            location.reload();

        } catch (e) {

            console.error(e);

            errorMessage.textContent =
                '✖ サイトの作成に失敗しました';

            errorMessage.classList.remove('hidden');
        }
    });
</script>
</x-app-layout>