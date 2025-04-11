-- Initial migration
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Table definitions
CREATE TABLE IF NOT EXISTS short_urls (
  id TEXT PRIMARY KEY,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS access_logs (
  id SERIAL PRIMARY KEY,
  short_code TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  referer TEXT,
  accessed_at TIMESTAMP DEFAULT now()
);

-- Function to generate random short IDs
CREATE OR REPLACE FUNCTION generate_short_id()
RETURNS TEXT AS $$
DECLARE
  result TEXT;
  valid_chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  id_length INTEGER := 6;
BEGIN
  -- Generate a random string in a URL-safe Base64-like format
  SELECT string_agg(substr(valid_chars, ceil(random() * length(valid_chars))::integer, 1), '')
  INTO result
  FROM generate_series(1, id_length);

  -- Regenerate if the ID already exists
  WHILE EXISTS (SELECT 1 FROM short_urls WHERE id = result) LOOP
    SELECT string_agg(substr(valid_chars, ceil(random() * length(valid_chars))::integer, 1), '')
    INTO result
    FROM generate_series(1, id_length);
  END LOOP;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to generate short IDs
CREATE OR REPLACE FUNCTION set_short_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.id IS NULL THEN
    NEW.id := generate_short_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger setup
DROP TRIGGER IF EXISTS short_urls_set_id ON short_urls;
CREATE TRIGGER short_urls_set_id
BEFORE INSERT ON short_urls
FOR EACH ROW
EXECUTE FUNCTION set_short_id();
