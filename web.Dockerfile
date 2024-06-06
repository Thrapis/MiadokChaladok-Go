## Build
FROM node:20-alpine as build
WORKDIR /app

COPY ./client/package.json /app/package.json

RUN npm install

COPY ./client/public /app/public
COPY ./client/src /app/src
COPY ./client/tsconfig.json /app/
COPY ./client/.env* /app/

RUN npm run build

## Deploy
FROM nginx:1.19.0

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY ./client/nginx.conf /etc/nginx/conf.d/default.conf

# Wait package for waiting db
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

# Expose port, wait for server application and execute application
EXPOSE 80
CMD /wait && nginx -g "daemon off;"