use axum::{
    extract::State,
    Json,
};
use std::sync::Arc;

use crate::{
    models::{CreateUrlRequest, CreateUrlResponse},
    state::AppState,
    utils::ApiError,
    db,
};

/// 短縮URL作成エンドポイント
pub async fn create_url(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<CreateUrlRequest>,
) -> Result<Json<CreateUrlResponse>, ApiError> {
    // URLの基本的なバリデーション
    if !payload.url.starts_with("http://") && !payload.url.starts_with("https://") {
        return Err(ApiError::BadRequest("URLはhttp://またはhttps://で始まる必要があります".to_string()));
    }

    // URLを保存して短縮コードを取得
    let code = db::create_short_url(&state.db, &payload.url)
        .await
        .map_err(|e| ApiError::Database(e.to_string()))?;

    Ok(Json(CreateUrlResponse { code }))
}
