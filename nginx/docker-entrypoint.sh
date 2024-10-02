#!/bin/sh

# Wait for certbot to obtain the certificate
until [ -f /etc/letsencrypt/live/corladcusco.com/fullchain.pem ]
do
    echo "Waiting for Certbot to obtain SSL certificate..."
    sleep 5
done

# Generate the final nginx.conf
envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Execute the CMD from the Dockerfile
exec "$@"