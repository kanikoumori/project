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

                <button
                    type="button"
                    onclick="openSiteModal()"
                    class="block w-full text-left p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">

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

                </button>

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
                                    <span
                                        id="completedStepsText"
                                        class="text-lg font-bold text-gray-700">
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
                                        value="{{ $site->id }}"
                                        data-pages-url="{{ route('pages.manage', $site) }}"
                                        title="{{ $site->title }}">

                                        {{ \Illuminate\Support\Str::limit(
                                            $site->title,
                                            20
                                        ) }}

                                    </option>
                                @endforeach

                            </select>
                            <div class="mt-4 max-w-xs">

                                <label
                                    class="block text-sm text-gray-500 mb-2">
                                    対象ページ
                                </label>

                                <select
                                    id="targetPage"
                                    class="w-full border rounded-lg px-3 py-2">
                                    <option value="">
                                        対象ページを選択してください
                                    </option>
                                </select>

                            </div>

                        </div>
                    <div class="divide-y divide-gray-200">

                        <a href="{{ route('dashboard.sites') }}"
                            class="group flex items-center justify-between py-5">

                            <div>
                                <div class="flex items-center gap-3">
                                    <span
                                        id="siteStepCheck"
                                        class="text-green-600 font-bold {{ $completedSteps >= 1 ? '' : 'hidden' }}">
                                        ✓
                                    </span>

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
                                    <span
                                        id="pageStepCheck"
                                        class="text-green-600 font-bold {{ $completedSteps >= 2 ? '' : 'hidden' }}">
                                        ✓
                                    </span>

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

                        <button
                            type="button"
                            onclick="goToEditor()"
                            class="group flex items-center justify-between py-5 w-full text-left">

                            <div>
                                <div class="flex items-center gap-3">
                                    <span
                                        id="designStepCheck"
                                        class="text-green-600 font-bold {{ $completedSteps >= 3 ? '' : 'hidden' }}">
                                        ✓
                                    </span>

                                    <h3 class="text-lg font-bold text-gray-900">
                                        デザインを編集
                                    </h3>
                                </div>

                                <p class="text-sm text-gray-500 mt-1">
                                    エディターで見出し・文章・画像・ボタンなどを配置します。
                                </p>
                            </div>

                            <span class="text-3xl text-gray-800 group-hover:translate-x-1 transition">
                                ›
                            </span>

                        </button>

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
            </section>
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
                                bg-green-100 text-green-700">

                                UPDATE

                            </span>

                            <span class="text-sm text-gray-500">
                                2026/06/27
                            </span>

                        </div>

                        <h3 class="font-semibold text-gray-900">
                            エディターの機能追加                        </h3>

                        <p class="text-sm text-gray-500 mt-2">
                            エディターに自動保存機能を追加しました。編集中の内容は自動的に保存されるようになりました。
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
                                2025/06/29
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

            {{-- 最近編集したサイト --}}
            <section class="mt-10">

                <h2 class="text-2xl font-bold mb-6">
                    最近編集したサイト
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    @forelse ($recentSites as $site)

                        <div
                            class="relative bg-white rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition-all duration-200 group p-4">

                            <a
                                href="{{ route('pages.manage', $site) }}"
                                class="inline-block p-1 rounded-sm focus:outline-none">

                                <div class="space-y-3">

                                    <div>
                                        <p class="text-sm text-gray-500">
                                            サイト名
                                        </p>

                                        <h2 class="text-xl font-bold">
                                            {{ $site->title }}
                                        </h2>
                                    </div>

                                    <div>
                                        <p class="text-sm text-gray-500">
                                            サイト説明
                                        </p>

                                        <p class="text-gray-700">
                                            {{ $site->description }}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="text-sm text-gray-500">
                                            URL (slug)
                                        </p>

                                        <p class="text-gray-700">
                                            {{ $site->slug }}
                                        </p>
                                    </div>

                                    <p class="text-sm text-gray-400">
                                        更新日：{{ $site->updated_at }}
                                    </p>

                                </div>

                            </a>

                            <div
                                class="absolute top-2 right-2 z-20 flex gap-2
                                    opacity-0 group-hover:opacity-100
                                    transition pointer-events-auto">

                                <button
                                    type="button"
                                    onclick="openSiteEditModal(this)"
                                    data-id="{{ $site->id }}"
                                    data-title="{{ $site->title }}"
                                    data-description="{{ $site->description }}"
                                    data-slug="{{ $site->slug }}"
                                    class="text-gray-500 hover:text-green-600 text-xl">
                                    ⚙
                                </button>

                                <button
                                    type="button"
                                    onclick="openSiteDeleteModal({{ $site->id }})"
                                    class="text-gray-500 hover:text-red-600 text-xl">
                                    ✕
                                </button>

                            </div>

                        </div>

                    @empty

                        <div class="col-span-full text-center text-gray-500">
                            最近編集したサイトはありません
                        </div>

                    @endforelse

                </div>

            </section>

            <!-- 新規サイト作成モーダル -->
            <div
                id="siteModal"
                onclick="closeSiteModal()"
                class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                <div
                    onclick="event.stopPropagation()"
                    class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

                    <h2 class="text-2xl font-bold mb-4">
                        新規サイト作成
                    </h2>

                    <form
                        id="siteForm"
                        method="POST"
                        action="{{ route('sites.store') }}">

                        @csrf

                        <div class="mb-4">
                            <label class="block mb-1">
                                サイト名
                            </label>

                            <input
                                id="title"
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
                                id="description"
                                name="description"
                                class="w-full border rounded p-2"
                                rows="3"></textarea>
                        </div>

                        <div class="mb-4">
                            <label class="block mb-1">
                                slug(URL識別子)
                            </label>

                            <input
                                id="slug"
                                type="text"
                                name="slug"
                                class="w-full border rounded p-2"
                                placeholder="my-site"
                                required>

                            <div
                                id="errorMessage"
                                class="hidden text-red-600 text-sm mt-2">
                            </div>
                        </div>

                        <div class="flex justify-end gap-2">

                            <button
                                type="button"
                                onclick="closeSiteModal()"
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

            <!-- Site編集モーダル -->
            <div
                id="editSiteModal"
                onclick="closeSiteEditModal()"
                class="hidden fixed inset-0 bg-black/50 items-center justify-center z-50">

                <div
                    onclick="event.stopPropagation()"
                    class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">

                    <h2 class="text-2xl font-bold mb-4">
                        サイト編集
                    </h2>

                    <form id="editSiteForm">

                        <input
                            type="hidden"
                            id="editSiteId">

                        <div class="mb-4">
                            <label class="block mb-1">
                                サイト名
                            </label>

                            <input
                                id="editTitle"
                                type="text"
                                class="w-full border rounded p-2"
                                required>
                        </div>

                        <div class="mb-4">
                            <label class="block mb-1">
                                サイト説明
                            </label>

                            <textarea
                                id="editDescription"
                                class="w-full border rounded p-2"
                                rows="3"></textarea>
                        </div>

                        <div class="mb-4">
                            <label class="block mb-1">
                                slug (URL識別子)
                            </label>

                            <input
                                id="editSlug"
                                type="text"
                                class="w-full border rounded p-2"
                                required>

                            <div
                                id="editErrorMessage"
                                class="hidden text-red-600 text-sm mt-2">
                            </div>
                        </div>

                        <div class="flex justify-end gap-2">

                            <button
                                type="button"
                                onclick="closeSiteEditModal()"
                                class="bg-gray-300 px-4 py-2 rounded">
                                キャンセル
                            </button>

                            <button
                                type="submit"
                                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                更新
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </main>

    </div>

    <script>
        const sitePages = @js($sitePages);
        const siteProgresses = @js($siteProgresses);
        const totalSteps = @js($totalSteps);

        function updateTargetPages()
        {
            const siteSelect = document.getElementById('targetSite');
            const pageSelect = document.getElementById('targetPage');

            if (!siteSelect || !pageSelect) {
                return;
            }

            const siteId = siteSelect.value;
            const pages = sitePages[siteId] || [];

            pageSelect.innerHTML = '';

            if (pages.length === 0) {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'このサイトにはページがありません';
                pageSelect.appendChild(option);
                return;
            }

            pages.forEach(function (page) {
                const option = document.createElement('option');

                option.value = page.url;
                option.textContent = page.title;

                pageSelect.appendChild(option);
            });
        }

        function goToPageManage()
        {
            const siteSelect = document.getElementById('targetSite');

            if (!siteSelect) {
                return;
            }

            const selectedOption =
                siteSelect.options[siteSelect.selectedIndex];

            const url = selectedOption.dataset.pagesUrl;

            if (!url) {
                alert('対象サイトを選択してください');
                return;
            }

            window.location.href = url;
        }

        function goToEditor()
        {
            const pageSelect = document.getElementById('targetPage');

            if (!pageSelect || !pageSelect.value) {
                alert('対象ページを選択してください');
                return;
            }

            window.location.href = pageSelect.value;
        }

        document.addEventListener('DOMContentLoaded', function () {
            const siteSelect = document.getElementById('targetSite');

            if (siteSelect) {
                siteSelect.addEventListener('change', function () {
                    updateTargetPages();
                    updateStepProgress();
                });

                updateTargetPages();
                updateStepProgress();
            }
        });

        function updateStepProgress()
        {
            const siteSelect = document.getElementById('targetSite');

            if (!siteSelect) {
                return;
            }

            const siteId = siteSelect.value;

            const progress = siteProgresses[siteId] || {
                completedSteps: 0,
                hasSite: false,
                hasPage: false,
                hasEditedDesign: false
            };

            const completedStepsText =
                document.getElementById('completedStepsText');

            if (completedStepsText) {
                completedStepsText.textContent =
                    `${progress.completedSteps}/${totalSteps}`;
            }

            const siteStepCheck =
                document.getElementById('siteStepCheck');

            const pageStepCheck =
                document.getElementById('pageStepCheck');

            const designStepCheck =
                document.getElementById('designStepCheck');

            if (siteStepCheck) {
                siteStepCheck.classList.toggle(
                    'hidden',
                    !progress.hasSite
                );
            }

            if (pageStepCheck) {
                pageStepCheck.classList.toggle(
                    'hidden',
                    !progress.hasPage
                );
            }

            if (designStepCheck) {
                designStepCheck.classList.toggle(
                    'hidden',
                    !progress.hasEditedDesign
                );
            }
        }
    </script>

</x-app-layout>