FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ../.. ./

ENV NODE_ENV='PRODUCTION'

RUN npm i
CMD ["npm", "run", "start"]