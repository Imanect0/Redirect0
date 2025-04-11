use anyhow::Result;
use chrono::{Duration, Utc};
use sqlx::{postgres::PgPoolOptions, Pool, Postgres, Row};
use std::collections::HashMap;

use crate::models::{DailyStats, UrlHistoryItem};

/// Create database connection pool
pub async fn create_pool(database_url: &str) -> Result<Pool<Postgres>> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await?;

    Ok(pool)
}

/// Create shortened URL
pub async fn create_short_url(pool: &Pool<Postgres>, url: &str) -> Result<String> {
    // Use a simple query to get ID
    let record = sqlx::query("INSERT INTO short_urls (original_url) VALUES ($1) RETURNING id")
        .bind(url)
        .fetch_one(pool)
        .await?;

    Ok(record.get(0))
}

/// Get original URL from ID
pub async fn get_original_url(pool: &Pool<Postgres>, short_code: &str) -> Result<Option<String>> {
    let result = sqlx::query("SELECT original_url FROM short_urls WHERE id = $1")
        .bind(short_code)
        .fetch_optional(pool)
        .await?;

    Ok(result.map(|row| row.get(0)))
}

/// Record access log
pub async fn log_access(
    pool: &Pool<Postgres>,
    short_code: &str,
    ip: Option<&str>,
    user_agent: Option<&str>,
    referer: Option<&str>,
) -> Result<()> {
    sqlx::query(
        "INSERT INTO access_logs (short_code, ip, user_agent, referer) VALUES ($1, $2, $3, $4)",
    )
    .bind(short_code)
    .bind(ip)
    .bind(user_agent)
    .bind(referer)
    .execute(pool)
    .await?;

    Ok(())
}

/// Get list of previously created shortened URLs
pub async fn get_url_history(pool: &Pool<Postgres>) -> Result<Vec<UrlHistoryItem>> {
    let rows = sqlx::query(
        "SELECT
            u.id as code,
            u.original_url,
            u.created_at,
            COUNT(a.id) as click_count,
            MAX(a.accessed_at)::timestamptz as last_accessed_at
        FROM
            short_urls u
        LEFT JOIN
            access_logs a ON u.id = a.short_code
        GROUP BY
            u.id, u.original_url, u.created_at
        ORDER BY
            MAX(a.accessed_at) DESC NULLS LAST",
    )
    .fetch_all(pool)
    .await?;

    let history = rows
        .into_iter()
        .map(|row| {
            let last_accessed: Option<chrono::DateTime<Utc>> = row.try_get("last_accessed_at").ok();
            UrlHistoryItem {
                code: row.get("code"),
                original_url: row.get("original_url"),
                created_at: row.get("created_at"),
                click_count: row.get("click_count"),
                last_accessed_at: last_accessed,
            }
        })
        .collect();

    Ok(history)
}

/// Get daily access statistics for specified short codes
pub async fn get_analytics(
    pool: &Pool<Postgres>,
    codes: &[String],
    days: i64,
) -> Result<HashMap<String, Vec<DailyStats>>> {
    let mut stats: HashMap<String, Vec<DailyStats>> = HashMap::new();
    let from_date = Utc::now() - Duration::days(days);

    for code in codes {
        let rows = sqlx::query(
            "SELECT
                DATE(accessed_at)::text as date,
                COUNT(*) as count
            FROM
                access_logs
            WHERE
                short_code = $1
                AND accessed_at >= $2
            GROUP BY
                DATE(accessed_at)
            ORDER BY
                date",
        )
        .bind(code)
        .bind(from_date)
        .fetch_all(pool)
        .await?;

        let formatted_stats = rows
            .into_iter()
            .map(|row| DailyStats {
                date: row.get("date"),
                count: row.get("count"),
            })
            .collect();

        stats.insert(code.clone(), formatted_stats);
    }

    Ok(stats)
}
