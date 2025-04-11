.PHONY: up down build rebuild logs clean

# 全サービスをビルドして起動
up:
	docker-compose up -d

# ビルドして起動（デタッチモードなし）
upv:
	docker-compose up

# サービスをビルド
build:
	docker-compose build

# サービスを再ビルド
rebuild:
	docker-compose build --no-cache

# サービスを停止
down:
	docker-compose down

# ログを表示
logs:
	docker-compose logs -f

# ボリュームを含めてクリーンアップ
clean:
	docker-compose down -v
	docker-compose rm -f

# APIコンテナ内でコマンド実行
api-exec:
	docker-compose exec api /bin/bash

# フロントエンドコンテナ内でコマンド実行
frontend-exec:
	docker-compose exec frontend /bin/sh

# データベースコンテナでPostgreSQLに接続
db-connect:
	docker-compose exec db psql -U postgres -d redirect_db
