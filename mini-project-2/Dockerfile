# build stage

# production stage
FROM node:24.8.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY ./src ./src

EXPOSE 3000

CMD ["npm", "start"]