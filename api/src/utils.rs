use axum::{
    http::{Request, StatusCode},
    response::{IntoResponse, Response},
};
use thiserror::Error;

/// APIエラー型
#[derive(Error, Debug)]
pub enum ApiError {
    #[error("データベースエラー: {0}")]
    Database(String),

    #[error("リソースが見つかりません")]
    NotFound,

    #[error("無効なリクエスト: {0}")]
    BadRequest(String),

    #[error("内部サーバーエラー: {0}")]
    Internal(String),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            ApiError::Database(ref e) => (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()),
            ApiError::NotFound => (StatusCode::NOT_FOUND, "リソースが見つかりません".to_string()),
            ApiError::BadRequest(ref msg) => (StatusCode::BAD_REQUEST, msg.clone()),
            ApiError::Internal(ref msg) => (StatusCode::INTERNAL_SERVER_ERROR, msg.clone()),
        };

        let body = serde_json::json!({
            "error": error_message
        });

        (status, axum::Json(body)).into_response()
    }
}

/// リクエストからIPアドレスを抽出
pub fn extract_client_ip<B>(req: &Request<B>) -> Option<String> {
    req.headers()
        .get("x-forwarded-for")
        .and_then(|h| h.to_str().ok())
        .map(|s| s.split(',').next().unwrap_or(s).trim().to_string())
        .or_else(|| {
            req.extensions()
                .get::<axum::extract::ConnectInfo<std::net::SocketAddr>>()
                .map(|connect_info| connect_info.0.ip().to_string())
        })
}

/// レンジクエリから日数を解析
pub fn parse_range_days(range: Option<String>) -> i64 {
    match range {
        Some(r) if r.ends_with('d') => {
            r.trim_end_matches('d')
                .parse::<i64>()
                .unwrap_or(7)
        }
        _ => 7, // デフォルトは7日間
    }
}
