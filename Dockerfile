FROM golang:1.12 AS backend
RUN go build -o bin/grpc-rest-svr cmd/server/*.go && mv bin/grpc-rest-svr /grpc-rest-svr

FROM alpine:latest
COPY --from=backend  /grpc-rest-svr /usr/bin/grpc-rest-svr
