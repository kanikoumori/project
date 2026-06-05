# Coding Rules

## 目的

このドキュメントは、5人チームでLaravel製CMSアプリを開発する際のコーディングルールをまとめたものです。

目的は以下です。

* ファイル名や書き方を統一する
* GitHubでの衝突を減らす
* 生成AIに依頼しやすい構成にする
* 途中参加や担当変更があっても理解しやすくする

---

## 基本方針

* 初心者でも読めるコードを優先する
* 複雑すぎる設計にしない
* 1ファイルに処理を詰め込みすぎない
* 役割ごとにファイルを分ける
* コメントは必要な場所にだけ書く
* 使っていないコードは残さない
* `.env`、`vendor/`、`node_modules/` はGitHubへpushしない

---

## 使用技術

* Laravel 12
* Laravel Blade
* PHP 8.2系
* PostgreSQL 16.14
* Vite
* HTML
* CSS
* Vanilla JavaScript
* GitHub
* Render

React、Vueは現時点では使用しない。

---

## 命名ルール

### PHP

PHPクラス名は `PascalCase` を使う。

良い例：

```php
EditorController.php
SiteController.php
PageController.php
BlockController.php
```

悪い例：

```php
editorcontroller.php
editor_controller.php
editor-controller.php
```

---

### Controller

Controllerは機能ごとに分ける。

例：

```txt
app/Http/Controllers/AuthController.php
app/Http/Controllers/DashboardController.php
app/Http/Controllers/EditorController.php
app/Http/Controllers/PreviewController.php
app/Http/Controllers/PublishController.php
```

Controllerには画面表示やリクエスト処理を書き、複雑な処理を詰め込みすぎない。

---

### Model

Model名は単数形の `PascalCase` を使う。

例：

```txt
User.php
Site.php
Page.php
Block.php
Feedback.php
Analytics.php
```

---

### Blade

Bladeファイルは基本的に `kebab-case` または短い名前に統一する。

良い例：

```txt
index.blade.php
login.blade.php
register.blade.php
editor-page.blade.php
preview-page.blade.php
```

フォルダで役割が分かる場合は `index.blade.php` を使ってよい。

例：

```txt
resources/views/editor/index.blade.php
resources/views/dashboard/index.blade.php
resources/views/preview/index.blade.php
```

---

### JavaScript

JavaScriptファイルは `kebab-case` を使う。

良い例：

```txt
block-manager.js
drag-drop.js
resize-manager.js
autosave.js
preview-renderer.js
theme-switcher.js
```

悪い例：

```txt
blockManager.js
BlockManager.js
block_manager.js
```

---

### CSS

CSSファイルは `kebab-case` を使う。

良い例：

```txt
editor.css
toolbar.css
side-menu.css
preview-panel.css
button.css
modal.css
```

CSSクラス名も `kebab-case` を使う。

良い例：

```css
.editor-canvas {}
.sidebar-menu {}
.primary-button {}
.preview-area {}
```

---

## フォルダルール

### views

画面ごとに分ける。

```txt
resources/views/
├ auth/
├ dashboard/
├ editor/
├ preview/
├ publish/
└ templates/
```

### js

機能ごとに分ける。

```txt
resources/js/
├ editor/
├ autosave/
├ preview/
├ analytics/
└ theme/
```

### css

画面や部品ごとに分ける。

```txt
resources/css/
├ editor/
├ dashboard/
├ components/
└ theme/
```

---

## Laravel Bladeルール

Bladeでは画面の土台を作る。

* 大きなHTML構造はBladeに書く
* 動的なDOM操作はJavaScriptに任せる
* 同じHTMLを何度も書く場合は部品化を検討する
* Blade内に長いJavaScriptを書かない
* Blade内に長いCSSを書かない

良い例：

```blade
@vite(['resources/css/app.css', 'resources/js/app.js'])

<div id="editor-canvas"></div>
```

悪い例：

```blade
<script>
  // 長いDOM操作をBladeに直接書く
</script>
```

---

## JavaScriptルール

JavaScriptはVanilla JavaScriptを基本とする。

### 基本ルール

* DOM操作は関数に分ける
* 1つの関数に複数の役割を持たせない
* 変数名は意味が分かる名前にする
* `var` は使わず `const` または `let` を使う
* 直接HTML文字列を大量に書きすぎない
* 同じ処理を何度も書かない

良い例：

```js
function addTextBlock() {
    const block = document.createElement('div');
    block.classList.add('text-block');
    block.textContent = 'テキスト';
    document.getElementById('editor-canvas').appendChild(block);
}
```

悪い例：

```js
function a() {
    document.body.innerHTML += '<div>text</div>';
}
```

---

## CSSルール

* 画面ごと、部品ごとに分ける
* `!important` は原則使わない
* class名は意味が分かる名前にする
* idセレクタに依存しすぎない
* 共通部品は `components/` に置く

例：

```css
.editor-canvas {
    min-height: 600px;
    background-color: #ffffff;
}

.editor-toolbar {
    display: flex;
    gap: 8px;
}
```

---

## PHP / Laravelルール

* Controllerに処理を書きすぎない
* DB操作はModelを使う
* URLは `routes/web.php` または `routes/api.php` にまとめる
* DB構造はmigrationで管理する
* pgAdminで手動作成したテーブルは基本使わない
* `.env` の値をコードに直接書かない

---

## migrationルール

migrationファイルは必ず中身を作成してからpushする。

空のmigrationファイルは禁止。

良い例：

```php
Schema::create('sites', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('title');
    $table->text('description')->nullable();
    $table->string('slug');
    $table->timestamps();
});
```

悪い例：

```php
<?php
```

---

## GitHubルール

* main直push禁止
* 必ずfeatureブランチで作業する
* 作業前に develop を最新化する

```bash
git checkout develop
git pull origin develop
```

* 完成後にPull Requestを作成する
* Pull Requestを作成する前に以下を確認する

```bash
php artisan route:list
php artisan migrate:status
git status
```
* 他人の担当ファイルを変更する場合は事前に相談する
* `.env` は絶対にpushしない
* `vendor/` と `node_modules/` はpushしない

---

## ブランチ名ルール

```txt
feature/auth
feature/editor-ui
feature/block-editor
feature/autosave
feature/preview
feature/dashboard
fix/login-error
docs/update-readme
```

---

## コミットメッセージルール

基本形式：

```txt
種類: 内容
```

例：

```txt
feat: ログイン画面を追加
fix: 保存処理のエラーを修正
docs: READMEに環境構築手順を追加
style: エディタ画面のCSSを調整
refactor: JS処理を関数に分割
chore: 不要ファイルを削除
```

種類：

```txt
feat      新機能
fix       バグ修正
docs      ドキュメント
style     見た目・CSS
refactor  整理
chore     設定・雑務
test      テスト
```

---

## AI活用ルール

生成AIを使う場合は、以下を伝える。

* 現在の担当
* 編集しているファイル
* エラー全文
* やりたいこと
* 現在の環境
* 変更してよい範囲

AIにコードを作らせた場合でも、内容を理解してからpushする。

---

## 禁止事項

* `.env` をpushする
* `vendor/` をpushする
* `node_modules/` をpushする
* mainに直接pushする
* 中身が空のmigrationをpushする
* 日本語パスやOneDrive/iCloud Drive上で作業する
* 何のためのファイルか分からない名前を使う
* 動作確認せずにPull Requestを出す

---

## 動作確認ルール

作業後は最低限以下を確認する。

```bash
php artisan serve
npm run dev
php artisan migrate
```

ブラウザで以下を確認する。

```txt
http://127.0.0.1:8000
```

---

## 今回の優先方針

3ヶ月で完成させるため、最初から完璧なCMSを目指さない。

優先順位：

1. ログイン
2. サイト作成
3. ページ作成
4. ブロック追加
5. 保存
6. プレビュー
7. 自動保存
8. 公開・エクスポート
9. アクセス解析
10. フィードバック
