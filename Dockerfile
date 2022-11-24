# syntax=docker/dockerfile:1
FROM node:16-alpine

RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow

WORKDIR /app

COPY /*.json /app

RUN npm install --silent

COPY . .

ENV PORT 5001

EXPOSE $PORT

VOLUME [ "/app/data" ]

CMD ["sh", "-c", "npm run start"] 