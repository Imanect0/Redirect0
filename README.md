# Redirect0 - URL Shortener & Analytics Platform

Redirect0 is a self-hosted URL shortener service with detailed analytics capabilities, designed for A/B testing and tracking URL performance.

**[日本語版 README](./README.ja.md)**

## ✨ Features

- Create short, memorable URLs
- Track click metrics with detailed analytics
- Compare performance between multiple shortened URLs
- Support for A/B testing with different IDs for the same target URL
- Self-hosted and privacy-friendly
- Docker-based deployment for easy setup

## 🚀 Tech Stack

### Backend

- Rust with Axum web framework
- PostgreSQL database
- Asynchronous processing with Tokio

### Frontend

- Next.js with TypeScript
- Tailwind CSS for styling
- shadcn/ui for UI components
- Recharts for analytics visualization

## 📋 Prerequisites

- Docker and Docker Compose
- Make (optional, for using the provided Makefile)

## 🛠️ Quick Start

1. Clone the repository:

```bash
git clone https://github.com/yourusername/redirect0.git
cd redirect0
```

2. Start the application:

```bash
make up
```

3. Access the application:
   - Frontend: http://localhost:80
   - API: http://localhost:80/api

## 📊 Usage

### Creating Short URLs

1. Navigate to the home page
2. Enter the URL you want to shorten
3. Click "Shorten" to generate a short URL
4. Copy and share your shortened URL

### Viewing Analytics

1. Go to the "History" page to see all your shortened URLs
2. Click "Analyze" on any URL to view its performance metrics
3. Use the "Analytics" page to compare multiple URLs by selecting them from the dropdown

## 🔧 Configuration

Edit the `.env` file or environment variables in the `docker-compose.yml` file to customize:

- Database settings
- Port configurations
- CORS settings
- Logging levels

## 📚 API Documentation

The Redirect0 API provides endpoints for:

- Creating short URLs: `POST /api/create`
- Retrieving URL history: `GET /api/history`
- Fetching analytics data: `GET /api/analytics?codes=code1,code2&range=7d`
- Redirection handling: `GET /:code`

## 🐳 Docker Commands

```bash
# Start all services
make up

# Stop all services
make down

# View logs
make logs

# Rebuild services
make rebuild

# Clean up volumes and containers
make clean
```

## 🌱 Development

To set up a development environment:

1. Install Rust and Node.js
2. Set up the database using `db/init.sql`
3. Run the backend: `cd api && cargo run`
4. Run the frontend: `cd frontend && npm run dev`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
