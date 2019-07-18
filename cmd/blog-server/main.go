package main

import (
	"fmt"
	"os"

	_ "github.com/jinzhu/gorm/dialects/postgres"

	"github.com/anydemo/go-grpc-http-rest-microservice/cmd/blog-server/cmd"
)

func main() {
	if err := cmd.RunServer(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}
