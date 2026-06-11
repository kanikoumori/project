<x-app-layout>

    <div class="max-w-7xl mx-auto p-8">

        {{-- タイトル --}}
        <div class="flex justify-between items-center mb-8">

            <h1 class="text-3xl font-bold">
                ページ管理
            </h1>   
            
            {{-- TODO: モーダル表示に変更予定 --}}
            <button
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + 新規ページ作成
            </button>

        </div>

        {{-- ページ一覧 --}}
        <div class="space-y-6">

            {{-- Page Card 1 --}}
            <div class="bg-white rounded-lg shadow p-6">

                <h2 class="text-xl font-semibold mb-2">
                    HOME
                </h2>

                <p class="text-gray-500 mb-2">
                    slug : /
                </p>

                <p class="text-sm text-gray-400 mb-2">
                    更新日 : 2026/06/11
                </p>

                <span
                    class="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded mb-4">
                    Draft
                </span>

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

            {{-- Page Card 2 --}}
            <div class="bg-white rounded-lg shadow p-6">

                <h2 class="text-xl font-semibold mb-2">
                    会社概要
                </h2>

                <p class="text-gray-500 mb-2">
                    slug : about
                </p>

                <p class="text-sm text-gray-400 mb-2">
                    更新日 : 2026/06/10
                </p>

                <span
                    class="inline-block px-3 py-1 text-sm bg-green-100 text-green-700 rounded mb-4">
                    Published
                </span>

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

</x-app-layout>