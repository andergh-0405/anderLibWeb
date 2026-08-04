##################################
#Creacion del archivo de producion 

FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --production

#########################################
#CREACION DEL SERVIDOR NGINX

FROM nginx:1.31.2-alpine-slim

COPY --from=builder /app/dist/anderLib/browser/ /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]