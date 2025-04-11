use axum::{
    extract::{Path, State},
    http::{HeaderMap, Request},
    response::Redirect,
    BoxError,
};
use std::sync::Arc;
use tokio::task;
use lru::LruCache;
use std::num::NonZeroUsize;
use std::sync::Mutex;

use crate::{
    state::{AppState, BackgroundState},
    utils::{ApiError, extract_client_ip},
    db,
};

// Global LRU cache
lazy_static::lazy_static! {
    static ref URL_CACHE: Mutex<LruCache<String, String>> = {
        // Cache up to 1000 entries
        Mutex::new(LruCache::new(NonZeroUsize::new(1000).unwrap()))
    };
}

/// URL Redirect handler
pub async fn redirect(
    Path(id): Path<String>,
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    req: Request<axum::body::Body>,
) -> Result<Redirect, ApiError> {
    // Add debug log
    tracing::debug!("Redirect request: id={}", id);

    // Try to retrieve original URL from cache
    let original_url = {
        let mut cache = URL_CACHE.lock().unwrap();
        cache.get(&id).cloned()
    };

    // If not in cache, fetch from DB
    let original_url = match original_url {
        Some(url) => {
            tracing::debug!("Cache hit: id={}", id);
            url
        },
        None => {
            // Get original URL from DB
            let url = db::get_original_url(&state.db, &id)
                .await
                .map_err(|e| {
                    tracing::error!("Database error: {:?}", e);
                    ApiError::Database(e.to_string())
                })?
                .ok_or_else(|| {
                    tracing::error!("ID not found: {}", id);
                    ApiError::NotFound
                })?;

            // Add to cache
            {
                let mut cache = URL_CACHE.lock().unwrap();
                cache.put(id.clone(), url.clone());
            }

            url
        }
    };

    // Log access in background
    // Extract request info in background thread
    let bg_state = BackgroundState { db: state.db.clone() };
    let id_clone = id.clone();
    let headers_clone = headers.clone();
    let req_clone = req;

    task::spawn(async move {
        // Extract request information in background thread
        let ip = extract_client_ip(&req_clone);
        let user_agent = headers_clone
            .get("user-agent")
            .and_then(|h| h.to_str().ok())
            .map(String::from);
        let referer = headers_clone
            .get("referer")
            .and_then(|h| h.to_str().ok())
            .map(String::from);

        log_access_background(
            bg_state,
            id_clone,
            ip,
            user_agent,
            referer,
        ).await
    });

    // Redirect to original URL
    tracing::debug!("Redirecting to: {}", original_url);
    Ok(Redirect::to(&original_url))
}

/// Function to log access in background
async fn log_access_background(
    state: BackgroundState,
    short_code: String,
    ip: Option<String>,
    user_agent: Option<String>,
    referer: Option<String>,
) -> Result<(), BoxError> {
    db::log_access(
        &state.db,
        &short_code,
        ip.as_deref(),
        user_agent.as_deref(),
        referer.as_deref(),
    )
    .await?;

    Ok(())
}
