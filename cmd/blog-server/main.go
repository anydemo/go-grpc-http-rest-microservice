package main

import (
	"fmt"
	"github.com/anydemo/go-grpc-http-rest-microservice/cmd/blog-server/cmd"
	"os"
)

func main() {
	if err := cmd.RunServer(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}
