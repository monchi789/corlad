FROM httpd:2.4

# Copiar Apache configuración
COPY apache.conf /usr/local/apache2/conf/extra/apache.conf

# Incluir el archivo de configuración personalizado
RUN echo "Include conf/extra/apache.conf" >> /usr/local/apache2/conf/httpd.conf

# Habilitar mod_ssl, mod_proxy, mod_proxy_http, y mod_rewrite
RUN sed -i '/LoadModule ssl_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule proxy_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule proxy_http_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

EXPOSE 80
EXPOSE 443
