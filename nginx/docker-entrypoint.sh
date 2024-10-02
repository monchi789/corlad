#!/bin/sh

# Check if SSL cert exists, otherwise use default config
if [ -f /etc/letsencrypt/live/corladcusco.com/fullchain.pem ]; then
    envsubst < /etc/nginx/nginx-ssl.conf.template > /etc/nginx/nginx.conf
else
    envsubst < /etc/nginx/nginx-no-ssl.conf.template > /etc/nginx/nginx.conf
fi

# Execute the CMD from the Dockerfile
exec "$@"