FROM nginx:stable-alpine
RUN apk add --no-cache bash
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY /build /usr/share/nginx/html
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
RUN chmod +x env.sh
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
