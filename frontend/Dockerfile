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

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 5173 para el servidor Nginx
EXPOSE 5173
