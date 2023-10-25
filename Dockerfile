# simple dockerfile to build a base image and expose port 3000

FROM node:20-alpine3.

WORKDIR /app
COPY package.json /app

RUN npm install --ignore-scripts

COPY . /app

RUN npm install
RUN npm install -g typescript

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]