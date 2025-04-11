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

/// Endpoint to retrieve the history of shortened URLs
pub async fn get_history(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<UrlHistoryItem>>, ApiError> {
    let history = db::get_url_history(&state.db)
        .await
        .map_err(|e| ApiError::Database(e.to_string()))?;

    Ok(Json(history))
}

/// Endpoint to retrieve access statistics for shortened URLs
pub async fn get_analytics(
    State(state): State<Arc<AppState>>,
    Query(query): Query<AnalyticsQuery>,
) -> Result<Json<AnalyticsResponse>, ApiError> {
    // Split codes by commas
    let codes: Vec<String> = query
        .codes
        .split(',')
        .map(|s| s.trim().to_string())
        .collect();

    if codes.is_empty() {
        return Err(ApiError::BadRequest(
            "Please specify at least one code.".to_string(),
        ));
    }

    // Convert range to days
    let days = parse_range_days(query.range);

    // Retrieve analytics data
    let stats = db::get_analytics(&state.db, &codes, days)
        .await
        .map_err(|e| ApiError::Database(e.to_string()))?;

    Ok(Json(AnalyticsResponse { stats }))
}
