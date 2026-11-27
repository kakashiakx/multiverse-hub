# Build from the repository root:
#   docker build -f platforms/cloud/Dockerfile -t multiverse-hub-cloud .
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY shared ./shared
COPY civilizations ./civilizations
COPY environments ./environments
COPY platforms/cloud ./platforms/cloud
ENV APP_ENV=production
ENV PORT=8080
EXPOSE 8080
USER node
CMD ["node", "platforms/cloud/server.mjs"]
