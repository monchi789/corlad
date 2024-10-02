FROM node:20.14.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
