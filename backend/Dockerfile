# Utilizar la imagen oficial de Python para Alpine
FROM python:3.10-alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Ejecutar la recolección de archivos estáticos
RUN python manage.py collectstatic --noinput

# Exponer el puerto 8000
EXPOSE 8000

# Comando para ejecutar Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "server.wsgi:application"]
