# Database Design

## 目的

本ファイルでは、本プロジェクトで使用するデータベース設計を管理する。

主に以下を定義する。

* テーブル構造
* リレーション
* 各カラムの意味
* 今後追加予定のテーブル

---

# ER図

```text
users
│
└── sites
      │
      ├── pages
      │     │
      │     └── blocks
      │
      ├── media
      │
      ├── themes
      │
      ├── feedbacks
      │
      └── analytics
```

---

# テーブル一覧

## users

Laravel Breezeで作成されるユーザーテーブル。

| column            | type               | note         |
| ----------------- | ------------------ | ------------ |
| id                | bigint             | 主キー          |
| name              | string             | ユーザー名        |
| email             | string             | メールアドレス      |
| email_verified_at | timestamp nullable | メール認証日時      |
| password          | string             | ハッシュ化済みパスワード |
| remember_token    | string nullable    | ログイン保持用トークン  |
| created_at        | timestamp          | 作成日時         |
| updated_at        | timestamp          | 更新日時         |

---

## sites

ユーザーが作成するWebサイトを管理するテーブル。

| column        | type            | note              |
| ------------- | --------------- | ----------------- |
| id            | bigint          | 主キー               |
| user_id       | bigint          | users.id への外部キー   |
| title         | string          | サイト名              |
| description   | text nullable   | サイト説明             |
| logo_path     | string nullable | サイトロゴ画像のパス        |
| favicon_path  | string nullable | サイトアイコンのパス        |
| theme_id      | bigint nullable | themes.id への外部キー  |
| status        | string          | draft / published |
| published_url | string nullable | 公開URL             |
| created_at    | timestamp       | 作成日時              |
| updated_at    | timestamp       | 更新日時              |

---

## pages

サイト内の各ページを管理するテーブル。

| column     | type              | note              |
| ---------- | ----------------- | ----------------- |
| id         | bigint            | 主キー               |
| site_id    | bigint            | sites.id への外部キー   |
| title      | string            | ページ名              |
| slug       | string            | URL用の文字列          |
| content    | longText nullable | ページ全体のHTMLまたはJSON |
| order      | integer           | ページ表示順            |
| is_home    | boolean           | トップページかどうか        |
| created_at | timestamp         | 作成日時              |
| updated_at | timestamp         | 更新日時              |

---

## blocks

ページ内の要素を管理するテーブル。

テキスト、画像、動画、テーブル、リンクなどをブロック単位で保存する。

| column     | type              | note                                           |
| ---------- | ----------------- | ---------------------------------------------- |
| id         | bigint            | 主キー                                            |
| page_id    | bigint            | pages.id への外部キー                                |
| type       | string            | text / image / video / audio / table / link など |
| content    | longText nullable | ブロック内容                                         |
| style      | json nullable     | 色、サイズ、余白などのデザイン情報                              |
| order      | integer           | ブロック表示順                                        |
| created_at | timestamp         | 作成日時                                           |
| updated_at | timestamp         | 更新日時                                           |

---

## media

画像・動画・音声・ファイルを管理するテーブル。

| column     | type             | note                         |
| ---------- | ---------------- | ---------------------------- |
| id         | bigint           | 主キー                          |
| site_id    | bigint           | sites.id への外部キー              |
| user_id    | bigint           | users.id への外部キー              |
| file_name  | string           | 元ファイル名                       |
| file_path  | string           | 保存先パス                        |
| file_type  | string           | image / video / audio / file |
| mime_type  | string nullable  | MIMEタイプ                      |
| file_size  | integer nullable | ファイルサイズ                      |
| created_at | timestamp        | 作成日時                         |
| updated_at | timestamp        | 更新日時                         |

---

## themes

テーマ情報を管理するテーブル。

| column     | type            | note        |
| ---------- | --------------- | ----------- |
| id         | bigint          | 主キー         |
| name       | string          | テーマ名        |
| css_path   | string nullable | テーマCSSのパス   |
| settings   | json nullable   | 色、フォントなどの設定 |
| created_at | timestamp       | 作成日時        |
| updated_at | timestamp       | 更新日時        |

---

## feedbacks

公開されたサイトに対するコメント・フィードバックを管理するテーブル。

| column     | type            | note            |
| ---------- | --------------- | --------------- |
| id         | bigint          | 主キー             |
| site_id    | bigint          | sites.id への外部キー |
| name       | string nullable | コメント投稿者名        |
| email      | string nullable | メールアドレス         |
| comment    | text            | コメント内容          |
| created_at | timestamp       | 作成日時            |
| updated_at | timestamp       | 更新日時            |

---

## analytics

サイトの閲覧数などを管理するテーブル。

| column     | type            | note                   |
| ---------- | --------------- | ---------------------- |
| id         | bigint          | 主キー                    |
| site_id    | bigint          | sites.id への外部キー        |
| page_id    | bigint nullable | pages.id への外部キー        |
| event_type | string          | view / click / jump など |
| ip_address | string nullable | IPアドレス                 |
| user_agent | text nullable   | ブラウザ情報                 |
| created_at | timestamp       | 作成日時                   |

---

# 最初に実装するテーブル

6月中は以下のテーブルを優先する。

```text
users
sites
pages
blocks
media
```

---

# 後回しにするテーブル

以下は後半または余裕がある場合に実装する。

```text
themes
feedbacks
analytics
```

---

# 命名規則

## テーブル名

複数形のスネークケースを使用する。

例：

```text
users
sites
pages
blocks
media
themes
feedbacks
analytics
```

## カラム名

スネークケースを使用する。

例：

```text
user_id
site_id
page_id
file_path
created_at
updated_at
```

## 外部キー

関連するテーブル名の単数形 + `_id` を使用する。

例：

```text
user_id
site_id
page_id
theme_id
```

---

# 注意事項

* usersテーブルはLaravel Breezeの標準構成を利用する
* パスワードは必ずハッシュ化して保存する
* 画像や動画本体はDBに直接保存しない
* 画像や動画はstorageに保存し、DBにはパスのみ保存する
* pages.content は初期段階ではHTMLまたはJSONを保存してよい
* 将来的に細かく管理したい場合は blocks テーブルを中心にする
* クレジットカード情報は保存しない
* 決済機能は今回の初期実装では対象外とする

```
```
