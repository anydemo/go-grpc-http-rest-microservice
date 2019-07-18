package cmd

import (
	"context"
	"flag"
	"fmt"

	datasource "github.com/anydemo/go-grpc-http-rest-microservice/datasource/gorm"
	"github.com/anydemo/go-grpc-http-rest-microservice/logger"
	"github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/protocol/grpc"
	"github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/protocol/rest"
	v1 "github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/service/v1"
)

// Config is configuration for Server
type Config struct {
	// gRPC server start parameters section
	// GRPCPort is TCP port to listen by gRPC server
	GRPCPort string

	// HTTP/REST gateway start parameters section
	// HTTPPort is TCP port to listen by HTTP/REST gateway
	HTTPPort string

	// DatastoreAddr DB Datastore parameters section
	// DatastoreAddr is host of database
	DatastoreAddr string

	// Log parameters section
	// LogLevel is global log level: Debug(-1), Info(0), Warn(1), Error(2), DPanic(3), Panic(4), Fatal(5)
	LogLevel int
	// LogTimeFormat is print time format for logger e.g. 2006-01-02T15:04:05Z07:00
	LogTimeFormat string
}

// RunServer runs gRPC server and HTTP gateway
func RunServer() error {
	ctx := context.Background()

	// get configuration
	var cfg Config
	flag.StringVar(&cfg.GRPCPort, "grpc-port", "", "gRPC port to bind")
	flag.StringVar(&cfg.HTTPPort, "http-port", "", "HTTP port to bind")
	flag.StringVar(&cfg.DatastoreAddr, "db-addr", "", "Database host")
	flag.IntVar(&cfg.LogLevel, "log-level", 0, "Global log level")
	flag.StringVar(&cfg.LogTimeFormat, "log-time-format", "",
		"Print time format for logger e.g. 2006-01-02T15:04:05Z07:00")
	flag.Parse()

	if len(cfg.GRPCPort) == 0 {
		return fmt.Errorf("invalid TCP port for gRPC server: '%s'", cfg.GRPCPort)
	}

	if len(cfg.HTTPPort) == 0 {
		return fmt.Errorf("invalid TCP port for HTTP gateway: '%s'", cfg.HTTPPort)
	}

	// initialize logger
	if err := logger.Init(cfg.LogLevel, cfg.LogTimeFormat); err != nil {
		return fmt.Errorf("failed to initialize logger: %v", err)
	}

	db, err := datasource.NewDB(&datasource.Config{Addr: cfg.DatastoreAddr})
	if err != nil {
		return fmt.Errorf("failed to init db %v", err)
	}
	defer db.Close()

	v1API := v1.NewBlogServiceServer(db)

	// run HTTP gateway
	go func() {
		_ = rest.RunServer(ctx, cfg.GRPCPort, cfg.HTTPPort)
	}()

	return grpc.RunServer(ctx, v1API, cfg.GRPCPort)
}
