# Utilizar la imagen oficial de Python para Alpine
FROM python:3.10-alpine

# Establecer variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Instalar herramientas de construcción y dependencias
RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    jpeg-dev \
    zlib-dev \
    libffi-dev

# Instalar dependencias de Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el proyecto
COPY . /app/

# Crear directorios para archivos estáticos y media
RUN mkdir -p /app/staticfiles /app/media

# Otorgar permisos adecuados
RUN chmod -R 755 /app/staticfiles /app/media

# Recolectar archivos estáticos
RUN python manage.py collectstatic --noinput

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 8000

# Definir volúmenes para archivos estáticos y media
VOLUME ["/app/staticfiles", "/app/media"]

# Comando para ejecutar las migraciones y luego iniciar el servidor
CMD ["sh", "-c", "python manage.py migrate && gunicorn server.wsgi:application --bind 0.0.0.0:8000"]
