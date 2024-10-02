# Usar la imagen base de nginx
FROM nginx:alpine

# Copiar el archivo de configuración nginx.conf al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puertos HTTP y HTTPS
EXPOSE 80 443

# Comando por defecto para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
