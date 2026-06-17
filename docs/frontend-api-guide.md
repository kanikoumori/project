📘 Page / Block / 使用テーブル: page_histories 仕様書（整理版）
■ Page API
📄 ページ一覧取得
GET /sites/{site}/pages
📄 ページ作成
POST /sites/{site}/pages
📄 ページ詳細取得
GET /pages/{page}
■ Block API
📦 ブロック一覧取得
GET /pages/{page}/blocks
📦 ブロック作成
POST /pages/{page}/blocks
Request
{
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
  "sort_order": 1,
  "created_at": "2026-06-08T10:00:00Z",
  "updated_at": "2026-06-08T10:00:00Z"
}
■ History / Autosave API
💾 オートセーブ（スナップショット保存）
POST /pages/{page}/autosave
説明
Page + Block全体をスナップショットとして保存する
snapshot = {
  page: Pageテーブルの全カラム,
  blocks: sort_order順で全取得
  blocksは sort_order 昇順で必ず固定ソートして保存
}
Response
{
  "message": "Autosaved successfully",
  "history_id": 1
}
補足
Page + Blocks を丸ごと保存
sort_order 順で保存
時系列で履歴蓄積
📦 ブロック更新
PUT /blocks/{block}

Request
{
  "data": {
    "content": "更新後テキスト"
  }
}
Response
{
  "message": "Block updated successfully"
}
📦 ブロック削除
DELETE /blocks/{block}

Response
{
  "message": "Block deleted successfully"
}

📜 履歴一覧取得
GET /pages/{page}/histories
Response
[
  {
    "id": 1,
    "page_id": 1,
    "snapshot": {
      "page": {
        "id": 1,
        "title": "トップページ",
        "slug": "home",
        "status": "draft"
      },
      "blocks": [
        {
          "id": 1,
          "type": "text",
          "data": {
            "content": "こんにちは"
          },
          "sort_order": 1
        }
      ]
    },
    "created_at": "2026-06-08T10:00:00Z"
  }
]
補足
最新順（desc）
タイムラインUI向け
typeは enum 管理前提
利用可能type

- text
- heading
- image
- video
- button
- divider
type追加時は後方互換を維持する
🔁 履歴復元
POST /histories/{history}/restore
説明
指定履歴の snapshot で Page + Blocks を完全復元
restore後の状態（復元結果）も autosave と同等のsnapshotとして保存する
restore実行後、
復元結果を新しいHistoryとして保存する
Response
{
  "message": "History restored successfully"
}
処理内容
Page情報をsnapshotに更新
現在Blocksを全削除
snapshot blocks を再生成
注意
完全上書き（Undo系の中核）
所有者以外は403
🔐 認可ルール
Site：所有ユーザーのみ
Page：Site所有者のみ
Block：Page → Site所有者のみ
History：Page → Site所有者のみ
Policy対応
autosave → PagePolicy@update
histories → PagePolicy@view
restore → PageHistoryPolicy@restore
⚠️ 共通ルール
Blockデータは data(JSON) カラムに保存する
ブロック種別ごとに data の構造は異なる
page_id は必ずログインユーザーのSite配下のみ
全レスポンスに created_at / updated_at
認可エラー：403 Forbidden
バリデーションエラー：422 Unprocessable Entity
💡 設計ポイント（重要）
Autosave
編集中の「途中保存」
推奨頻度:
30秒ごと
または編集停止後3秒
History
編集履歴の可視化
UIはタイムライン推奨
Restore
undo機能の基盤
将来的に「差分復元」に拡張可能
🚀 今後追加予定
PUT /pages/{page}/blocks/reorder
POST /pages/{page}/publish
DELETE /histories/{history}（履歴整理用）
