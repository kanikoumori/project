<x-app-layout>

    <div class="max-w-7xl mx-auto p-8">

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

            {{-- サイトカード1 --}}
            <div class="bg-white rounded-lg shadow p-6">

                <h2 class="text-xl font-semibold mb-2">
                    ポートフォリオサイト
                </h2>

                <p class="text-gray-500 mb-2">
                    draft
                </p>

                <p class="text-sm text-gray-400 mb-4">
                    更新日: 2026/06/10
                </p>

                <div class="flex gap-2">

                    <button
                        class="bg-green-500 text-white px-3 py-1 rounded">
                        編集
                    </button>

                    <button
                        class="bg-red-500 text-white px-3 py-1 rounded">
                        削除
                    </button>

                </div>

            </div>

            {{-- サイトカード2 --}}
            <div class="bg-white rounded-lg shadow p-6">

                <h2 class="text-xl font-semibold mb-2">
                    ブログサイト
                </h2>

                <p class="text-gray-500 mb-2">
                    draft
                </p>

                <p class="text-sm text-gray-400 mb-4">
                    更新日: 2026/06/08
                </p>

                <div class="flex gap-2">

                    <button
                        class="bg-green-500 text-white px-3 py-1 rounded">
                        編集
                    </button>

                    <button
                        class="bg-red-500 text-white px-3 py-1 rounded">
                        削除
                    </button>

                </div>

            </div>

        </div>

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

        @if ($errors->any())
            <div class="bg-red-100 text-red-700 p-3 rounded mb-4">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form
            method="POST"
            action="{{ route('sites.store') }}">   

            @csrf
            <div class="mb-4">
                <label class="block mb-1">
                    サイト名
                </label>

                <input
                    type="text"
                    name="title"
                    class="w-full border rounded p-2"
                    placeholder="My Site"
                    required>
            </div>

            <div class="mb-4">
                <label class="block mb-1">
                    サイト説明
                </label>

                <textarea
                    name="description"
                    class="w-full border rounded p-2"
                    rows="3"></textarea>
            </div>

            <div class="mb-4">
                <label class="block mb-1">
                    slug
                </label>

                <input
                    type="text"
                    name="slug"
                    class="w-full border rounded p-2"
                    placeholder="my-site"
                    required>
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
<script>
    function openModal() {
        document
            .getElementById('siteModal')
            .classList.remove('hidden');
    }

    function closeModal() {
        document
            .getElementById('siteModal')
            .classList.add('hidden');
    }
</script>
</x-app-layout>