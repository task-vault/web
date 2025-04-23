FROM node:23-slim AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install

COPY . .

RUN pnpm build
RUN pnpm prune --prod

FROM nginx:stable-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
