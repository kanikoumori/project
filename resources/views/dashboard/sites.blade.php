<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            サイト管理
        </h2>
    </x-slot>

    <div class="max-w-7xl mx-auto py-6 px-4">

        <!-- サイト情報 -->
        <div class="bg-white shadow rounded-lg p-6 mb-6">

            <h3 class="text-2xl font-bold mb-2">
                My Site
            </h3>

            <p class="text-gray-600">
                私のポートフォリオサイトです
            </p>

        </div>

        <!-- ページ一覧 -->
        <div class="bg-white shadow rounded-lg p-6">

            <div class="flex justify-between items-center mb-4">

                <h3 class="text-xl font-bold">
                    ページ一覧
                </h3>

                <button
                    class="bg-blue-500 text-white px-4 py-2 rounded">
                    ＋ 新規ページ作成
                </button>

            </div>

            <div class="space-y-3">

                <div class="border rounded p-4 flex justify-between">

                    <span>トップページ</span>

                    <button
                        class="bg-green-500 text-white px-3 py-1 rounded">
                        編集
                    </button>

                </div>

                <div class="border rounded p-4 flex justify-between">

                    <span>お問い合わせ</span>

                    <button
                        class="bg-green-500 text-white px-3 py-1 rounded">
                        編集
                    </button>

                </div>

                <div class="border rounded p-4 flex justify-between">

                    <span>会社概要</span>

                    <button
                        class="bg-green-500 text-white px-3 py-1 rounded">
                        編集
                    </button>

                </div>

            </div>

        </div>

    </div>

</x-app-layout>