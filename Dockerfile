# syntax=docker/dockerfile:1
FROM node:16-alpine

RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow

WORKDIR /app

COPY /*.json /app

RUN npm install --silent

COPY . .

ENV PORT 5000

EXPOSE $PORT

VOLUME [ "/app/data" ]

CMD ["node", "index.js"] 