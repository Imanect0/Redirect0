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

/// Endpoint for creating a shortened URL
pub async fn create_url(
	State(state): State<Arc<AppState>>,
	Json(payload): Json<CreateUrlRequest>,
) -> Result<Json<CreateUrlResponse>, ApiError> {
	// Basic validation of the URL
	if !payload.url.starts_with("http://") && !payload.url.starts_with("https://") {
		return Err(ApiError::BadRequest("The URL must start with http:// or https://".to_string()));
	}

	// Save the URL and get the shortened code
	let code = db::create_short_url(&state.db, &payload.url)
		.await
		.map_err(|e| ApiError::Database(e.to_string()))?;

	Ok(Json(CreateUrlResponse { code }))
}
