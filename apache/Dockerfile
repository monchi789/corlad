# Dockerfile para Apache
FROM ubuntu:20.04

# Instalar Apache y Certbot
RUN apt-get update && \
    apt-get install -y apache2 certbot python3-certbot-apache && \
    apt-get clean

# Habilitar los módulos necesarios
RUN a2enmod ssl proxy proxy_http rewrite

# Copiar archivo de configuración de Apache
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Exponer puertos
EXPOSE 80
EXPOSE 443

# Comando para iniciar Apache en primer plano
CMD ["apachectl", "-D", "FOREGROUND"]
