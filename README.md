# Redirect0 - URL Shortener & Analytics Platform

Redirect0 is a self-hosted URL shortener service with advanced analytics capabilities, designed for A/B testing, content optimization, and comprehensive tracking of URL performance.


https://github.com/user-attachments/assets/280c82c4-597b-4b36-b14b-90c2042045dd


**[日本語版 README](./README.ja.md)**

## ✨ Features

### Core Features
- Create short, memorable URLs
- Track click metrics with detailed analytics
- Compare performance between multiple shortened URLs
- Support for A/B testing with different IDs for the same target URL
- Self-hosted and privacy-friendly
- Docker-based deployment for easy setup

### Advanced Features (Upcoming)
- **Project Management & Collaboration**
  - Create and manage multiple projects with team members
  - Team invitation system with customizable permissions
  - Shared analytics dashboards within teams

- **AI-Powered Analytics**
  - **Target Audience Analysis**: Get insights on the ideal audience for your content
  - **Content Summarization**: Automatic summarization of linked content for quick reference
  - **Natural Language Queries**: Ask questions like "What was my best performing link last week?" in plain English
  - **Smart A/B Testing**: AI-suggested testing approaches and automatic result analysis
  - **Conversion Prediction**: ML-based forecasting of conversion probability
  - **Automated Tagging & Categorization**: Content-aware URL categorization

- **Enhanced Tracking**
  - Advanced JavaScript-based visitor tracking
  - Time-based analytics (hourly, daily, weekly views)
  - User behavior and engagement metrics
  - Geographic and device-specific insights

- **Intelligent Reporting**
  - Personalized reports for different stakeholders
  - Scheduled report generation and delivery
  - Data-driven recommendations for optimization

## 🚀 Tech Stack

### Backend
- Rust with Axum web framework
- PostgreSQL database
- Asynchronous processing with Tokio
- MCP server for AI model integration

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
docker compose up -d
```

3. Access the application:
   - Frontend: http://localhost
   - API: http://localhost/api

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
- AI model connections (for MCP)

## 📚 API Documentation

The Redirect0 API provides endpoints for:

- Creating short URLs: `POST /api/create`
- Retrieving URL history: `GET /api/history`
- Fetching analytics data: `GET /api/analytics?codes=code1,code2&range=7d`
- Redirection handling: `GET /:code`
- Team management: `POST /api/teams`
- AI insights: `POST /api/insights`
- MCP connections: `POST /api/mcp/connect`


## 🌱 Development

To set up a development environment:

1. Install Rust and Node.js
2. Set up the database using `db/init.sql`
3. Run the backend: `cd api && cargo run`
4. Run the frontend: `cd frontend && npm run dev`

## 📄 License

This project is licensed under the GNU Affero General Public License v3 (AGPL-3.0) - see the [LICENSE](LICENSE) file for details.

### Commercial License

For commercial use cases where the AGPL-3.0 requirements are not suitable, a commercial license is available. See [COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md) for more information.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🗺️ Roadmap

We're actively working on implementing the advanced features mentioned above. Check our [GitHub Projects](https://github.com/yourusername/redirect0/projects) page for the current development status and upcoming releases.

- Q2 2025: Project Management & Collaboration features
- Q3 2025: MCP Integration & AI-Powered Analytics
- Q4 2025: Enhanced Tracking & Intelligent Reporting
