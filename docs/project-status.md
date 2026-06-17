# Project Status

## 目的

CMS開発の現在の進捗、実装済み機能、未実装機能、次にやることを整理する。

---

## 実装済み

### 認証

- Laravel Breeze 導入済み
- ログイン
- 新規登録
- ログアウト
- プロフィール編集
- 日本語化対応

### Site

- Siteモデル
- SiteController
- サイト作成
- サイト一覧取得
- SitePolicy

### Page

- Pageモデル
- PageController
- ページ作成
- ページ一覧取得
- ページ詳細取得
- ページ更新
- ページ削除
- PagePolicy

### Block

- Blockモデル
- BlockController
- ブロック作成
- ブロック一覧取得
- ブロック更新
- ブロック削除
- ブロック並び替え
- BlockPolicy

### Dashboard UI

- ダッシュボード画面
- サイト管理画面
- 分析画面
- 設定画面
- 新規サイト作成モーダル

### Editor UI

- ツールバー
- サイドバー
- Canvas
- プロパティパネル
- ブロック追加UI
- 選択時ハイライト

### History

- PageHistoryモデル
- 自動保存API
- 履歴一覧取得
- 履歴復元

---

## 実装中・接続予定

- Dashboardに実データを表示
- Site一覧の動的表示
- Page管理画面とPageControllerの接続
- 新規ページ作成フォームとpages.storeの接続
- 編集ボタンとeditor.showの接続
- 削除ボタンとpages.destroyの接続
- Editor画面とBlock APIの接続

---

## 未実装

- ドラッグ＆ドロップUI
- autosaveのリアルタイム化
- 公開機能
- プレビュー機能
- テーマ切り替え
- 画像アップロード
- アクセス解析
- フィードバック機能

---

## 現在の重要課題

1. Dashboard / Site / Page の画面とAPIを接続する
2. Editor UI と Block API を接続する
3. 保存・自動保存の動作確認をする
4. 公開・プレビュー機能に進む

---

## PRレビュー時の確認項目

- `php artisan route:list` が通る
- `/dashboard` が開ける
- `/dashboard/sites` が開ける
- `/pages` が開ける
- `/editor/{page}` が開ける
- 500エラーが出ない
- profile系ルートが消えていない
- auth配下に必要なルートがある
- `.env` が含まれていない
- `vendor/` と `node_modules/` が含まれていない