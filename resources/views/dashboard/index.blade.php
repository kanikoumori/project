<x-app-layout>

    <div class="flex min-h-[calc(100vh-64px)]">

        @include('dashboard.sidebar')

        {{-- メイン画面 --}}
<main class="flex-1 min-w-0 p-8 transition-all duration-300">

            <h1 class="text-3xl font-bold mb-6">
                <p>ホーム</p>
                <p class="text-sm text-gray-500 mt-2">新規サイト作成、サイト公開までのステップ、お知らせ、最近編集したサイト、デモ</p>
            </h1>

            <div class="mb-10">

                <a href="#"
                    class="block w-full p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">   
                    
                    <h2 class="text-2xl font-bold mb-2">
                        ＋ 新規サイト作成
                    </h2>
                    <div class="mt-4 text-sm opacity-80">
                        現在作成中のサイト：
                        {{ $sites->count() }}件
                    </div>
                    

                    <p>
                        新しいWebサイトを作成します
                    </p>

                </a>

            </div>
            {{-- サイト公開までのステップ --}}
            <section class="mb-12 w-full">
                <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

                    <div class="flex items-start justify-between mb-6">

                        <div>
                            <h2 class="text-2xl font-bold text-gray-900">
                                サイト公開までのステップ
                            </h2>

                            <p class="text-sm text-gray-500 mt-2">
                                順番に進めることで、サイト公開までスムーズに準備できます。
                            </p>
                        </div>
                        <div class="w-40">
                            {{-- 進捗バー --}}
                            <div class="relative w-20 h-20 mx-auto shrink-0">
                                <div class="absolute inset-0 rounded-full border-[7px] border-gray-200"></div>

                                <div
                                    class="absolute inset-0 rounded-full border-[7px] border-blue-600 border-l-gray-200 border-b-gray-200 border-r-gray-200 rotate-45">
                                </div>

                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-lg font-bold text-gray-700">
                                        {{ $completedSteps }}/{{ $totalSteps }}
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                        <div class="mt-4 max-w-xs">

                            <label
                                class="block text-sm text-gray-500 mb-2">
                                対象サイト
                            </label>

                            <select
                                id="targetSite"
                                class="w-full border rounded-lg px-3 py-2">
                                @foreach ($sites as $site)
                                    <option
                                        value="{{ route('pages.manage', $site) }}"
                                        title="{{ $site->title }}">

                                        {{ \Illuminate\Support\Str::limit(
                                            $site->title,
                                            20
                                        ) }}

                                    </option>
                                @endforeach

                            </select>

                        </div>
                    <div class="divide-y divide-gray-200">

                        <a href="{{ route('dashboard.sites') }}"
                            class="group flex items-center justify-between py-5">

                            <div>
                                <div class="flex items-center gap-3">
                                    @if ($completedSteps >= 1)
                                        <span class="text-green-600 font-bold">✓</span>
                                    @endif

                                    <h3 class="text-lg font-bold text-gray-900">
                                        サイトを作成
                                    </h3>
                                </div>

                                <p class="text-sm text-gray-500 mt-1">
                                    サイト名やslugを設定して、新しいサイトを作成します。
                                </p>
                            </div>

                            <span class="text-3xl text-gray-800 group-hover:translate-x-1 transition">
                                ›
                            </span>
                        </a>

                        <button
                            type="button"
                            onclick="goToPageManage()"
                            class="group flex items-center justify-between py-5 w-full text-left">

                            <div>
                                <div class="flex items-center gap-3">
                                    @if ($completedSteps >= 2)
                                        <span class="text-green-600 font-bold">✓</span>
                                    @endif

                                    <h3 class="text-lg font-bold text-gray-900">
                                        ページを追加
                                    </h3>
                                </div>

                                <p class="text-sm text-gray-500 mt-1">
                                    ページ名やslugを設定して、新しいページを作成します。
                                </p>
                            </div>

                            <span
                                class="text-3xl text-gray-800
                                    group-hover:translate-x-1 transition">
                                ›
                            </span>

                        </button>

                        <a href="#"
                            class="group flex items-center justify-between py-5">

                            <div>
                                <h3 class="text-lg font-bold text-gray-900">
                                    デザインを編集
                                </h3>
                                <p class="text-sm text-gray-500 mt-1">
                                    エディターで見出し・文章・画像・ボタンなどを配置します。
                                </p>
                            </div>

                            <span class="text-3xl text-gray-800 group-hover:translate-x-1 transition">
                                ›
                            </span>
                        </a>

                        <a href="#"
                            class="group flex items-center justify-between py-5">

                            <div>
                                <h3 class="text-lg font-bold text-gray-900">
                                    公開する
                                </h3>
                                <p class="text-sm text-gray-500 mt-1">
                                    内容を確認し、公開設定やドメイン設定を行います。
                                </p>
                            </div>

                            <span class="text-3xl text-gray-800 group-hover:translate-x-1 transition">
                                ›
                            </span>
                        </a>

                    </div>

                </div>
            {{-- お知らせ --}}
            <section class="mt-12">

                <div class="flex items-center justify-between mb-4">

                    <div>
                        <h2 class="text-xl font-semibold">
                            📢 お知らせ
                        </h2>

                        <p class="text-sm text-gray-500 mt-1">
                            アップデート情報やメンテナンス情報をお届けします。
                        </p>
                    </div>

                    <a
                        href="#"
                        class="text-sm text-blue-600 hover:text-blue-700">

                        すべて見る

                    </a>

                </div>

                <div class="bg-white border rounded-xl shadow-sm divide-y">

                    <div class="p-5 hover:bg-gray-50 transition">

                        <div class="flex items-center gap-3 mb-2">

                            <span
                                class="px-2 py-1 text-xs rounded-full
                                bg-blue-100 text-blue-700">

                                NEW

                            </span>

                            <span class="text-sm text-gray-500">
                                2025/08/08
                            </span>

                        </div>

                        <h3 class="font-semibold text-gray-900">
                            サイト公開までのステップ機能を追加しました
                        </h3>

                        <p class="text-sm text-gray-500 mt-2">
                            ホーム画面からサイト公開までの進捗状況を確認できるようになりました。
                        </p>

                    </div>

                    <div class="p-5 hover:bg-gray-50 transition">

                        <div class="flex items-center gap-3 mb-2">

                            <span
                                class="px-2 py-1 text-xs rounded-full
                                bg-green-100 text-green-700">

                                UPDATE

                            </span>

                            <span class="text-sm text-gray-500">
                                2025/08/05
                            </span>

                        </div>

                        <h3 class="font-semibold text-gray-900">
                            ページ管理画面のUIを改善しました
                        </h3>

                        <p class="text-sm text-gray-500 mt-2">
                            モーダル機能の追加とページ管理画面の操作性向上を行いました。
                        </p>

                    </div>

                </div>

            </section>    
            </section>
             {{-- 最近編集したサイト --}}
                <div class="mt-12">

                    <h2 class="text-xl font-semibold mb-4">
                        最近編集したサイト
                    </h2>

                    <div class="space-y-4">

                        @forelse ($recentSites as $site)

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

                                <div class="mt-4">
                                    <a
                                        href="{{ route('pages.manage', $site) }}"
                                        class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">

                                        ページ管理

                                    </a>
                                </div>

                            </div>

                        @empty

                            <div class="bg-white border rounded-lg p-6 text-gray-500">
                                サイトがまだ作成されていません
                            </div>

                        @endforelse

                    </div>

                </div>

        </main>

    </div>
<script>
    function goToPageManage()
    {
        const url =
            document.getElementById('targetSite').value;

        if (!url) {
            alert('対象サイトを選択してください');
            return;
        }

        window.location.href = url;
    }
</script>
</x-app-layout>