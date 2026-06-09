# CMS Project

## 概要

卒業研究として開発するCMS（コンテンツ管理システム）です。

ユーザーがノーコードでWebサイトを作成・公開できることを目的としています。

---

## 使用技術

* XAMPP
* Laravel 12
* PHP 8.2
* PostgreSQL 16
* Laravel Breeze
* Blade
* Vite
* JavaScript
* CSS
* GitHub
* Render

---

## 開発メンバー

5人チーム開発

---

## 主な機能

### 実装中

* ユーザー認証
* サイト作成
* ページ作成
* ブロック管理
* プレビュー

### 今後実装予定

* 自動保存
* テーマ変更
* 公開機能
* アクセス解析
* フィードバック

---

## 環境構築

### Clone

```bash
git clone リポジトリURL
cd project
```

### Composer

```bash
composer install
```

### Node

```bash
npm install
```

### Environment

```bash
cp .env.example .env
php artisan key:generate
```

### Database

```bash
php artisan migrate
```

### 起動

```bash
php artisan serve
npm run dev
```

---

## 開発ルール

詳細は以下を参照。

```text
docs/git-rules.md
docs/coding-rules.md
docs/api-design.md
docs/database-design.md
docs/deployment.md
```

---

## ブランチ運用

```text
main
└ develop
    └ feature/*
```

---

## デプロイ

Renderを利用する。

詳細：

```text
docs/deployment.md
```