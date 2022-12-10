# stage1 - build react app first 
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install 
COPY . .

EXPOSE 3002
CMD [ "node", "index.js" ]