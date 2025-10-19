# Adapted from: https://dev.to/seanbh/how-to-serve-an-angular-application-with-nginx-d9a
# use a node image as the base image and name it 'build' for
# later reference
FROM node:22-alpine3.19 as build

# set the working directory to /app
WORKDIR /app
# copy the current directory contents into the container at /app
COPY package.json ./
RUN yarn install

COPY . .
# build the app
RUN npm run build-dev

FROM debian:bookworm
RUN apt-get update && apt-get install -y \
    build-essential \
    libpcre3-dev \
    libssl-dev \
    zlib1g-dev \
    libgd-dev \
    libxml2-dev \
    wget \
    tar

RUN wget -P /tmp http://nginx.org/download/nginx-1.27.2.tar.gz
RUN tar -zxvf /tmp/nginx-1.27.2.tar.gz -C /tmp

RUN wget -P /tmp https://github.com/fdintino/nginx-upload-module/archive/refs/tags/2.3.0.tar.gz
RUN tar -zxvf /tmp/2.3.0.tar.gz -C /tmp

WORKDIR /tmp/nginx-1.27.2

RUN ./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-http_ssl_module --with-http_realip_module --with-http_gunzip_module --with-http_gzip_static_module --with-threads --with-file-aio --with-http_v2_module --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector --param=ssp-buffer-size=4 -m64 -mtune=native' --add-module=/tmp/nginx-upload-module-2.3.0 && make && make install

COPY nginx.conf /etc/nginx/nginx.conf
# copy the built application from the build stage to the nginx html 
# directory
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

RUN useradd -ms /bin/bash nginx
RUN mkdir /var/cache/nginx
RUN mkdir /var/cache/nginx/client_temp
RUN mkdir /usr/share/nginx/uploads
RUN mkdir /usr/share/nginx/uploads/noauth

# for i in {0..9} does not seem to work in this container
# Needed for nginx-upload-module
RUN mkdir /usr/share/nginx/uploads/noauth/0
RUN mkdir /usr/share/nginx/uploads/noauth/1
RUN mkdir /usr/share/nginx/uploads/noauth/2
RUN mkdir /usr/share/nginx/uploads/noauth/3
RUN mkdir /usr/share/nginx/uploads/noauth/4
RUN mkdir /usr/share/nginx/uploads/noauth/5
RUN mkdir /usr/share/nginx/uploads/noauth/6
RUN mkdir /usr/share/nginx/uploads/noauth/7
RUN mkdir /usr/share/nginx/uploads/noauth/8
RUN mkdir /usr/share/nginx/uploads/noauth/9

RUN ls /usr/share/nginx/uploads/noauth
CMD ["nginx", "-g", "daemon off;"]

#RUN ls /usr/share/nginx/html
#RUN mkdir /usr/share/nginx/uploads
#RUN mkdir /usr/share/nginx/uploads/noauth
#RUN ls /usr/lib/nginx/modules

# The above commands build the Angular app and then configure and build a 
# Docker image for serving it using the nginx web server.
