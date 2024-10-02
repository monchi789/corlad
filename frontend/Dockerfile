# Dockerfile del frontend
# Stage 1: Build the React application
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates from the context
COPY ./ssl/fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY ./ssl/privkey.pem /etc/nginx/ssl/privkey.pem

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
