#用途
・現在のフォルダ構成と、どこを誰が触るかを書くファイル
以下記入例
# Worktree

## 基本構成

project/
├ app/
├ database/
├ public/
├ resources/
│  ├ css/
│  ├ js/
│  └ views/
├ routes/
├ tests/
└ docs/

## 主に編集する場所

### バックエンド担当
- app/Http/Controllers/
- app/Models/
- database/migrations/
- routes/web.php
- routes/api.php

### フロントエンド担当
- resources/views/
- resources/css/
- resources/js/

### テスト・資料担当
- tests/
- docs/
- README.md

## 触らない場所

- vendor/
- node_modules/
- public/build/
- storage/logs/