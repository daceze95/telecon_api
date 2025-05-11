FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=5000

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]