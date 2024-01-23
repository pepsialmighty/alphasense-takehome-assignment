FROM node:18

WORKDIR /usr/src/app

RUN apt-get update 

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]