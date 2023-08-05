# simple dockerfile to build a base image and expose port 3000

FROM node:18-alpine

WORKDIR /app
COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]