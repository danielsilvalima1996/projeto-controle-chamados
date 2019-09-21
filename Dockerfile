# Stage 1
FROM nginx:latest

COPY conf/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/projeto-controle-chamados .