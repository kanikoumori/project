<x-app-layout>

    <div class="flex min-h-[calc(100vh-64px)]">

        @include('dashboard.sidebar')

        <main class="flex-1 min-w-0 p-8 transition-all duration-300">

            <div class="w-full max-w-none">

                <div class="mb-8">
                    <h1 class="text-3xl font-bold">
                        作成例・デモサイト
                    </h1>

                    <p class="text-gray-500 mt-2">
                        サイト作成の参考になる作成例やデモサイトを確認できます。
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div class="bg-white rounded-xl shadow p-6">
                        <div class="h-36 rounded-lg bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 mb-4"></div>

                        <h2 class="text-xl font-bold">
                            カフェサイト例
                        </h2>

                        <p class="text-gray-500 mt-2">
                            店舗紹介・メニュー・アクセス情報を掲載するサンプルです。
                        </p>
                    </div>

                    <div class="bg-white rounded-xl shadow p-6">
                        <div class="h-36 rounded-lg bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 mb-4"></div>

                        <h2 class="text-xl font-bold">
                            ポートフォリオサイト例
                        </h2>

                        <p class="text-gray-500 mt-2">
                            自己紹介や制作実績を掲載するサンプルです。
                        </p>
                    </div>

                    <div class="bg-white rounded-xl shadow p-6">
                        <div class="h-36 rounded-lg bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 mb-4"></div>

                        <h2 class="text-xl font-bold">
                            サービス紹介サイト例
                        </h2>

                        <p class="text-gray-500 mt-2">
                            サービス内容や特徴を紹介するサンプルです。
                        </p>
                    </div>

                </div>

            </div>

        </main>

    </div>

</x-app-layout>