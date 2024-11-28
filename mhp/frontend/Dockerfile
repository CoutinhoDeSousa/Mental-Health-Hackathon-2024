FROM node:18-alpine

WORKDIR /app

COPY patienten-app/package*.json ./

RUN npm install

COPY patienten-app/ .

EXPOSE 3000

CMD ["npm", "start"] 