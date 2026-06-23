<x-app-layout>
    <div class="min-h-[calc(100vh-64px)] bg-gray-50">
        <div class="flex">

            {{-- サイドバー --}}
            @include('dashboard.sidebar')

            {{-- メインコンテンツ --}}
            <main class="flex-1 p-8">
                <div class="max-w-5xl mx-auto">

                    <div class="mb-8">
                        <h1 class="text-2xl font-bold text-gray-900">
                            作成例・デモサイト
                        </h1>

                        <p class="mt-2 text-sm text-gray-500">
                            サイト作成の参考になるデモサイトや作成例を確認できます。
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <div class="h-32 rounded-xl bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 mb-4"></div>

                            <h2 class="font-semibold text-gray-900">
                                カフェサイト例
                            </h2>

                            <p class="mt-2 text-sm text-gray-500">
                                店舗紹介・メニュー・アクセスを含むサンプルサイトです。
                            </p>
                        </div>

                        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <div class="h-32 rounded-xl bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 mb-4"></div>

                            <h2 class="font-semibold text-gray-900">
                                ポートフォリオ例
                            </h2>

                            <p class="mt-2 text-sm text-gray-500">
                                自己紹介や制作実績を掲載するサンプルサイトです。
                            </p>
                        </div>

                        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                            <div class="h-32 rounded-xl bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 mb-4"></div>

                            <h2 class="font-semibold text-gray-900">
                                サービス紹介サイト例
                            </h2>

                            <p class="mt-2 text-sm text-gray-500">
                                サービス内容や特徴を紹介するサンプルサイトです。
                            </p>
                        </div>

                    </div>

                </div>
            </main>

        </div>
    </div>
</x-app-layout>