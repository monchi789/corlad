# Utilizar la imagen oficial de Python para Alpine
FROM python:3.10-alpine

# Instalar dependencias necesarias para el entorno
RUN apk add --no-cache gcc musl-dev linux-headers libffi-dev

# Definir el directorio de trabajo
WORKDIR /app

# Copiar solo el archivo de requisitos primero para aprovechar el cache de Docker
COPY requirements.txt .

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de la aplicación
COPY . .

# Crear el directorio para archivos estáticos
RUN mkdir -p /app/staticfiles

# Ejecutar la recolección de archivos estáticos
RUN python manage.py collectstatic --noinput

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
