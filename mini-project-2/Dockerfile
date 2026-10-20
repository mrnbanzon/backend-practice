# production stage
FROM node:24.8.0-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY ./src ./src

EXPOSE 3000

CMD ["npm", "start"]