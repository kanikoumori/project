# Nodeでフロントエンドをビルド
FROM node:22-alpine AS node-build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# PHP + Apache
FROM php:8.2-apache

WORKDIR /var/www/html

# 必要なパッケージとPHP拡張をインストール
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && a2enmod rewrite \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ApacheのDocumentRootをLaravelのpublicに変更
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Composerをコピー
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Laravel本体をコピー
COPY . .

# 開発用Vite hotファイルが残っていたら削除
RUN rm -f public/hot
# Viteでビルドした成果物をコピー
COPY --from=node-build /app/public/build ./public/build

# Laravelの依存関係をインストール
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 権限設定
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# 起動スクリプトをコピー
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]