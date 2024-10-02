# Dockerfile
FROM httpd:2.4

# Install necessary packages
RUN apt-get update && \
    apt-get install -y ssl-cert certbot python3-certbot-apache

# Enable necessary Apache modules
RUN a2enmod ssl proxy proxy_http rewrite

# Copy Apache configuration file
COPY apache.conf /usr/local/apache2/conf/extra/apache.conf

# Include the custom configuration file
RUN echo "Include conf/extra/apache.conf" \
    >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80
EXPOSE 443