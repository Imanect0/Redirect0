# Redirect0 フロントエンド

短縮 URL サービス「Redirect0」のフロントエンドプロジェクトです。

## 技術スタック

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui (UI コンポーネント)
- Recharts (グラフ表示)

## 機能

- URL の短縮と共有
- 短縮 URL 一覧の表示
- アクセス統計の可視化
- 複数 URL の比較分析

## 開発環境セットアップ

```bash
# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 環境変数

`.env.local`ファイルに以下の環境変数を設定:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## ビルドと本番デプロイ

```bash
# ビルド
npm run build

# 本番サーバー起動
npm run start
```
