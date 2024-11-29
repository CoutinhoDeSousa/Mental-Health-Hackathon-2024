FROM node:18-alpine AS builder

WORKDIR /app

COPY ./patienten-app/package*.json ./

RUN npm install

COPY ./patienten-app .

# Build für Produktion
RUN npm run build

# Zweite Stage für kleineres Production Image
FROM nginx:alpine

# Nginx Konfiguration kopieren
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Build-Dateien kopieren
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 