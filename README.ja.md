# Redirect0 - URL短縮＆分析プラットフォーム

Redirect0は、A/Bテスト、コンテンツ最適化、URLパフォーマンスの包括的な追跡のために設計された、高度な分析機能を備えたセルフホスト型URL短縮サービスです。



https://github.com/user-attachments/assets/8b615fef-48d8-4ca1-943d-30e0339dc8ad



**[English README](./README.md)**

## ✨ 機能

### 主要機能
- 短く記憶しやすいURLの作成
- 詳細な分析による訪問指標の追跡
- 複数の短縮URLのパフォーマンス比較
- 同一ターゲットURLに対する異なるIDによるA/Bテストのサポート
- セルフホスト型でプライバシーに配慮
- Dockerベースの簡単なデプロイメント

### 高度な機能（今後予定）
- **プロジェクト管理とコラボレーション**
  - チームメンバーと複数のプロジェクトを作成・管理
  - カスタマイズ可能な権限を持つチーム招待システム
  - チーム内での共有分析ダッシュボード

- **AI搭載の分析機能**
  - **ターゲットオーディエンス分析**: コンテンツに最適な視聴者に関する洞察
  - **コンテンツ要約**: リンク先コンテンツの自動要約によるクイックリファレンス
  - **自然言語クエリ**: 「先週最もパフォーマンスの良かったリンクは？」などの質問を平易な言葉で
  - **スマートA/Bテスト**: AIによるテストアプローチの提案と自動結果分析
  - **コンバージョン予測**: 機械学習ベースのコンバージョン確率予測
  - **自動タグ付け＆カテゴリ分類**: コンテンツを認識したURL分類

- **強化されたトラッキング**
  - 高度なJavaScriptベースの訪問者追跡
  - 時間ベースの分析（時間別、日別、週別ビュー）
  - ユーザー行動とエンゲージメント指標
  - 地理的およびデバイス固有のインサイト

- **インテリジェントなレポート機能**
  - 異なるステークホルダー向けのパーソナライズされたレポート
  - スケジュールされたレポート生成と配信
  - データ駆動型の最適化のための推奨事項

## 🚀 技術スタック

### バックエンド
- Axum WebフレームワークによるRust
- PostgreSQLデータベース
- Tokioによる非同期処理
- AIモデル統合のためのMCPサーバー

### フロントエンド
- TypeScriptによるNext.js
- スタイリングにTailwind CSS
- UIコンポーネントにshadcn/ui
- 分析の可視化にRecharts

## 📋 必要条件

- DockerとDocker Compose

## 🛠️ クイックスタート

1. リポジトリをクローン:

```bash
git clone https://github.com/yourusername/redirect0.git
cd redirect0
```

2. アプリケーションを起動:

```bash
docker compose up -d
```

3. アプリケーションにアクセス:
   - フロントエンド: http://localhost
   - API: http://localhost/api

## 📊 使用方法

### 短いURLの作成

1. ホームページに移動
2. 短縮したいURLを入力
3. 「短縮」をクリックして短いURLを生成
4. 短縮URLをコピーして共有

### 分析の表示

1. 「履歴」ページで全ての短縮URLを確認
2. 任意のURLの「分析」をクリックしてパフォーマンス指標を表示
3. 「分析」ページでドロップダウンから複数のURLを選択して比較

## 🔧 設定

`.env`ファイルまたは`docker-compose.yml`ファイルの環境変数を編集してカスタマイズ:

- データベース設定
- ポート構成
- CORS設定
- ロギングレベル
- AIモデル接続（MCP用）

## 📚 APIドキュメント

Redirect0 APIは以下のエンドポイントを提供:

- 短縮URL作成: `POST /api/create`
- URL履歴の取得: `GET /api/history`
- 分析データの取得: `GET /api/analytics?codes=code1,code2&range=7d`
- リダイレクト処理: `GET /:code`
- チーム管理: `POST /api/teams`
- AIインサイト: `POST /api/insights`
- MCP接続: `POST /api/mcp/connect`

## 🌱 開発

開発環境のセットアップ:

1. RustとNode.jsをインストール
2. `db/init.sql`を使用してデータベースをセットアップ
3. バックエンドの実行: `cd api && cargo run`
4. フロントエンドの実行: `cd frontend && npm run dev`

## 📄 ライセンス

このプロジェクトはGNU Affero General Public License v3（AGPL-3.0）の下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルをご覧ください。

### 商用ライセンス

AGPL-3.0の要件が適さない商用ユースケースでは、商用ライセンスが利用可能です。詳細は[COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md)をご覧ください。

## 👥 貢献

貢献は大歓迎です！ プルリクエストを自由に提出してください。

1. リポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを開く

## 🗺️ ロードマップ

上記の高度な機能の実装に積極的に取り組んでいます。現在の開発状況と今後のリリースについては、[GitHub Projects](https://github.com/yourusername/redirect0/projects)ページをご確認ください。

- 2025年Q2: プロジェクト管理とコラボレーション機能
- 2025年Q3: MCP統合とAI搭載分析機能
- 2025年Q4: 強化されたトラッキングとインテリジェントなレポート機能

