use axum::extract::FromRef;
use sqlx::{Pool, Postgres};
use std::sync::Arc;

/// アプリケーション状態を表す構造体
#[derive(Clone)]
pub struct AppState {
    pub db: Pool<Postgres>,
    pub cors_origin: String,
}

impl AppState {
    /// 新しいアプリケーション状態を作成
    pub fn new(db: Pool<Postgres>, cors_origin: String) -> Self {
        Self { db, cors_origin }
    }

    /// バックグラウンドタスク用の共有状態を作成
    pub fn into_background_state(self) -> BackgroundState {
        BackgroundState { db: self.db }
    }
}

/// バックグラウンドタスク用の状態
#[derive(Clone)]
pub struct BackgroundState {
    pub db: Pool<Postgres>,
}

impl FromRef<Arc<AppState>> for BackgroundState {
    fn from_ref(state: &Arc<AppState>) -> Self {
        BackgroundState {
            db: state.db.clone(),
        }
    }
}
