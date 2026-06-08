<x-guest-layout>
    <h1 class="text-2xl font-bold text-center mb-6">
        パスワード再設定
    </h1>

    <div class="mb-4 text-sm text-gray-600 text-center">
        登録済みのメールアドレスを入力してください。<br>
        パスワード再設定用のリンクを送信します。
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" value="メールアドレス" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="mt-4">

    <x-primary-button class="w-full justify-center py-3">
        再設定メールを送信
    </x-primary-button>

    <div class="text-center mt-4">
            <a
                href="{{ route('login') }}"
                class="text-sm text-blue-600 hover:text-blue-800"
            >
                ログイン画面へ戻る
            </a>
        </div>

    </div>
    </form>
</x-guest-layout>
