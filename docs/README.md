# Docs README

## 目的

このフォルダは、本プロジェクトの設計資料・運用ルール・開発ドキュメントを管理するためのものです。

新規参加者はまずこのファイルを確認し、必要な設計書を参照してください。

---

# ドキュメント一覧

## requirements.md

プロジェクトの要件定義書。

記載内容：

* プロジェクト概要
* 開発目的
* 必要機能
* 非機能要件

---

## database-design.md

データベース設計書。

記載内容：

* ER図
* テーブル一覧
* カラム定義
* リレーション設計

主な対象：

* バックエンド担当
* プロジェクトリーダー

---

## api-design.md

API設計書。

記載内容：

* API一覧
* リクエスト例
* レスポンス例
* 実装優先度
* Phase2対応項目

主な対象：

* バックエンド担当
* フロントエンド担当

---

## frontend-api-guide.md

フロントエンド向けAPI利用ガイド。

記載内容：

* API呼び出し方法
* fetchサンプル
* 取得データ形式

主な対象：

* フロントエンド担当

---

## coding-rules.md

コーディング規約。

記載内容：

* 命名ルール
* フォルダルール
* GitHubルール
* Laravelルール
* AI利用ルール

全メンバー必読。

---

## git-rules.md

GitHub運用ルール。

記載内容：

* ブランチ運用
* Pull Request運用
* develop運用
* コミットルール

全メンバー必読。

---

## deployment.md

デプロイ手順書。

記載内容：

* Render設定
* PostgreSQL設定
* 本番環境設定
* デプロイ手順

主な対象：

* プロジェクトリーダー
* デプロイ担当

---

## worktree.md

ディレクトリ構成書。

記載内容：

* フォルダ構成
* 担当範囲
* 編集禁止場所
* 衝突しやすいファイル

新規参加者向け。

---

## meeting-log.md

ミーティング記録。

記載内容：

* 決定事項
* 課題
* 担当割り当て
* 次回までの作業

---

# ドキュメント更新ルール

以下に該当する場合は関連ドキュメントを更新する。

| 変更内容       | 更新するファイル           |
| ---------- | ------------------ |
| DB変更       | database-design.md |
| API追加・変更   | api-design.md      |
| Git運用変更    | git-rules.md       |
| コーディング規約変更 | coding-rules.md    |
| デプロイ手順変更   | deployment.md      |
| フォルダ構成変更   | worktree.md        |
| 要件変更       | requirements.md    |

---

# 優先して読む資料

## 全メンバー

1. requirements.md
2. git-rules.md
3. coding-rules.md

## バックエンド担当

1. database-design.md
2. api-design.md
3. frontend-api-guide.md

## フロントエンド担当

1. api-design.md
2. frontend-api-guide.md
3. worktree.md

## プロジェクトリーダー

すべて確認すること。
