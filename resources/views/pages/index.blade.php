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
            @forelse($pages ?? [] as $page)

                <div class="bg-white rounded-lg shadow p-6">

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
                            class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">

                            編集

                        </button>

                        {{-- TODO: pages.destroy 接続 --}}
                        <button
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

<!-- 新規ページ作成モーダル -->
<div
    id="pageModal"
    onclick="closeModal()"
    class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div
        onclick="event.stopPropagation()"
        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

        <h2 class="text-2xl font-bold mb-4">
            新規ページ作成
        </h2>

        <form>

            <div class="mb-4">

                <label class="block mb-1">
                    ページ名
                </label>

                <input
                    type="text"
                    class="w-full border rounded p-2"
                    placeholder="TOPページ">

            </div>

            <div class="mb-4">

                <label class="block mb-1">
                    slug
                </label>

                <input
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

    function openModal() {
        document
            .getElementById('pageModal')
            .classList.remove('hidden');
    }

    function closeModal() {
        document
            .getElementById('pageModal')
            .classList.add('hidden');
    }

</script>
</x-app-layout>