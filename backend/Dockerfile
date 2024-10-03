# Stage 1: Build the Django application
FROM python:3.10-alpine AS build

WORKDIR /app

# Copiar los archivos de requerimientos y Django
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 8000 para servir la aplicación
EXPOSE 8000

# Comando para ejecutar el servidor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
