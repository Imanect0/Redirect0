FROM rust:latest as builder

WORKDIR /usr/src/app
COPY . .

# ホストのアーキテクチャに合わせてビルド
RUN cargo build --release

# 同じOSだが最新のベースイメージを使用して互換性を確保
FROM debian:bookworm-slim

WORKDIR /app

# 必要なランタイム依存関係をインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ビルドしたバイナリをコピー
COPY --from=builder /usr/src/app/target/release/redirect-api /app/redirect-api
COPY --from=builder /usr/src/app/.env.example /app/.env

# 8080ポートを公開
EXPOSE 8080

# 環境変数設定
ENV RUST_LOG=info

# エントリポイント設定
ENTRYPOINT ["/app/redirect-api"]
