#用途
・会議記録、決定事項等を書く。
# 2026-05-28

## ファイル構成変更

### 変更者
ツグイ

### 内容

database/migrations/

↓

database/migrations/2026_06_04_012739_create_projects_table.php

を追加。

### 理由

マイグレーション作成

### 影響

不明

### 変更者
小野崎

### 内容

resources/css/

↓

resources/css/style_main.css

を追加。

### 理由

動作確認のため。

### 影響

無し

#記入例
# Meeting Log

## 2026-05-28

### 決定事項

- PostgreSQL使用
- React不使用
- Blade + Vanilla JS採用

### 担当

- A: ログイン
- B: エディタ
- C: DB
- D: UI
- E: README

### 次回まで

- editor画面作成
- migration整理

#記入例２ファイルの変更
# 2026-05-28

## フォルダ構成変更

### 変更者
フロントエンドB(変更した人の名前)

### 内容

resources/js/editor.js

↓

resources/js/editor/block-manager.js

へ変更。

### 理由

editor.js が肥大化したため、
ブロック管理機能を分離した。

### 影響

Blade側の import 修正必要。