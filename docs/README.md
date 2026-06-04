#用途
・プロジェクト説明書。GitHubで最初に見る場所

#記入例

# CMS Project

専門学校卒業研究用CMSアプリケーション

## 概要

本プロジェクトは卒業研究として開発する
ノーコードCMSアプリケーションです。

ユーザーはプログラミング知識がなくても
Webサイトを作成・編集・公開できます。

WordPressを参考にしつつ、
よりシンプルな分かりやすい操作性を目指します。

## 使用技術

- Laravel 12
- PostgreSQL
- Vite
- Blade
- Vanilla JavaScript
## 使用技術

| 分類 | 技術 |
|-------|-------|
| Backend | Laravel 12 |
| Frontend | Blade |
| Language | PHP / JavaScript |
| Database | PostgreSQL 16 |
| Build Tool | Vite |
| Version Control | Git / GitHub |
| Deploy | Render |
## 開発環境

### Windows

・VSCode
・Git
・GitHub
・XAMPP8.2.12
・Composer
・Node.js LTS
・PostgreSQL 16.14
・pgAdmin
・Laravel Framework 12.60.2
・PHP 8.2.12

### Mac

・Homebrew 5.1.14
・Git 2.54.0
・GitHub
・PHP 8.2.31
・node 24.16.0
・npm 11.13.0
・PostgreSQL 16.14
・Laravel Framework 12.60.2

## 環境構築

```bash
git clone URL
cd project

composer install
npm install

cp .env.example .env

php artisan key:generate
php artisan migrate

npm run dev
php artisan serve

#起動
Laravel:http://127.0.0.1:8000

---

# `requirements.md`

## 起動方法

### Laravel

```bash
php artisan serve
```

### Vite

```bash
npm run dev
```

アクセス先

```txt
Laravel:http://127.0.0.1:8000

---

## Git運用

### ブランチ

main
feature/機能名

例

feature/login
feature/editor
feature/template

### 禁止事項

- mainへの直接push禁止
- .envのpush禁止
- vendorのpush禁止
- node_modulesのpush禁止

### 開発手順

1. featureブランチ作成
2. 実装
3. commit
4. push
5. Pull Request
6. merge

## ディレクトリ構成

project/

├ app/
├ bootstrap/
├ config/
├ database/
├ public/
├ resources/
├ routes/
├ storage/
├ tests/
└ docs/


##　　チームの役割
① プロジェクトリーダー兼統合担当

担当　　宮田　耕量

GitHub管理
branch管理
Renderデプロイ
DB設計
API統合
最終調整
主に触る場所

routes/
database/
.env
Render設定

この人が決めるべき

命名規則
branchルール
ディレクトリ構成
API仕様
何を作らないかを決める。

② バックエンド担当CMSの心臓部

担当機能　　津久家　光樹

ログイン
ユーザ管理
DB保存
リアルタイム保存
更新履歴
公開処理
主に触る場所

app/
routes/
database/

作るテーブル例

users
projects
project_versions
feedbacks
analytics


③ フロントエンドA（UI担当）

見た目担当

担当　杉山　直太郎

ダッシュボード
サイドバー
編集画面
UI設計
レスポンシブ対応
主に触る場所
resources/views/
resources/css/
この人が作るもの

例えば：

WordPress風UI
サイドメニュー
管理画面

④ フロントエンドB（エディタ担当）:ノーコード機能の中心

この人が一番JavaScriptを書く

担当　小野﨑　鈴音

要素追加
サイズ変更
UI移動
DOM操作
プレビュー
主に触る場所

resources/js/editor/

⑤ テスト・テンプレ・発表担当

後半は、「発表できる状態」に持っていく。

担当　田島未幌

テンプレ作成
バグ検証
README
発表資料
操作説明
UI改善提案
主に触る場所

templates/
docs/
tests/

 



```txt id="7"

##要件定義





## 実装予定

- [ ] ログイン
- [ ] ユーザー管理
- [ ] サイト作成
- [ ] ページ作成
- [ ] ブロック追加
- [ ] ドラッグ移動
- [ ] 自動保存
- [ ] プレビュー
- [ ] 公開機能
- [ ] アクセス解析
