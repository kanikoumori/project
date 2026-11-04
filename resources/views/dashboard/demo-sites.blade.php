<x-app-layout>

    <div class="flex min-h-[calc(100vh-64px)]">

        @include('dashboard.sidebar')

        <main class="flex-1 min-w-0 p-8">

            <div class="max-w-7xl mx-auto">

                <h1 class="text-3xl font-bold mb-2">
                    作成例・デモサイト
                </h1>

                <p class="text-sm text-gray-500 mb-8">
                    エディターで作成したサイトの作成例を展示しています。
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    @forelse ($demoSites as $site)

                        @php
                            $firstPage = $site->pages->first();
                        @endphp

                        <div class="bg-white rounded-lg shadow hover:shadow-lg transition p-6">

                            <p class="text-sm text-gray-500">
                                サイト名
                            </p>

                            <h2 class="text-xl font-bold mb-4">
                                {{ $site->title }}
                            </h2>

                            <p class="text-sm text-gray-500">
                                サイト説明
                            </p>

                            <p class="text-gray-700 mb-4">
                                {{ $site->description ?? '説明はありません' }}
                            </p>

                            <p class="text-sm text-gray-500">
                                URL(slug)
                            </p>

                            <p class="text-gray-700 mb-4">
                                {{ $site->slug }}
                            </p>

                            <p class="text-sm text-gray-400 mb-6">
                                更新日：{{ $site->updated_at }}
                            </p>

                            @if ($firstPage)
                                <a
                                    href="{{ route('editor.show', $firstPage) }}"
                                    class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    デモを見る
                                </a>
                            @else
                                <span class="text-sm text-gray-400">
                                    ページがありません
                                </span>
                            @endif

                        </div>

                    @empty

                        <div class="col-span-full bg-white rounded-lg shadow p-6 text-center text-gray-500">
                            表示できるデモサイトはまだありません。
                        </div>

                    @endforelse

                </div>

            </div>

        </main>

    </div>

</x-app-layout>