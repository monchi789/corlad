# Usa una imagen de Node.js como base
FROM node:20.14.0-alpine3.20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 5173 (puerto por defecto de Vite)
EXPOSE 5173

# Comando para ejecutar la aplicación en modo de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

