FROM node:18-alpine

WORKDIR /app

COPY patienten-app/package*.json ./

RUN npm install && \
    npm install --save \
    qrcode.react@3.1.0 \
    js-cookie@3.0.5 \
    survey-react-ui@1.9.116

RUN npm cache clean --force

COPY patienten-app/ .

ENV NODE_ENV=development

EXPOSE 3000

ENV WATCHPACK_POLLING=true
CMD ["npm", "start"] 