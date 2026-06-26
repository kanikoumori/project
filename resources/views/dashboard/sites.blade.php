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
                        onclick="openSiteModal()"
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
                                    onclick="openSiteEditModal(this)"
                                    data-id="{{ $site->id }}"
                                    data-title="{{ $site->title }}"
                                    data-description="{{ $site->description }}"
                                    data-slug="{{ $site->slug }}"
                                    class="text-gray-500 hover:text-green-600 text-xl">
                                    ⚙
                                </button>

                                <button
                                    type="button"
                                    onclick="openSiteDeleteModal({{ $site->id }})"
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
    onclick="closeSiteModal()"
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
                    onclick="closeSiteModal()"
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
    onclick="closeSiteEditModal()"
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
                    onclick="closeSiteEditModal()"
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
    onclick="closeSiteDeleteModal()"
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
                onclick="closeSiteDeleteModal()"
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
</x-app-layout>