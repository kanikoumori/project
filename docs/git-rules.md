# Git Rules

## 目的

本プロジェクトのGit/GitHub運用ルールを定義する。

全メンバーは作業開始前に必ず確認すること。

---

# よく使用するコマンド集

git commit -m "コメント"　#コメント付きでコミット
git checkout -- ファイル名　#間違って変更してしまったときもとに、戻す
git branch -m (ブランチ名) #ブランチ名変更
git branch -d (ブランチ名) #ブランチ削除
git branch -D               #強制削除
git merge origin/master #変更履歴をマージする
git switch （ブランチ名）#ブランチの切替
git checkout　（ブランチ名）#ブランチの切替2
git fetch #プルリクエスト
git log– oneline #更新などのログがわかる
git commit #変更を記録する
git commit -v　#変更点を見れる
git status #変更されたファイル
git push origin <ブランチ名>　＃githubへプッシュ
git switch -c <変更していくフォルダ名>　#新規ブランチ作成
#データごとfeatureブランチを削除する一連の手順
git checkout main
git reset --hard
git clean -fd
git branch -D
git switch -c ブランチ名
---

# 基本ルール

* mainへの直接push禁止
* developへの直接push禁止
* 必ずfeatureブランチを作成して作業する
* Pull Request経由でdevelopへ統合する
* 他人の担当機能を無断で変更しない
* .envは絶対にpushしない
* vendor/はpushしない
* node_modules/はpushしない
* composer.lockは削除しない
* package-lock.jsonは削除しない

---

# ブランチ構成

```text
main
└─ develop
   ├─ feature/auth
   ├─ feature/editor
   ├─ feature/autosave
   ├─ feature/preview
   ├─ feature/theme
   └─ feature/analytics
```

---

# ブランチ命名規則

機能追加

```text
feature/機能名
```

例

```text
feature/auth
feature/editor
feature/autosave
feature/preview
feature/theme
```

不具合修正

```text
fix/修正内容
```

例

```text
fix/login-error
fix/save-bug
```

ドキュメント修正

```text
docs/内容
```

例

```text
docs/update-readme
docs/git-rules
```

---

# 作業開始手順

```bash
git checkout develop
git pull origin develop

git checkout -b feature/作業名
```

例

```bash
git checkout -b feature/editor
```

---

# 作業終了手順

```bash
git add .
git commit -m "機能名: 内容"
git push origin feature/作業名
```

その後Pull Requestを作成する。

---

# 共有ファイルの扱い

以下のファイルは衝突しやすいため変更時は必ず共有すること。

```text
routes/web.php
routes/api.php
database/migrations/
.env.example
composer.json
composer.lock
package.json
package-lock.json
vite.config.js
```

変更する場合は事前にプロジェクトリーダーへ報告する。

---

# Laravel Breeze運用ルール

Laravel Breezeは既に導入済み。

以下のコマンドは担当者以外実行禁止。

```bash
composer require laravel/breeze --dev
php artisan breeze:install
```

他メンバーは以下のみ実行する。

```bash
git pull
composer install
npm install
php artisan migrate
```

---

# Composer運用ルール

新しいライブラリ追加は禁止。

追加が必要な場合は必ず相談すること。

以下を変更した場合は共有する。

```text
composer.json
composer.lock
package.json
package-lock.json
```

---

# コミットメッセージ規則

例

```text
feat: editor save function
feat: add preview page

fix: login bug
fix: autosave error

docs: update git rules
docs: update database design
```

---

# 緊急時

誤ってファイルを変更した場合

```bash
git restore .
```

特定ファイルのみ戻す場合

```bash
git restore ファイル名
```

現在の状態確認

```bash
git status
```
