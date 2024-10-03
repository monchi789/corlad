# Stage 1: Build the React application
FROM node:20.14.0-alpine3.20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:alpine

# Copiar los archivos de construcción al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Cambiar la configuración de Nginx para escuchar en el puerto 3000
RUN sed -i 's/listen\s*80;/listen 3000;/' /etc/nginx/conf.d/default.conf

# Exponer el puerto 3000 para el servidor Nginx
EXPOSE 3000
