<aside
    id="dashboardSidebar"
    class="w-64 bg-white border-r shrink-0 transition-all duration-300"
>
    <div class="p-4">

        {{-- 折りたたみボタン --}}
        <div class="flex items-center justify-between mb-4">
            <span
                id="sidebarTitle"
                class="text-sm font-bold text-gray-500"
            >
                メニュー
            </span>

            <button
                type="button"
                id="sidebarToggle"
                class="w-8 h-8 rounded-lg border bg-white hover:bg-gray-100 flex items-center justify-center transition"
                aria-label="サイドバーを折りたたむ"
            >
                ‹
            </button>
        </div>

        <nav class="space-y-3">

            {{-- ホーム --}}
            <a
                href="{{ route('dashboard') }}"
                class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition {{ request()->routeIs('dashboard') ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700' }}"
            >
                <img
                    src="{{ asset('images/icons/home.png') }}"
                    alt="ホーム"
                    class="w-7 h-7 object-contain shrink-0"
                >

                <span class="sidebar-label">
                    ホーム
                </span>
            </a>

            {{-- サイト管理 --}}
            <a
                href="{{ route('dashboard.sites') }}"
                class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition {{ request()->routeIs('dashboard.sites') ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700' }}"
            >
                <img
                    src="{{ asset('images/icons/site.png') }}"
                    alt="サイト管理"
                    class="w-7 h-7 object-contain shrink-0"
                >

                <span class="sidebar-label">
                    サイト管理
                </span>
            </a>

            {{-- プレビュー --}}
            <a
                href="#"
                class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
            >
                <img
                    src="{{ asset('images/icons/preview.png') }}"
                    alt="プレビュー"
                    class="w-7 h-7 object-contain shrink-0"
                >

                <span class="sidebar-label">
                    プレビュー
                </span>
            </a>

            {{-- サイト分析 --}}
            <a
                href="{{ route('dashboard.analytics') }}"
                class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition {{ request()->routeIs('dashboard.analytics') ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700' }}"
            >
                <img
                    src="{{ asset('images/icons/analytics.png') }}"
                    alt="サイト分析"
                    class="w-7 h-7 object-contain shrink-0"
                >

                <span class="sidebar-label">
                    サイト分析
                </span>
            </a>

            {{-- 設定 --}}
            <a
                href="{{ route('dashboard.settings') }}"
                class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition {{ request()->routeIs('dashboard.settings') ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700' }}"
            >
                <img
                    src="{{ asset('images/icons/settings.png') }}"
                    alt="設定"
                    class="w-7 h-7 object-contain shrink-0"
                >

                <span class="sidebar-label">
                    設定
                </span>
            </a>

            {{-- 作成例・デモサイト --}}
            <div
                class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed"
            >
                <img
                    src="{{ asset('images/icons/demo-site.png') }}"
                    alt="作成例・デモサイト"
                    class="w-7 h-7 object-contain shrink-0 opacity-70"
                >

                <span class="sidebar-label">
                    作成例・デモサイト
                </span>
            </div>

        </nav>

    </div>
</aside>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.getElementById('dashboardSidebar');
        const toggleButton = document.getElementById('sidebarToggle');
        const sidebarTitle = document.getElementById('sidebarTitle');
        const labels = document.querySelectorAll('.sidebar-label');
        const links = document.querySelectorAll('.sidebar-link');

        if (!sidebar || !toggleButton) {
            return;
        }

        function setCollapsed(isCollapsed) {
            sidebar.classList.toggle('w-64', !isCollapsed);
            sidebar.classList.toggle('w-20', isCollapsed);

            labels.forEach(label => {
                label.classList.toggle('hidden', isCollapsed);
            });

            links.forEach(link => {
                link.classList.toggle('justify-center', isCollapsed);
                link.classList.toggle('gap-3', !isCollapsed);
            });

            if (sidebarTitle) {
                sidebarTitle.classList.toggle('hidden', isCollapsed);
            }

            toggleButton.textContent = isCollapsed ? '›' : '‹';

            localStorage.setItem(
                'dashboardSidebarCollapsed',
                isCollapsed ? 'true' : 'false'
            );
        }

        const savedState = localStorage.getItem('dashboardSidebarCollapsed');
        setCollapsed(savedState === 'true');

        toggleButton.addEventListener('click', function () {
            const isCollapsed = sidebar.classList.contains('w-20');

            setCollapsed(!isCollapsed);
        });
    });
</script>