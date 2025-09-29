FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g ts-node-dev

EXPOSE 3000

CMD ["npx prisma migrate dev", "npm run start:dev"]
