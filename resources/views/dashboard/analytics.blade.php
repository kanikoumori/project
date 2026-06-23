<x-app-layout>

    <div class="flex min-h-[calc(100vh-64px)]">

        @include('dashboard.sidebar')

        <main class="flex-1 p-8">

            <div class="max-w-7xl mx-auto">

                {{-- タイトル --}}
                <div class="mb-8">

                    <h1 class="text-3xl font-bold">
                        サイト分析
                    </h1>

                    <p class="text-gray-500 mt-2">
                        サイトのアクセス状況を確認できます
                    </p>

                </div>

                {{-- サマリー --}}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-gray-500 text-sm">
                            総アクセス数
                        </h2>

                        <p class="text-3xl font-bold mt-2">
                            0
                        </p>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-gray-500 text-sm">
                            本日のアクセス
                        </h2>

                        <p class="text-3xl font-bold mt-2">
                            0
                        </p>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-gray-500 text-sm">
                            公開サイト数
                        </h2>

                        <p class="text-3xl font-bold mt-2">
                            0
                        </p>
                    </div>

                </div>

                {{-- グラフエリア --}}
                <div class="bg-white rounded-lg shadow p-6 mb-8">

                    <h2 class="text-xl font-semibold mb-4">
                        アクセス推移
                    </h2>

                    <div
                        class="h-80 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">

                        <p class="text-gray-400">
                            グラフ表示エリア（Phase4実装）
                        </p>

                    </div>

                </div>

                {{-- 人気ページ --}}
                <div class="bg-white rounded-lg shadow p-6">

                    <h2 class="text-xl font-semibold mb-4">
                        人気ページ
                    </h2>

                    <table class="w-full">

                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-2">
                                    ページ名
                                </th>

                                <th class="text-left py-2">
                                    閲覧数
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td class="py-3">
                                    データなし
                                </td>

                                <td>
                                    -
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>

            </div>

        </main>

    </div>

</x-app-layout>