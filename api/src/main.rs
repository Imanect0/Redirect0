mod db;
mod models;
mod routes;
mod state;
mod utils;

use axum::{
    http::{header, HeaderValue, Method},
    routing::{get, post},
    Router,
};
use dotenv::dotenv;
use std::{env, net::SocketAddr, sync::Arc};
use tower_http::cors::CorsLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use routes::{create_url, get_analytics, get_history, redirect};
use state::AppState;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load environment variables
    dotenv().ok();

    // Initialize logger
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            env::var("RUST_LOG").unwrap_or_else(|_| "info".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Database connection
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let db_pool = db::create_pool(&database_url).await?;

    // CORS configuration
    let cors_origin = env::var("CORS_ORIGIN").unwrap_or_else(|_| "http://localhost".to_string());
    let cors = CorsLayer::new()
        .allow_origin(cors_origin.parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE])
        .allow_credentials(true);

    // Application state
    let state = Arc::new(AppState::new(db_pool, cors_origin));

    // Router configuration
    let app = Router::new()
        .route("/create", post(create_url))
        .route("/history", get(get_history))
        .route("/analytics", get(get_analytics))
        .route("/:id", get(redirect)) // <- This is the shortened URL redirect handler
        .layer(cors)
        .with_state(state);

    // Start server
    let port = env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse::<u16>()?;

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    tracing::info!("Listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
