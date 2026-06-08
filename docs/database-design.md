# Database Design v3.1

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
├ sites
│ ├ pages
│ │ ├ blocks
│ │ └ page_histories
│ ├ analytics
│ ├ comments
│ └ site_settings
│
└ media_files

themes
└ sites

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
| slug         | string             |
| logo_path    | string nullable    |
| favicon_path | string nullable    |
| status       | enum               |
| created_at   | timestamp          |
| updated_at   | timestamp          |

### 制約

```sql
UNIQUE(user_id, slug)
```

同一ユーザー内で slug の重複を禁止する。

### status

* draft
* published

---

## pages

サイト内ページ

| カラム名       | 型         |
| ---------- | --------- |
| id         | bigint    |
| site_id    | bigint FK |
| title      | string    |
| slug       | string    |
| sort_order | integer   |
| is_home    | boolean   |
| status     | enum      |
| created_at | timestamp |
| updated_at | timestamp |

### 制約

```sql
UNIQUE(site_id, slug)
```

同一サイト内で slug の重複を禁止する。

### status

* draft
* published

### 備考

ページ本文は保持しない。

コンテンツはすべて blocks テーブルで管理する。

---

## blocks

ノーコードエディタの実体

| カラム名          | 型                  |
| ------------- | ------------------ |
| id            | bigint             |
| page_id       | bigint FK          |
| media_file_id | bigint FK nullable |
| type          | enum               |
| data          | json               |
| sort_order    | integer            |
| created_at    | timestamp          |
| updated_at    | timestamp          |

### type

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
| page_data      | json      |
| created_at     | timestamp |

### 備考

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
| file_type  | enum      |
| file_size  | bigint    |
| created_at | timestamp |
| updated_at | timestamp |

### file_type

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
| status     | enum      |
| created_at | timestamp |
| updated_at | timestamp |

### status

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

### 制約

```sql
UNIQUE(site_id)
```

1サイトにつき1設定のみ保持する。

---

# ENUM方針

以下のカラムは許可値を固定する。

## sites.status

* draft
* published

## pages.status

* draft
* published

## blocks.type

* text
* image
* button
* video
* table
* link

## media_files.file_type

* image
* video
* audio
* file

## comments.status

* visible
* hidden

Laravel Migrationでは enum または validation により制限する。

---

# 外部キー方針

親レコード削除時は関連子レコードも削除する。

```text
CASCADE DELETE
```

---

# 実装順

## Phase1

* Breeze認証
* users
* themes
* sites
* pages

## Phase2

* blocks
* media_files
* プレビュー

## Phase3

* page_histories
* 自動保存

## Phase4

* analytics
* comments
* site_settings

---

# Git運用

migration追加時は必ず共有する。

実行後は

```bash
php artisan migrate:status
```

で確認する。

以下はGitHubへpushしない。

```text
vendor
node_modules
.env
```

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
