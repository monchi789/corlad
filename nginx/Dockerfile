FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf
COPY certbot /var/www/certbot

RUN mkdir -p /etc/nginx/ssl
