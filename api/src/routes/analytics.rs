use axum::{
    extract::{Query, State},
    Json,
};
use std::sync::Arc;

use crate::{
    db,
    models::{AnalyticsQuery, AnalyticsResponse, UrlHistoryItem},
    state::AppState,
    utils::{parse_range_days, ApiError},
};

/// 短縮URL履歴を取得するエンドポイント
pub async fn get_history(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<UrlHistoryItem>>, ApiError> {
    let history = db::get_url_history(&state.db)
        .await
        .map_err(|e| ApiError::Database(e.to_string()))?;

    Ok(Json(history))
}

/// 短縮URLのアクセス統計を取得するエンドポイント
pub async fn get_analytics(
    State(state): State<Arc<AppState>>,
    Query(query): Query<AnalyticsQuery>,
) -> Result<Json<AnalyticsResponse>, ApiError> {
    // コードをカンマで分割
    let codes: Vec<String> = query
        .codes
        .split(',')
        .map(|s| s.trim().to_string())
        .collect();

    if codes.is_empty() {
        return Err(ApiError::BadRequest(
            "少なくとも1つのコードを指定してください".to_string(),
        ));
    }

    // 範囲を日数に変換
    let days = parse_range_days(query.range);

    // アナリティクスデータを取得
    let stats = db::get_analytics(&state.db, &codes, days)
        .await
        .map_err(|e| ApiError::Database(e.to_string()))?;

    Ok(Json(AnalyticsResponse { stats }))
}
