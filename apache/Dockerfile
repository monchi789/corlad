FROM ubuntu:20.04

# Instalar Apache y Certbot
RUN apt-get update && \
    apt-get install -y apache2 certbot python3-certbot-apache && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Habilitar los módulos necesarios
RUN a2enmod ssl rewrite proxy proxy_http

# Copiar el archivo de configuración de Apache
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Exponer los puertos
EXPOSE 80
EXPOSE 443

# Iniciar Apache en el primer plano
CMD ["apachectl", "-D", "FOREGROUND"]
