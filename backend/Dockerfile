# Stage 1: Build the Django application
FROM python:3.10-alpine AS build

WORKDIR /app

# Copiar los archivos de requerimientos y Django
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código fuente
COPY . .

# Ejecutar las migraciones de la base de datos y compilar archivos estáticos
RUN python manage.py migrate && \
    python manage.py collectstatic --noinput

# Stage 2: Serve the Django application using Nginx
FROM nginx:alpine

# Copiar los archivos estáticos generados por Django a Nginx
COPY --from=build /app/staticfiles /usr/share/nginx/html/static

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Cambiar la configuración de Nginx para escuchar en el puerto 8000
RUN sed -i 's/listen\s*80;/listen 8000;/' /etc/nginx/nginx.conf

# Exponer el puerto 8000 para servir la aplicación
EXPOSE 8000
