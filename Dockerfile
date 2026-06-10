# Multi-stage Dockerfile for self-hosting Lucen Sky on DigitalOcean App Platform,
# Fly.io, Render, or any container host. The TanStack Start build emits a
# standalone Node-compatible server bundle in .output/ when the Nitro preset
# is overridden via the NITRO_PRESET env var at build time.
FROM oven/bun:1.1 AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM oven/bun:1.1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# node-server preset produces a portable Node server in .output/server/index.mjs
ENV NITRO_PRESET=node-server
RUN bun run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
