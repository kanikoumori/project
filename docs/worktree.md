#用途
・現在のフォルダ構成と、どこを誰が触るかを書くファイル
以下記入例

## 主に編集する場所

### バックエンド担当

- 主に触る場所
- app/Http/Controllers/
- app/Models/
- database/migrations/
- routes/api.php
- routes/web.php

### フロントエンドA（UI担当）

- 主に触る場所
- resources/views/dashboard/
- resources/views/editor/
- resources/css/dashboard/
- resources/css/editor/
- resources/css/components/
- resources/css/theme/

### フロントエンドB（エディタ担当）

- 主に触る場所
- resources/js/editor/
- resources/js/preview/
- resources/js/autosave/
- resources/views/editor/
- resources/views/preview/

### テスト・資料担当

- 主に触る場所
- resources/views/templates/
- tests/
- docs/
- README.md
- public/

## 各フォルダの主な役割

- public/images
→ ロゴ・アイコン・固定画像

- README.md
→ プロジェクト全体の説明・環境構築

- docs/README.md
→ docsフォルダ内の設計書一覧・案内

- resources/views/auth
→ ログイン・新規登録など認証画面

- resources/views/editor
→ サイト作成画面

- resources/js/editor
→ エディタの操作処理

- routes/api.php
→ API専用ルート（将来利用）

- routes/auth.php
→ Breeze認証ルート

- routes/web.php
→ 画面遷移・APIルート

## よく触る場所

| 場所                   | 内容         |
| -------------------- | ---------- |
| routes/web.php       | 画面・APIルート  |
| app/Http/Controllers | 処理         |
| app/Models           | DBモデル      |
| database/migrations  | DB構造       |
| resources/views      | Blade画面    |
| resources/js         | JavaScript |
| resources/css        | CSS        |

## 共有編集注意

以下のファイルは衝突しやすいため、
編集前に担当者へ共有する。

- routes/web.php
- routes/api.php
- composer.json
- package.json
- vite.config.js
- database/migrations/*

## 編集対象外

- vendor/
- node_modules/
- .env
- storage/framework/
- bootstrap/cache/

# Worktree

## 基本構成

project/
├ app/
|　├ Http
|　├ Models
│　├ Providers
|　└ View/
├ database/
├ public/
├ resources/
│  ├ css/
│  ├ js/
│  └ views/
├ routes/
├ tests/
└ docs/

## 詳細構成

C:.
|   .editorconfig
|   .env
|   .env.example
|   .gitattributes
|   .gitignore
|   .styleci.yml
|   artisan
|   CHANGELOG.md
|   composer.json
|   composer.lock
|   package-lock.json
|   package.json
|   phpunit.xml
|   postcss.config.js
|   README.md
|   structure.txt
|   tailwind.config.js
|   vite.config.js
|   
+---app
|   +---Http
|   |   +---Controllers
|   |   |   |   AnalyticsController.php ※未実装
|   |   |   |   BlockController.php
|   |   |   |   Controller.php
|   |   |   |   DashboardController.php　※未実装
|   |   |   |   EditorController.php
|   |   |   |   PageController.php
|   |   |   |   PageHistoryController.php
|   |   |   |   PreviewController.php　※未実装
|   |   |   |   ProfileController.php
|   |   |   |   PublishController.php　※未実装
|   |   |   |   SiteController.php
|   |   |   |   
|   |   |   \---Auth
|   |   |           AuthenticatedSessionController.php
|   |   |           ConfirmablePasswordController.php
|   |   |           EmailVerificationNotificationController.php
|   |   |           EmailVerificationPromptController.php
|   |   |           NewPasswordController.php
|   |   |           PasswordController.php
|   |   |           PasswordResetLinkController.php
|   |   |           RegisteredUserController.php
|   |   |           VerifyEmailController.php
|   |   |           
|   |   \---Requests
|   |       |   ProfileUpdateRequest.php
|   |       |   
|   |       \---Auth
|   |               LoginRequest.php
|   |               
|   +---Models
|   |       Block.php
|   |       Page.php
|   |       PageHistory.php
|   |       Site.php
|   |       User.php
|   |
|   +---Policies
|   |       BlockPolicy.php
|   |       PageHistoryPolicy.php
|   |       PagePolicy.php
|   |       SitePolicy.php       
|   |       
|   +---Providers
|   |       AppServiceProvider.php
|   |       
|   \---View
|       \---Components
|               AppLayout.php
|               GuestLayout.php
|               
+---bootstrap
|   |   app.php
|   |   providers.php
|   |   
|   \---cache
|           
+---config
|       app.php
|       auth.php
|       cache.php
|       database.php
|       filesystems.php
|       logging.php
|       mail.php
|       queue.php
|       services.php
|       session.php
|       
+---database
|   |   .gitignore
|   |   
|   +---factories
|   |       UserFactory.php
|   |       
|   +---migrations
|   |       0001_01_01_000000_create_users_table.php
|   |       0001_01_01_000001_create_cache_table.php
|   |       0001_01_01_000002_create_jobs_table.php
|   |       2026_05_29_042508_create_sites_table.php
|   |       2026_05_29_042543_create_pages_table.php
|   |       2026_05_29_042558_create_blocks_table.php
|   |       2026_05_29_042611_create_page_histories_table.php
|   |       
|   \---seeders
|           DatabaseSeeder.php
|           DemoCmsSeeder.php
|           TemplateSeeder.php
|           UserSeeder.php     
|           
+---docs
|       api-design.md
|       coding-rules.md
|       database-design.md
|       deployment.md
│       frontend-api-guide.md
|       git-rules.md
|       meeting-log.md
|       README.md
|       requirements.md
|       worktree.md
|       
+---lang
|   +---en
|   |       auth.php
|   |       pagination.php
|   |       passwords.php
|   |       validation.php
|   |
|   \---ja
|           auth.php
|           pagination.php
|           passwords.php
|           validation.php
|
+---node_modules ※Git管理外・中身は記載しない
|                   
+---public
|   |   .htaccess
|   |   favicon.ico
|   |   index.php
|   |   robots.txt
|   |   
│   +---images
|   |       Image.jpeg
|   |       Image.png
│   │
|   \---build ※Vite自動生成
|               
+---resources
|   +---css
|   |   |   app.css
|   |   |   style_main.css
|   |   |   
|   |   +---components
|   |   |       button.css
|   |   |       card.css
|   |   |       form.css
|   |   |       modal.css
|   |   |       navbar.css
|   |   |       
|   |   +---dashboard
|   |   |       analytics.css
|   |   |       dashboard.css
|   |   |       settings.css
|   |   |       
|   |   +---editor
|   |   |       blocks.css
|   |   |       canvas.css
|   |   |       editor.css
|   |   |       property.css
|   |   |       sidebar.css
|   |   |       toolbar.css
|   |   |       
|   |   \---theme
|   |           colors.css
|   |           darkmode.css
|   |           fonts.css
|   |           theme.css
|   |           
|   +---js
|   |   |   app.js
|   |   |   bootstrap.js
|   |   |   
|   |   +---analytics
|   |   |       analytics.js
|   |   |       feedback.js
|   |   |       visitor-chart.js
|   |   |       
|   |   +---autosave
|   |   |       autosave.js
|   |   |       realtime-save.js
|   |   |       version-control.js
|   |   |       
|   |   +---editor
|   |   |   |   drag-drop.js
|   |   |   |   editor.js
|   |   |   |   property-manager.js
|   |   |   |   resize.js
|   |   |   |
|   |   |   +---blocks
|   |   |   |       ButtonBlock.js
|   |   |   |       FormBlock.js
|   |   |   |       HeadingBlock.js
|   |   |   |       ImageBlock.js
|   |   |   |       ListBlock.js
|   |   |   |       TextBlock.js
|   |   |   |
|   |   |   \---managers
|   |   |           BlockManager.js
|   |   |           HistoryManager.js
|   |   |           PropertyManager.js
|   |   |           SelectionManager.js
|   |   |
|   |   +---preview
|   |   |       preview.js
|   |   |       responsive.js
|   |   |       
|   |   \---theme
|   |           color-manager.js
|   |           font-manager.js
|   |           theme-switcher.js
|   |           
|   \---views
|       |   dashboard.blade.php
|       |   welcome.blade.php
|       |   
|       +---auth
|       |       confirm-password.blade.php
|       |       forgot-password.blade.php
|       |       login.blade.php
|       |       profile.blade.php
|       |       register.blade.php
|       |       reset-password.blade.php
|       |       verify-email.blade.php
|       |       
|       +---components
|       |       application-logo.blade.php
|       |       auth-session-status.blade.php
|       |       danger-button.blade.php
|       |       dropdown-link.blade.php
|       |       dropdown.blade.php
|       |       input-error.blade.php
|       |       input-label.blade.php
|       |       modal.blade.php
|       |       nav-link.blade.php
|       |       primary-button.blade.php
|       |       responsive-nav-link.blade.php
|       |       secondary-button.blade.php
|       |       text-input.blade.php
|       |       
|       +---dashboard
|       |       analytics.blade.php
|       |       demo-sites.blade.php
|       |       index.blade.php
|       |       settings.blade.php
|       |       sidebar.blade.php
|       |       sites.blade.php
|       |       
|       +---editor
|       |       blocks.blade.php
|       |       canvas.blade.php
|       |       history.blade.php
|       |       index.blade.php
|       |       property.blade.php
|       |       sidebar.blade.php
|       |       toolbar.blade.php
|       |   
|       +---layouts
|       |       app.blade.php
|       |       guest.blade.php
|       |       navigation.blade.php
|       |
|       +---pages
|       |       index.blade.php
|       |       
|       +---preview
|       |       desktop.blade.php
|       |       index.blade.php
|       |       mobile.blade.php
|       |       
|       +---profile
|       |   |   edit.blade.php
|       |   |   
|       |   \---partials
|       |           delete-user-form.blade.php
|       |           update-password-form.blade.php
|       |           update-profile-information-form.blade.php
|       |           
|       +---publish
|       |       domain.blade.php
|       |       export.blade.php
|       |       publish.blade.php
|       |       
|       \---templates
|               blog.blade.php
|               default.blade.php
|               landing.blade.php
|               portfolio.blade.php
|               
+---routes
|       api.php
|       auth.php
|       console.php
|       web.php
|       
+---storage
|   +---app
|   |   |   .gitignore
|   |   |   
|   |   +---private
|   |   |       .gitignore
|   |   |       
|   |   \---public
|   |           .gitignore
|   |           
|   +---framework
|   |           
|   \---logs
|           .gitignore
|           
+---tests
|   |   AuthTest.php
|   |   AutosaveTest.php
|   |   EditorTest.php
|   |   Pest.php
|   |   SiteTest.php
|   |   TestCase.php
|   |   
|   +---Feature
|   |   |   ExampleTest.php
|   |   |   ProfileTest.php
|   |   |   
|   |   \---Auth
|   |           AuthenticationTest.php
|   |           EmailVerificationTest.php
|   |           PasswordConfirmationTest.php
|   |           PasswordResetTest.php
|   |           PasswordUpdateTest.php
|   |           RegistrationTest.php
|   |           
|   \---Unit
|           ExampleTest.php
|           
\---vendor ※Git管理外・中身は記載しない
