Page API 利用書
ページ一覧取得
URL
GET /sites/{site}/pages
Response
[
  {
    "id": 1,
    "site_id": 1,
    "title": "トップページ",
    "slug": "home",
    "sort_order": 0,
    "is_home": false,
    "status": "draft"
  }
]
ページ作成
URL
POST /sites/{site}/pages
Request
{
  "title": "トップページ",
  "slug": "home"
}
Response
{
  "id": 1,
  "site_id": 1,
  "title": "トップページ",
  "slug": "home",
  "status": "draft"
}
ページ詳細取得
URL
GET /pages/{page}
Response
{
  "id": 1,
  "site_id": 1,
  "title": "トップページ",
  "slug": "home",
  "status": "draft"
}
 
 
Block API 利用書
ブロック一覧取得
URL
GET /pages/{page}/blocks
Response
[
  {
    "id": 1,
    "page_id": 1,
    "type": "text",
    "data": {
      "content": "こんにちは"
    },
    "sort_order": 1
  }
]
ブロック作成
URL
POST /blocks
Request
{
  "page_id": 1,
  "type": "text",
  "data": {
    "content": "こんにちは"
  },
  "sort_order": 1
}
Response
{
  "id": 1,
  "page_id": 1,
  "type": "text",
  "data": {
    "content": "こんにちは"
  },
  "sort_order": 1
}
 
 