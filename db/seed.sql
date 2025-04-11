-- Script for inserting dummy data

-- Insert dummy shortened URLs
INSERT INTO short_urls (id, original_url, created_at) VALUES
  ('abc123', 'https://imanect.com', NOW() - INTERVAL '30 days'),
  ('def456', 'https://imanect.com/products', NOW() - INTERVAL '25 days'),
  ('ghi789', 'https://imanect.com/blog', NOW() - INTERVAL '20 days'),
  ('jkl012', 'https://imanect.com/contact', NOW() - INTERVAL '15 days'),
  ('mno345', 'https://imanect.com/about', NOW() - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;

-- Insert access logs individually
-- Logs for abc123
INSERT INTO access_logs (short_code, ip, user_agent, referer, accessed_at)
SELECT
  'abc123',
  CASE floor(random() * 4)::int
    WHEN 0 THEN '192.168.1.1'
    WHEN 1 THEN '192.168.1.2'
    WHEN 2 THEN '203.0.113.1'
    ELSE '203.0.113.2'
  END,
  CASE floor(random() * 3)::int
    WHEN 0 THEN 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    WHEN 1 THEN 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    ELSE 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)'
  END,
  CASE WHEN random() < 0.7 THEN
    CASE floor(random() * 3)::int
      WHEN 0 THEN 'https://www.google.com'
      WHEN 1 THEN 'https://www.bing.com'
      ELSE 'https://www.facebook.com'
    END
  ELSE NULL END,
  NOW() - (floor(random() * 30)::int || ' days')::interval - (floor(random() * 24)::int || ' hours')::interval
FROM generate_series(1, 150);

-- Logs for def456
INSERT INTO access_logs (short_code, ip, user_agent, referer, accessed_at)
SELECT
  'def456',
  CASE floor(random() * 4)::int
    WHEN 0 THEN '192.168.1.3'
    WHEN 1 THEN '192.168.1.4'
    WHEN 2 THEN '203.0.113.3'
    ELSE '203.0.113.4'
  END,
  CASE floor(random() * 3)::int
    WHEN 0 THEN 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    WHEN 1 THEN 'Mozilla/5.0 (Linux; Android 11; SM-G991B)'
    ELSE 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X)'
  END,
  CASE WHEN random() < 0.7 THEN
    CASE floor(random() * 3)::int
      WHEN 0 THEN 'https://www.twitter.com'
      WHEN 1 THEN 'https://www.linkedin.com'
      ELSE 'https://www.yahoo.com'
    END
  ELSE NULL END,
  NOW() - (floor(random() * 30)::int || ' days')::interval - (floor(random() * 24)::int || ' hours')::interval
FROM generate_series(1, 120);

-- Add access logs for the remaining shortened URLs
INSERT INTO access_logs (short_code, ip, user_agent, referer, accessed_at)
SELECT
  CASE floor(random() * 3)::int
    WHEN 0 THEN 'ghi789'
    WHEN 1 THEN 'jkl012'
    ELSE 'mno345'
  END,
  CASE floor(random() * 4)::int
    WHEN 0 THEN '192.168.1.5'
    WHEN 1 THEN '192.168.1.6'
    WHEN 2 THEN '203.0.113.5'
    ELSE '203.0.113.6'
  END,
  CASE floor(random() * 3)::int
    WHEN 0 THEN 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    WHEN 1 THEN 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    ELSE 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)'
  END,
  CASE WHEN random() < 0.7 THEN
    CASE floor(random() * 3)::int
      WHEN 0 THEN 'https://www.google.com'
      WHEN 1 THEN 'https://www.instagram.com'
      ELSE 'https://www.github.com'
    END
  ELSE NULL END,
  NOW() - (floor(random() * 30)::int || ' days')::interval - (floor(random() * 24)::int || ' hours')::interval
FROM generate_series(1, 180);
