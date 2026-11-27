FROM node:20-alpine
WORKDIR /app
COPY . .
ENV APP_ENV=production
CMD ["npm", "run", "validate"]
