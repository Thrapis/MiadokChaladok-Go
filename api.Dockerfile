## Build
FROM golang:1.20-alpine as build
WORKDIR /app

# Add some necessary packages
# RUN apk update && \
#     apk add libc-dev && \
#     apk add gcc && \
#     apk add make

# Pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY ./server/go.mod ./server/go.sum ./
RUN go mod download && go mod verify

# github.com/Thrapis/MiadokChaladok-Go/cmd/
ADD ./server .
RUN CGO_ENABLED=0 go build -v -o /main /app/cmd/main.go

## Deploy
FROM alpine:latest
WORKDIR /server-app

# Wait package for waiting db
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

# Copy server application necessery files
COPY --from=build /main /server-app/main
COPY ./server/static /server-app/static
COPY ./server/configs/config-for-docker.yaml /server-app/configs/config.yaml

# Expose port, wait for db and execute application
EXPOSE 8080
CMD /wait && /server-app/main