FROM httpd:2.4

# Copia el archivo de configuración de Apache
COPY ./apache/apache.conf /usr/local/apache2/conf/httpd.conf

# Habilitar los módulos necesarios
RUN apt-get update && \
    apt-get install -y apache2-utils && \
    a2enmod ssl rewrite proxy proxy_http

# Exponer los puertos
EXPOSE 80
EXPOSE 443
