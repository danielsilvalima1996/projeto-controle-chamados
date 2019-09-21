# Stage 1
FROM nginx:alpine

COPY conf/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/projeto-controle-chamados .