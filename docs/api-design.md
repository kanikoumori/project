#用途
・API仕様を書く。フロントとバックエンドのデータの受け渡しを定義する。
#記入例
# API Design

## ログイン

POST /api/login

### request

{
  "email": "test@test.com",
  "password": "password"
}

### response

{
  "token": "xxxxx",
  "user": {
    "id": 1,
    "name": "test"
  }
}

---

## ページ保存

POST /api/pages/save

### request

{
  "page_id": 1,
  "content": "<div>Hello</div>"
}

### response

{
  "success": true
}