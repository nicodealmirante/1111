FROM node:18-bullseye as bot
WORKDIR /app
COPY package*.json ./
RUN pnpm i
COPY index.cjs ./node_modules/@bot-whatsapp/provider/lib/meta/index.cjs
COPY . .
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
CMD ["pnpm", "start"]
