#用途
・プロジェクト説明書。GitHubで最初に見る場所

#記入例

# CMS Project

専門学校卒業研究用CMSアプリケーション

## 使用技術

- Laravel 12
- PostgreSQL
- Vite
- Blade
- Vanilla JavaScript

## 環境構築

```bash
git clone URL
cd project

composer install
npm install

cp .env.example .env

php artisan key:generate
php artisan migrate

npm run dev
php artisan serve

#起動
Laravel:http://127.0.0.1:8000

---

# `requirements.md`

## 役割

```txt id="7"
要件定義