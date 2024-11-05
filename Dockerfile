# simple dockerfile to build a base image and expose port 3000

FROM node:22-alpine

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install -g typescript
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]