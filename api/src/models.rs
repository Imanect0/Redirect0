use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

/// 短縮URL作成リクエスト
#[derive(Debug, Deserialize)]
pub struct CreateUrlRequest {
    pub url: String,
}

/// 短縮URL作成レスポンス
#[derive(Debug, Serialize)]
pub struct CreateUrlResponse {
    pub code: String,
}

/// DB内の短縮URLエントリ
#[derive(Debug, Serialize, Deserialize)]
pub struct ShortUrl {
    pub id: String,
    pub original_url: String,
    pub created_at: DateTime<Utc>,
}

/// アクセスログエントリ
#[derive(Debug, Serialize, Deserialize)]
pub struct AccessLog {
    pub id: i32,
    pub short_code: String,
    pub ip: Option<String>,
    pub user_agent: Option<String>,
    pub referer: Option<String>,
    pub accessed_at: DateTime<Utc>,
}

/// 履歴API用レスポンス
#[derive(Debug, Serialize)]
pub struct UrlHistoryItem {
    pub code: String,
    pub original_url: String,
    pub created_at: DateTime<Utc>, // 生成日時を追加
    pub click_count: i64,
    pub last_accessed_at: Option<DateTime<Utc>>,
}

/// 日付ごとのアクセス統計
#[derive(Debug, Serialize)]
pub struct DailyStats {
    pub date: String,
    pub count: i64,
}

/// アナリティクスAPI用リクエストクエリ
#[derive(Debug, Deserialize)]
pub struct AnalyticsQuery {
    pub codes: String, // カンマ区切りのコード
    pub range: Option<String>, // 例: "7d" (7日間)
}

/// アナリティクスAPI用レスポンス
#[derive(Debug, Serialize)]
pub struct AnalyticsResponse {
    #[serde(flatten)]
    pub stats: std::collections::HashMap<String, Vec<DailyStats>>,
}
