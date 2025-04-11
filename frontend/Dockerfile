FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app

COPY package.json ./
# Use regular npm install to avoid failure if package-lock.json is missing
RUN npm install

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variable - change this value to localhost
ENV NEXT_PUBLIC_API_URL=http://localhost:8081

# Create the public directory if it does not exist
RUN mkdir -p public
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Pre-create the public directory in case it does not exist
RUN mkdir -p public
COPY --from=builder /app/public ./public

# Copy static files and build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
