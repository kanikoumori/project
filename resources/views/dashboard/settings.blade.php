<x-app-layout>

    <div class="flex min-h-[calc(100vh-64px)]">

        @include('dashboard.sidebar')

        <main class="flex-1 p-8">

            <div class="max-w-5xl mx-auto">

                <h1 class="text-3xl font-bold mb-8">
                    設定
                </h1>

                {{-- サイト設定 --}}
                <div class="bg-white rounded-lg shadow p-6 mb-8">

                    <h2 class="text-xl font-semibold mb-4">
                        サイト設定
                    </h2>

                    <div class="space-y-4">

                        <div>
                            <label class="block mb-1 font-medium">
                                サイト名
                            </label>

                            <input
                                type="text"
                                value="My Site"
                                class="w-full border rounded p-2">
                        </div>

                        <div>
                            <label class="block mb-1 font-medium">
                                サイト説明
                            </label>

                            <textarea
                                rows="4"
                                class="w-full border rounded p-2">サイト説明</textarea>
                        </div>

                    </div>

                </div>

                {{-- テーマ設定 --}}
                <div class="bg-white rounded-lg shadow p-6 mb-8">

                    <h2 class="text-xl font-semibold mb-4">
                        テーマ設定
                    </h2>

                    <select class="w-full border rounded p-2">
                        <option>Default</option>
                        <option>Blog</option>
                        <option>Business</option>
                        <option>Portfolio</option>
                    </select>

                </div>

                {{-- 公開設定 --}}
                <div class="bg-white rounded-lg shadow p-6 mb-8">

                    <h2 class="text-xl font-semibold mb-4">
                        公開設定
                    </h2>

                    <div class="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked>

                        <span>
                            サイトを公開する
                        </span>

                    </div>

                </div>

                {{-- 保存ボタン --}}
                <div class="flex justify-end">

                    <button
                        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        設定を保存
                    </button>

                </div>

            </div>

        </main>

    </div>

</x-app-layout>