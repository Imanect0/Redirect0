use axum::extract::FromRef;
use sqlx::{Pool, Postgres};
use std::sync::Arc;

/// Structure representing the application state
#[derive(Clone)]
pub struct AppState {
    pub db: Pool<Postgres>,
    pub cors_origin: String,
}

impl AppState {
    /// Create a new application state
    pub fn new(db: Pool<Postgres>, cors_origin: String) -> Self {
        Self { db, cors_origin }
    }

    /// Create a shared state for background tasks
    pub fn into_background_state(self) -> BackgroundState {
        BackgroundState { db: self.db }
    }
}

/// State for background tasks
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
