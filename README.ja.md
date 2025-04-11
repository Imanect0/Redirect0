# Redirect0 - URL 短縮＆分析プラットフォーム

Redirect0 は、詳細な分析機能を備えた自己ホスト型の URL 短縮サービスで、A/B テストとパフォーマンス追跡用に設計されています。

## ✨ 特徴

- 短く覚えやすい URL を作成
- 詳細な分析機能でクリック数を追跡
- 複数の短縮 URL のパフォーマンスを比較
- 同じターゲット URL に対して異なる ID を使用した A/B テストをサポート
- 自己ホスト型でプライバシーに配慮
- Docker ベースの構成で簡単セットアップ

## 🚀 技術スタック

### バックエンド

- Axum Web フレームワークを使用した Rust
- PostgreSQL データベース
- Tokio による非同期処理

### フロントエンド

- TypeScript を使用した Next.js
- スタイリングに Tailwind CSS
- UI コンポーネントに shadcn/ui
- 分析グラフの可視化に Recharts

## 📋 前提条件

- Docker と Docker Compose
- Make（オプション、提供されている Makefile を使用する場合）

## 🛠️ クイックスタート

1. リポジトリをクローン：

```bash
git clone https://github.com/yourusername/redirect0.git
cd redirect0
```

2. アプリケーションを起動：

```bash
make up
```

3. アプリケーションにアクセス：
   - フロントエンド: http://localhost:80
   - API: http://localhost:80/api

## 📊 使用方法

### 短縮 URL の作成

1. ホームページにアクセス
2. 短縮したい URL を入力
3. 「短縮する」をクリックして短縮 URL を生成
4. 短縮 URL をコピーして共有

### 分析の閲覧

1. 「履歴」ページで短縮 URL の一覧を確認
2. 任意の URL の「分析」をクリックしてパフォーマンス指標を表示
3. 「分析」ページでドロップダウンから複数の URL を選択して比較

## 🔧 設定

`.env`ファイルまたは`docker-compose.yml`ファイルの環境変数を編集してカスタマイズ：

- データベース設定
- ポート設定
- CORS 設定
- ログレベル

## 📚 API ドキュメント

Redirect0 API は以下のエンドポイントを提供：

- 短縮 URL の作成: `POST /api/create`
- URL 履歴の取得: `GET /api/history`
- 分析データの取得: `GET /api/analytics?codes=code1,code2&range=7d`
- リダイレクト処理: `GET /:code`

## 🐳 Docker コマンド

```bash
# 全サービスを起動
make up

# 全サービスを停止
make down

# ログを表示
make logs

# サービスを再ビルド
make rebuild

# ボリュームとコンテナをクリーンアップ
make clean
```

## 🌱 開発環境

開発環境のセットアップ：

1. Rust と Node.js をインストール
2. `db/init.sql`を使用してデータベースをセットアップ
3. バックエンドを実行: `cd api && cargo run`
4. フロントエンドを実行: `cd frontend && npm run dev`

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 👥 コントリビューション

貢献は歓迎します！お気軽にプルリクエストを送信してください。

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
