FROM node:alpine3.20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --force --loglevel verbose
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]