FROM node:14

ENV NODE_ENV=production

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]