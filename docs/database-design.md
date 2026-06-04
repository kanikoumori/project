# Database Design v2.0

## 目的

本ドキュメントは卒業研究で開発する「WordPress風ノーコードCMS」のデータベース設計を定義する。

ユーザーはログイン後、

* サイト作成
* ページ作成
* ブロック編集
* プレビュー
* 公開

を行うことができる。

---

# 使用DB

## 開発環境

PostgreSQL 16

## 本番環境

Render PostgreSQL

---

# ER構造

users
└ sites
└ pages
├ page_blocks
└ page_histories

users
└ media_files

themes
└ sites

sites
├ analytics
├ comments
└ site_settings

---

# テーブル一覧

## users

Laravel Breeze標準

| カラム名              | 型         |
| ----------------- | --------- |
| id                | bigint    |
| name              | string    |
| email             | string    |
| password          | string    |
| email_verified_at | timestamp |
| created_at        | timestamp |
| updated_at        | timestamp |

---

## themes

サイトテーマ

| カラム名        | 型         |
| ----------- | --------- |
| id          | bigint    |
| name        | string    |
| description | text      |
| settings    | json      |
| created_at  | timestamp |
| updated_at  | timestamp |

---

## sites

作成したサイト

| カラム名         | 型                  |
| ------------ | ------------------ |
| id           | bigint             |
| user_id      | bigint FK          |
| theme_id     | bigint FK nullable |
| title        | string             |
| slug         | string unique      |
| logo_path    | string nullable    |
| favicon_path | string nullable    |
| status       | string             |
| created_at   | timestamp          |
| updated_at   | timestamp          |

status

* draft
* published

---

## pages

サイト内ページ

| カラム名       | 型                 |
| ---------- | ----------------- |
| id         | bigint            |
| site_id    | bigint FK         |
| title      | string            |
| slug       | string            |
| content    | longText nullable |
| sort_order | integer           |
| is_home    | boolean           |
| status     | string            |
| created_at | timestamp         |
| updated_at | timestamp         |

status

* draft
* published

---

## page_blocks

ノーコードエディタの実体

| カラム名          | 型                  |
| ------------- | ------------------ |
| id            | bigint             |
| page_id       | bigint FK          |
| media_file_id | bigint FK nullable |
| type          | string             |
| data          | json               |
| sort_order    | integer            |
| created_at    | timestamp          |
| updated_at    | timestamp          |

type

* text
* image
* button
* video
* table
* link

---

## page_histories

更新履歴

| カラム名           | 型         |
| -------------- | --------- |
| id             | bigint    |
| page_id        | bigint FK |
| version_number | integer   |
| content        | json      |
| created_at     | timestamp |

保存のたびに履歴を残す。

---

## media_files

アップロードファイル

| カラム名       | 型         |
| ---------- | --------- |
| id         | bigint    |
| user_id    | bigint FK |
| file_name  | string    |
| file_path  | string    |
| file_type  | string    |
| file_size  | bigint    |
| created_at | timestamp |
| updated_at | timestamp |

file_type

* image
* video
* audio
* file

---

# 後半実装テーブル

## analytics

アクセス解析

| カラム名       | 型                  |
| ---------- | ------------------ |
| id         | bigint             |
| site_id    | bigint FK          |
| page_id    | bigint FK nullable |
| event_type | string             |
| ip_address | string             |
| user_agent | text               |
| created_at | timestamp          |
| updated_at | timestamp          |

---

## comments

フィードバック

| カラム名       | 型         |
| ---------- | --------- |
| id         | bigint    |
| site_id    | bigint FK |
| name       | string    |
| email      | string    |
| body       | text      |
| status     | string    |
| created_at | timestamp |
| updated_at | timestamp |

status

* visible
* hidden

---

## site_settings

サイト設定

| カラム名       | 型         |
| ---------- | --------- |
| id         | bigint    |
| site_id    | bigint FK |
| settings   | json      |
| created_at | timestamp |
| updated_at | timestamp |

---

# 実装順

Phase1

* Breeze認証
* users
* themes
* sites
* pages

Phase2

* page_blocks
* media_files
* プレビュー

Phase3

* page_histories
* 自動保存

Phase4

* analytics
* comments
* site_settings

---

# Git運用

migration追加時は必ず共有する。

実行後は

php artisan migrate:status

で確認する。

vendor
node_modules
.env

はGitHubへpushしない。

---

# MVP（卒研最低完成ライン）

* ユーザー登録
* ログイン
* サイト作成
* ページ作成
* ブロック編集
* 自動保存
* プレビュー
* 公開

ここまでを最優先とする。
