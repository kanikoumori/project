#用途
Renderなど本番公開の手順・設定を書くファイル
# Deployment

## 目的

LaravelアプリをRenderへデプロイするための手順をまとめる。

## 本番環境

- Render
- PostgreSQL
- GitHub連携

## 環境変数

Render側で設定する予定：

```env
APP_NAME=CMS Project
APP_ENV=production
APP_DEBUG=false
APP_URL=本番URL

DB_CONNECTION=pgsql
DB_HOST=RenderのDBホスト
DB_PORT=5432
DB_DATABASE=RenderのDB名
DB_USERNAME=RenderのDBユーザー
DB_PASSWORD=RenderのDBパスワード