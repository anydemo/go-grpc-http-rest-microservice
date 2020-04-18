package grpc

import (
	"context"
	"net"
	"os"
	"os/signal"

	"google.golang.org/grpc"

	"github.com/anydemo/go-grpc-http-rest-microservice/logger"
	v1 "github.com/anydemo/go-grpc-http-rest-microservice/pkg/todo/api/v1"
	"github.com/anydemo/go-grpc-http-rest-microservice/protocol/grpc/middleware"
	"google.golang.org/grpc/health/grpc_health_v1"
)

// RegisterToConsul register the service to consul
// func RegisterToConsul() {
// 	discovery.RegitserService("localhost:8500", &discovery.ConsulService{
// 		Name: "todo_server_grpc",
// 		Tag:  []string{"todo", "grpc", "todo_server_grpc"},
// 		IP:   "127.0.0.1",
// 		Port: 9090,
// 	})
// }

// RunServer runs gRPC service to publish ToDo service
func RunServer(ctx context.Context, v1API v1.ToDoServiceServer, v1Healthz grpc_health_v1.HealthServer, port string) error {
	listen, err := net.Listen("tcp", ":"+port)
	if err != nil {
		return err
	}

	// gRPC server statup options
	opts := []grpc.ServerOption{}

	// add middleware
	opts = middleware.AddLogging(logger.Log, opts)

	// register service
	server := grpc.NewServer(opts...)
	v1.RegisterToDoServiceServer(server, v1API)
	grpc_health_v1.RegisterHealthServer(server, v1Healthz)
	// RegisterToConsul()
	// graceful shutdown
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		for range c {
			// sig is a ^C, handle it
			logger.Log.Warn("shutting down todo gRPC server...")

			server.GracefulStop()

			<-ctx.Done()
		}
	}()

	// start gRPC server
	logger.Log.Info("starting todo gRPC server...")
	return server.Serve(listen)
}
