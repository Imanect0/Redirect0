CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Table definitions
CREATE TABLE IF NOT EXISTS short_urls (
	id TEXT PRIMARY KEY,
	original_url TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS access_logs (
	id SERIAL PRIMARY KEY,
	short_code TEXT NOT NULL,
	ip TEXT,
	user_agent TEXT,
	referer TEXT,
	accessed_at TIMESTAMPTZ DEFAULT now()
);

-- Function to generate a random short ID
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

-- Trigger to generate a short ID
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

-- Insert sample data (for development)
INSERT INTO short_urls (original_url) VALUES
	('https://example.com')
ON CONFLICT DO NOTHING;

-- Insert sample access logs (for development)
INSERT INTO access_logs (short_code, ip, user_agent, accessed_at)
SELECT
	id,
	'192.168.1.1',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
	now() - (random() * interval '10 days')
FROM short_urls
LIMIT 1;
