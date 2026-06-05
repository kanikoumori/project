<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <h1 class="text-2xl font-bold text-center mb-6">
            ログイン
        </h1>

        <!-- Email Address -->
        <div>
            <x-input-label for="email" value="メールアドレス" />
            <x-text-input
                id="email"
                class="block mt-1 w-full"
                type="email"
                name="email"
                :value="old('email')"
                required
                autofocus
                autocomplete="username"
            />
            <x-input-error
                :messages="$errors->get('email')"
                class="mt-2"
            />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" value="パスワード" />

            <x-text-input
                id="password"
                class="block mt-1 w-full"
                type="password"
                name="password"
                required
                autocomplete="current-password"
            />

            <x-input-error
                :messages="$errors->get('password')"
                class="mt-2"
            />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input
                    id="remember_me"
                    type="checkbox"
                    class="rounded border-gray-300"
                    name="remember"
                >
                <span class="ms-2 text-sm text-gray-600">
                    ログイン状態を保持
                </span>
            </label>
        </div>

        <div class="mt-4">
            <x-primary-button class="w-full justify-center py-3">
                ログイン
            </x-primary-button>

            <div class="text-center mt-4">
                <a
                    href="{{ route('register') }}"
                    class="text-sm text-blue-600 hover:text-blue-800"
                >
                    新規登録はこちら
                </a>
            </div>

            @if (Route::has('password.request'))
                <div class="text-center mt-2">
                    <a
                        href="{{ route('password.request') }}"
                        class="text-sm text-blue-600 hover:text-blue-900"
                    >
                        パスワードを忘れた方はこちら
                    </a>
                </div>
            @endif
        </div>
    </form>
</x-guest-layout>
