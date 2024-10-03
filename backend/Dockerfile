# Utilizar la imagen oficial de Python para Alpine
FROM python:3.10-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Instalar herramientas de construcción y dependencias de PostgreSQL
RUN apk add --no-cache build-base postgresql-dev

# Instalar dependencias de Python
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el contenido del directorio actual en el contenedor
COPY . /app

# Comando para migrar la base de datos y luego iniciar el servidor
CMD ["python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
