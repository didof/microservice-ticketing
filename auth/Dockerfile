FROM node:10-alpine

ARG NODE_ENV=production

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --loglevel verbose
COPY . .

CMD ["npm", "start"]