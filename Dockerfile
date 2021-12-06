FROM node:16.13.1-alpine3.14 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3003
CMD ["npm", "run", "start:prod"]
