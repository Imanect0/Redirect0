use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// URL shortening request
#[derive(Debug, Deserialize)]
pub struct CreateUrlRequest {
    pub url: String,
}

/// URL shortening response
#[derive(Debug, Serialize)]
pub struct CreateUrlResponse {
    pub code: String,
}

/// Shortened URL entry in DB
#[derive(Debug, Serialize, Deserialize)]
pub struct ShortUrl {
    pub id: String,
    pub original_url: String,
    pub created_at: DateTime<Utc>,
}

/// Access log entry
#[derive(Debug, Serialize, Deserialize)]
pub struct AccessLog {
    pub id: i32,
    pub short_code: String,
    pub ip: Option<String>,
    pub user_agent: Option<String>,
    pub referer: Option<String>,
    pub accessed_at: DateTime<Utc>,
}

/// History API response
#[derive(Debug, Serialize)]
pub struct UrlHistoryItem {
    pub code: String,
    pub original_url: String,
    pub created_at: DateTime<Utc>, // Added creation date
    pub click_count: i64,
    pub last_accessed_at: Option<DateTime<Utc>>,
}

/// Daily access statistics
#[derive(Debug, Serialize)]
pub struct DailyStats {
    pub date: String,
    pub count: i64,
}

/// Analytics API request query
#[derive(Debug, Deserialize)]
pub struct AnalyticsQuery {
    pub codes: String,         // Comma-separated codes
    pub range: Option<String>, // Example: "7d" (7 days)
}

/// Analytics API response
#[derive(Debug, Serialize)]
pub struct AnalyticsResponse {
    #[serde(flatten)]
    pub stats: std::collections::HashMap<String, Vec<DailyStats>>,
}
