# API Design

## 目的

本ファイルでは、本プロジェクトで使用するAPI仕様を管理する。

主に以下を定義する。

* ルーティング
* リクエスト内容
* レスポンス内容
* 認証の有無
* 使用するテーブル
* 実装優先度

---

# 基本方針

本プロジェクトはLaravel Breezeによるログイン機能を使用する。

そのため、作成・保存・編集系のAPIは原則としてログイン済みユーザーのみ利用可能とする。

---

# API一覧

## 認証関連

Laravel Breezeで自動生成されたルートを使用する。

| method | path      | 内容         | 備考       |
| ------ | --------- | ---------- | -------- |
| GET    | /login    | ログイン画面表示   | Breeze標準 |
| POST   | /login    | ログイン処理     | Breeze標準 |
| POST   | /logout   | ログアウト処理    | Breeze標準 |
| GET    | /register | 新規登録画面表示   | Breeze標準 |
| POST   | /register | 新規登録処理     | Breeze標準 |
| GET    | /profile  | プロフィール編集画面 | Breeze標準 |

---
# 認可（Authorization）

Laravel Policyを使用する。

- SitePolicy
- PagePolicy
- BlockPolicy

ユーザーは自分が所有するデータのみ操作可能とする。

違反時は403を返却する。
---

# Dashboard Routes

## GET /dashboard

ダッシュボードトップ

## GET /dashboard/sites

サイト一覧画面

## GET /dashboard/settings

設定画面

## GET /dashboard/analytics

アクセス解析画面
---


# サイト関連API

## サイト作成

### POST /sites

新しいサイトを作成する。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | sites |
| 優先度    | 高     |

### Request

```json
{
  "title": "My Site",
  "description": "サイト説明"
}
```

### Response

```json
{
  "id": 1,
  "title": "My Site",
  "description": "サイト説明",
  "status": "draft"
}
```

---

## サイト一覧取得

### GET /sites

ログイン中のユーザーが作成したサイト一覧を取得する。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | sites |
| 優先度    | 高     |

### Response

```json
[
  {
    "id": 1,
    "title": "My Site",
    "status": "draft",
    "updated_at": "2026-06-04 12:00:00"
  }
]
```

---

## サイト詳細取得

### GET /sites/{id}

指定したサイト情報を取得する。

| 項目 | 内容 |
|------|------|
| 認証 | 必要 |
| 使用テーブル | sites, pages |
| 優先度 | 中 |

### Response

```json
{
  "id": 1,
  "title": "My Site",
  "description": "サイト説明",
  "status": "draft",
  "pages": [
    {
      "id": 1,
      "title": "トップページ",
      "slug": "home"
    }
  ]
}
```


## サイト更新

### PUT /sites/{id}

サイト情報を更新する。

| 項目 | 内容 |
|------|------|
| 認証 | 必要 |
| 使用テーブル | sites |
| 優先度 | 低 |

### Request

```json
{
  "title": "更新後のサイト名",
  "description": "更新後の説明"
}
```

### Response

```json
{
  "message": "Site updated successfully",
  "id": 1
}
```

---

## サイト削除

### DELETE /sites/{id}

指定したサイトを削除する。

| 項目 | 内容 |
|------|------|
| 認証 | 必要 |
| 使用テーブル | sites |
| 優先度 | 低 |

### Response

```json
{
  "message": "Site deleted successfully"
}
```

---

# ページ関連API

## ページ作成

### POST /sites/{site}/pages

新しいページを作成する。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | pages |
| 優先度    | 高     |

### Request

```json
{
  "title": "トップページ",
  "slug": "home"
}
```

### Response

```json
{
  "id": 1,
  "site_id": 1,
  "title": "トップページ",
  "slug": "home"
}
```
## ページ一覧取得

### GET /sites/{site}/pages

指定したサイトに含まれるページ一覧を取得する。

| 項目 | 内容 |
|---|---|
| 認証 | 必要 |
| 使用テーブル | pages |
| 優先度 | 高 |

### Response

```json
[
  {
    "id": 1,
    "site_id": 1,
    "title": "トップページ",
    "slug": "home",
    "sort_order": 1,
    "is_home": true,
    "status": "draft"
  }
]
```
---

## ページ更新・保存

### PUT /pages/{id}

作成中のページ内容を保存・更新する。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | pages |
| 優先度    | 高     |

### Request

```json
{
  "title": "トップページ",
  "slug": "home"
}
```

### Response

```json
{
  "message": "Page updated successfully",
  "id": 1,
  "title": "トップページ",
  "updated_at": "2026-06-04 12:00:00"
}
```

---

## ページ取得

### GET /pages/{id}

指定したページの内容を取得する。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | pages |
| 優先度    | 高     |

### Response

```json
{
  "id": 1,
  "site_id": 1,
  "title": "トップページ",
  "slug": "home",
  "updated_at": "2026-06-04 12:00:00"
}
```

---

## ページ削除

### DELETE /pages/{id}

指定したページを削除する。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | pages |
| 優先度    | 中     |

### Response

```json
{
  "message": "Page deleted successfully"
}
```

---

# プレビュー関連API

## 作成中ページのプレビュー

### GET /pages/{id}?mode=preview

作成中のページをプレビュー表示する。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | pages |
| 優先度    | 高     |

### Response

HTMLページを返す。

```html
<!DOCTYPE html>
<html>
<head>
  <title>トップページ</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
```

---

# ブロック関連API
## 対応ブロックタイプ

blocks.type は以下をサポートする。

```text
text
heading
image
video
button
divider
list
form
```

※ video / divider は今後実装予定


## ブロック一覧取得

### GET /pages/{page}/blocks

指定したページに含まれるブロック一覧を取得する。

| 項目 | 内容 |
|---|---|
| 認証 | 必要 |
| 使用テーブル | blocks |
| 優先度 | 高 |

### 
各ブロックの data 構造は「ブロック作成」の Request 例を参照
```json
text
{
  "type": "text",
  "data": {
    "content": "テキストを入力",
    "color": "#000000",
    "fontSize": 16,
    "fontWeight": 400,
    "align": "left",
    "italic": false,
    "underline": false,
    "strike": false
  },
  "sort_order": 1
}
heading
{
  "type": "heading",
  "data": {
    "text": "見出しを入力",
    "tag": "h1",
    "color": "#000000",
    "align": "left",
    "italic": false,
    "underline": false,
    "strike": false
  }
}
list
{
  "type": "list",
  "data": {
    "items": [
      "リスト項目",
      "リスト項目",
      "リスト項目"
    ],
    "listStyle": "disc"
  }
}
button
{
  "type": "button",
  "data": {
    "text": "ボタン",
    "backgroundColor": "#5B9DFF",
    "textColor": "#ffffff",
    "borderRadius": 12
  }
}
image
{
  "type": "image",
  "data": {
    "src": "/images/sample.jpg",
    "alt": "",
    "width": 100
  }
}
form
{
  "type": "form",
  "data": {
    "placeholder": "入力してください"
  }
}

```

---

## ブロック作成

### POST /blocks

ページ内にテキスト・画像・動画などのブロックを追加する。

| 項目     | 内容     |
| ------ | ------ |
| 認証     | 必要     |
| 使用テーブル | blocks |
| 優先度    | 中      |

### Request

```json
{ 
  "page_id": 1, 
  "type": "text", 
  "data": { 
    "content": "こんにちは" 
  }, 
  "sort_order": 1 
}
```

### Response

```json
{
  "id": 1, 
  "page_id": 1, 
  "type": "text", 
  "data": { 
    "content": "こんにちは" 
  }, 
  "sort_order": 1, 
  "created_at": "2026-06-08T10:00:00Z", "updated_at": "2026-06-08T10:00:00Z"
}
```

---

## ブロック並び替え（一括更新）

### PUT/pages/{page}/blocks/reorder

ページ内の全ブロックの並び順を一括で更新する。ドラッグ＆ドロップ完了時にフロントから送信される。

| 項目     | 内容     |
| ------ | ------ |
| 認証     | 必要     |
| 使用テーブル | blocks |
| 優先度    | 高      |

### Request

orders 配列の中に、そのページに存在するすべてのブロックの「ID」と「新しい並び順（1から始まる連番）」を格納して送信する。

```json
{
  "blocks": [
    {
      "id": 3,
      "sort_order": 0
    },
    {
      "id": 1,
      "sort_order": 1
    },
    {
      "id": 2,
      "sort_order": 2
    }
  ]
}
```

### Response

```json
{
  "message": "Blocks reordered successfully"
}
```

---

## ブロック削除

### DELETE /blocks/{id}

指定したブロックを削除する。

| 項目     | 内容     |
| ------ | ------ |
| 認証     | 必要     |
| 使用テーブル | blocks |
| 優先度    | 中      |

### Response

```json
{
  "message": "Block deleted successfully"
}
```

---

## ブロック更新

### PUT /blocks/{block}

既存ブロックの内容を更新する。

| 項目 | 内容 |
|------|------|
| 認証 | 必要 |
| 使用テーブル | blocks |
| 優先度 | 高 |

### Request

```json
{
  "data": {
    "content": "更新後テキスト"
  }
}
```

### Response

```json
{
  "id": 1,
  "page_id": 1,
  "type": "text",
  "data": {
    "content": "更新後テキスト"
  },
  "sort_order": 1,
  "created_at": "2026-06-08T10:00:00Z",
  "updated_at": "2026-06-08T10:05:00Z"
}
```
## 利用可能ブロックタイプ
### 現在実装済み
heading
text
list
button
image
form
今後実装予定
video
divider
Blockデータは data(JSON) カラムへ保存する。
ブロック種別ごとに data の構造は異なる。
---

# メディア関連API

## ファイルアップロード

### POST /media

画像・動画・音声・ファイルをアップロードする。

| 項目     | 内容    |
| ------ | ----- |
| 認証     | 必要    |
| 使用テーブル | media_files |
| 優先度    | 中     |

### Request

```text
multipart/form-data
file: アップロードファイル
site_id: 1
file → Laravelが自動判定
```

### Response

```json
{
  "id": 1,
  "file_name": "sample.png",
  "file_path": "storage/media/sample.png",
  "file_type": "image"
}
```

---

# テーマ関連API

## テーマ一覧取得

### GET /themes

使用できるテーマ一覧を取得する。

| 項目     | 内容     |
| ------ | ------ |
| 認証     | 必要     |
| 使用テーブル | themes |
| 優先度    | 低      |

### Response

```json
[
  {
    "id": 1,
    "name": "Simple",
    "css_path": "themes/simple.css"
  },
  {
    "id": 2,
    "name": "Business",
    "css_path": "themes/business.css"
  }
]
```

---

## サイトテーマ更新

### PUT /sites/{id}/theme

サイトに適用するテーマを変更する。

| 項目     | 内容            |
| ------ | ------------- |
| 認証     | 必要            |
| 使用テーブル | sites, themes |
| 優先度    | 低             |

### Request

```json
{
  "theme_id": 1
}
```

### Response

```json
{
  "message": "Theme updated successfully",
  "site_id": 1,
  "theme_id": 1
}
```

---

# 統計関連API

## 閲覧数登録

### POST /analytics/view

サイトまたはページの閲覧数を記録する。

| 項目     | 内容        |
| ------ | --------- |
| 認証     | 不要        |
| 使用テーブル | analytics |
| 優先度    | 低         |

### Request

```json
{
  "site_id": 1,
  "page_id": 1
}
```

### Response

```json
{
  "message": "View recorded"
}
```

---

# フィードバック関連API

## コメント投稿

### POST /feedbacks

公開サイトに対するコメントを投稿する。

| 項目     | 内容        |
| ------ | --------- |
| 認証     | 不要        |
| 使用テーブル | feedbacks |
| 優先度    | 低         |

### Request

```json
{
  "site_id": 1,
  "name": "guest",
  "email": "guest@example.com",
  "comment": "見やすいサイトです"
}
```

### Response

```json
{
  "message": "Feedback submitted successfully"
}
```

---

# HTTPステータスコード

| status | 意味         |
| ------ | ---------- |
| 200    | 正常取得       |
| 201    | 作成成功       |
| 400    | リクエスト不正    |
| 401    | 未ログイン      |
| 403    | 権限なし       |
| 404    | データなし      |
| 422    | バリデーションエラー |
| 500    | サーバーエラー    |

---

# 開発環境構築

## Seeder実行

```bash
php artisan db:seed --class=DemoCmsSeeder
```

または

```bash
php artisan migrate:fresh --seed
```
---

# 実装優先度

## 優先度 高

6月中に優先して実装する。

```text
POST /sites
GET /sites

POST /sites/{site}/pages
GET /sites/{site}/pages
GET /pages/{id}

GET /pages/{id}/blocks
POST /pages/{page}/blocks
PUT /blocks/{id}
DELETE /blocks/{id}

PUT /pages/{page}/blocks/reorder

```

## 優先度 中

基本機能が完成してから実装する。

```text
POST /pages/{page}/autosave
GET /pages/{page}/histories
POST /histories/{history}/restore

POST /media
DELETE /pages/{id}
```

## 優先度 低

後半または余裕がある場合に実装する。

```text
GET /themes
PUT /sites/{id}/theme
POST /analytics/view
POST /feedbacks
PUT /sites/{id}
DELETE /sites/{id}
```
---

# 注意事項

* 認証が必要なAPIはLaravel Breezeのログイン状態を使用する
* 他人のsite_idやpage_idを操作できないようにする
* 保存系APIはバリデーションを必ず行う
* 画像・動画本体はDBに保存しない
* DBにはファイルパスのみ保存する
* クレジットカード情報は保存しない
* 決済機能は初期実装では対象外とする
* API仕様を変更する場合はdocs/api-design.mdを更新する