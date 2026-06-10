<x-app-layout>

    <div class="flex h-[calc(100vh-64px)]">

        {{-- サイドメニュー --}}
        <div class="w-64 bg-white border-r">

            <ul class="p-4 space-y-3">

                <li>
                    <a href="{{ route('dashboard.sites') }}">
                        作成
                    </a>
                </li>

                <li>
                    <a href="#">
                        プレビュー
                    </a>
                </li>

                <li>
                    <a href="{{ route('dashboard.analytics') }}">
                        サイト分析
                    </a>
                </li>

                <li>
                    <a href="{{ route('dashboard.settings') }}">
                        設定
                    </a>
                </li>

            </ul>

        </div>

        {{-- メイン画面 --}}
        <main class="flex-1 p-8 overflow-y-auto">

            <h1 class="text-3xl font-bold mb-6">
                サイトを作成する
            </h1>

            <div class="mb-10">
                {{-- TODO: モーダル表示に変更予定 --}}
                <a href="#"
                    class="block max-w-md p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">   
                    
                    <h2 class="text-2xl font-bold mb-2">
                        ＋ 新規サイト作成
                    </h2>
                    <div class="mt-4 text-sm opacity-80">
                        現在作成中のサイト：0件
                    </div>
                    

                    <p>
                        新しいWebサイトを作成します
                    </p>

                </a>

            </div>
             {{-- 最近編集したサイト --}}
                <div class="mt-12">

                    <h2 class="text-xl font-semibold mb-4">
                        最近編集したサイト
                    </h2>

                    <div class="space-y-4">

                        @forelse ($sites ?? [] as $site)

                            <div class="bg-white border rounded-lg shadow p-5 hover:shadow-lg transition">

                                <div class="flex justify-between items-center">

                                    <div>
                                        <h3 class="text-lg font-bold">
                                            {{ $site->title }}
                                        </h3>

                                        <p class="text-sm text-gray-500">
                                            最終更新：
                                            {{ $site->updated_at }}
                                        </p>
                                    </div>

                                    <span class="px-3 py-1 text-sm rounded">
                                        {{ $site->status }}
                                    </span>

                                </div>

                            </div>

                        @empty

                            <div class="bg-white border rounded-lg p-6 text-gray-500">
                                サイトがまだ作成されていません
                            </div>

                        @endforelse

                    </div>

                </div>
            <div class="mt-10">

                <h2 class="text-xl font-semibold mb-4">
                    テンプレート一覧
                </h2>
               
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">

                    <div class="border rounded-lg p-4 shadow bg-white">
                        <img
                            src="https://placehold.co/300x180"
                            alt="Blog Template"
                            class="rounded mb-3 w-full">

                        <h3 class="font-bold">
                            Blog
                        </h3>

                        <p class="text-sm text-gray-600">
                            ブログ向けテンプレート
                        </p>
                    </div>

                    <div class="border rounded-lg p-4 shadow bg-white">
                        <img
                            src="https://placehold.co/300x180"
                            alt="Landing Template"
                            class="rounded mb-3 w-full">

                        <h3 class="font-bold">
                            Landing
                        </h3>

                        <p class="text-sm text-gray-600">
                            商品紹介向け
                        </p>
                    </div>

                    <div class="border rounded-lg p-4 shadow bg-white">
                        <img
                            src="https://placehold.co/300x180"
                            alt="Portfolio Template"
                            class="rounded mb-3 w-full">

                        <h3 class="font-bold">
                            Portfolio
                        </h3>

                        <p class="text-sm text-gray-600">
                            作品紹介向け
                        </p>
                    </div>

                    <div class="border rounded-lg p-4 shadow bg-white">
                        <img
                            src="https://placehold.co/300x180"
                            alt="Default Template"
                            class="rounded mb-3 w-full">

                        <h3 class="font-bold">
                            Default
                        </h3>

                        <p class="text-sm text-gray-600">
                            標準テンプレート
                        </p>
                    </div>

                </div>
            </div>

        </main>

    </div>

</x-app-layout>