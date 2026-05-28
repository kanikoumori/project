#用途
・GitHubの運用ルールを書くファイル
# Git Rules

## 基本ルール

- main直push禁止
- 必ずfeatureブランチを作成する
- 作業後はPull Requestを作成する
- 他人の作業ファイルを勝手に変更しない
- .env は絶対にpushしない
- vendor/ と node_modules/ はpushしない

## ブランチ名

例：

- feature/auth
- feature/editor-ui
- feature/autosave
- feature/preview
- fix/login-error
- docs/update-readme

## 作業開始時

```bash
git pull origin main
git checkout -b feature/作業名

## 作業保存

git add .
git commit -m "feat: ログイン画面を追加"
git push origin feature/作業名