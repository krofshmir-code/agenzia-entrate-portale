FROM node:24-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace configuration files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY tsconfig.base.json tsconfig.json ./

# Copy all workspace package.json files (layer caching)
COPY artifacts/agenzia-entrate/package.json ./artifacts/agenzia-entrate/
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY artifacts/mockup-sandbox/package.json ./artifacts/mockup-sandbox/
COPY lib/db/package.json ./lib/db/
COPY lib/api-client-react/package.json ./lib/api-client-react/
COPY lib/api-spec/package.json ./lib/api-spec/
COPY lib/api-zod/package.json ./lib/api-zod/
COPY scripts/package.json ./scripts/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Vite config requires PORT and BASE_PATH at build time
ENV PORT=5173
ENV BASE_PATH=/
RUN pnpm run build

# Bundle migration script into standalone CJS (externalize pg for native compat)
RUN npx esbuild lib/db/migrate.ts --bundle --platform=node --format=cjs \
    --outfile=lib/db/migrate.cjs --external:pg --external:pg-native

# --- Production stage ---
FROM node:24-slim

WORKDIR /app

# Install only the runtime deps not bundled by esbuild
RUN npm init -y > /dev/null 2>&1 && \
    npm install --no-package-lock archiver@7 cookie-parser@1 pdfkit@0.17 pg@8

# Copy built backend (esbuild bundle)
COPY --from=builder /app/artifacts/api-server/dist ./artifacts/api-server/dist

# Copy built frontend (Vite output)
COPY --from=builder /app/artifacts/agenzia-entrate/dist/public ./artifacts/agenzia-entrate/dist/public

# Copy bundled migration script and SQL migration files
COPY --from=builder /app/lib/db/migrate.cjs ./lib/db/migrate.cjs
COPY --from=builder /app/lib/db/drizzle ./lib/db/drizzle

ENV NODE_ENV=production
EXPOSE 8080

CMD ["sh", "-c", "node lib/db/migrate.cjs && node artifacts/api-server/dist/index.cjs"]
