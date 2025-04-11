FROM node:18-alpine AS base

# 依存関係のインストール
FROM base AS deps
WORKDIR /app

COPY package.json ./
# package-lock.jsonがない場合でも失敗しないように通常のnpm installを使用
RUN npm install

# ビルド
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境変数を設定 - この値をlocalhostに変更
ENV NEXT_PUBLIC_API_URL=http://localhost:8081

# publicディレクトリが存在しない場合は作成
RUN mkdir -p public
RUN npm run build

# 本番用イメージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# publicディレクトリが存在しない場合に備えて事前に作成
RUN mkdir -p public
COPY --from=builder /app/public ./public

# 静的ファイルとビルド成果物をコピー
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
