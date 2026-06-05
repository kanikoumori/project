# Deployment Guide

## 目的

このドキュメントは本プロジェクトのデプロイ手順をまとめたものである。

本番環境は Render を使用する。

---

# 使用環境

## 開発環境

* Laravel 12
* PHP 8.2
* PostgreSQL 16
* Node.js
* Vite

## 本番環境

* Render Web Service
* Render PostgreSQL
* GitHub

---

# デプロイ構成

```text
GitHub
  ↓
Render Web Service
  ↓
PostgreSQL
```

develop ブランチで開発を行い、安定版を main ブランチへ統合する。

Render は main ブランチをデプロイ対象とする。

---

# Render設定

## Web Service

Build Command

```bash
composer install --no-dev --optimize-autoloader
npm install
npm run build
```

Start Command

```bash
php artisan serve --host 0.0.0.0 --port $PORT
```

---

# 環境変数

Renderに以下を設定する。

```env
APP_NAME=CMS
APP_ENV=production
APP_DEBUG=false
APP_URL=https://xxxxx.onrender.com

LOG_CHANNEL=stack

DB_CONNECTION=pgsql
DB_HOST=xxxxx
DB_PORT=5432
DB_DATABASE=xxxxx
DB_USERNAME=xxxxx
DB_PASSWORD=xxxxx
```

※ 実際の値は Render が発行した内容を使用する。

---

# 初回デプロイ手順

## 1. GitHubへpush

```bash
git push origin main
```

---

## 2. Renderへ接続

Render Dashboard

↓

New Web Service

↓

GitHub Repository選択

↓

対象Repositoryを選択

---

## 3. PostgreSQL作成

Render Dashboard

↓

New PostgreSQL

↓

Database作成

↓

接続情報取得

---

## 4. 環境変数設定

Render Dashboard

↓

Environment

↓

PostgreSQL接続情報を登録

---

## 5. migration実行

Render Shell または Render Consoleから

```bash
php artisan migrate --force
```

---

# 更新時デプロイ

mainへマージ後

```bash
git push origin main
```

Renderが自動デプロイを実行する。

---

# デプロイ前確認

以下を確認する。

```bash
php artisan route:list
php artisan migrate:status
git status
```

必要に応じて

```bash
php artisan migrate:fresh
```

を実行する。

---

# トラブルシューティング

## APP_KEY エラー

```bash
php artisan key:generate
```

---

## migration エラー

状態確認

```bash
php artisan migrate:status
```

再実行

```bash
php artisan migrate --force
```

---

## 500エラー

Render Logs を確認する。

```text
Dashboard
↓
Logs
```

---

# 運用ルール

* 本番環境へ直接変更しない
* main ブランチのみデプロイ対象とする
* develop ブランチはデプロイしない
* .env をGitHubへpushしない
* DB接続情報を共有チャットへ貼らない
* migration変更時は必ずチームへ共有する

```
```
