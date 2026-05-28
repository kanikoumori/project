#用途
・DB設計書を書く。テーブル構造の管理。

#記入例
# Database Design

## users

| column | type | note |
|---|---|---|
| id | bigint | PK |
| name | string | ユーザー名 |
| email | string | メール |
| password | string | ハッシュ |

---

## sites

| column | type | note |
|---|---|---|
| id | bigint | PK |
| user_id | bigint | users FK |
| title | string | サイト名 |
| created_at | timestamp | 作成日 |

---

## pages

| column | type | note |
|---|---|---|
| id | bigint | PK |
| site_id | bigint | sites FK |
| title | string | ページ名 |
| content | text | HTML保存 |