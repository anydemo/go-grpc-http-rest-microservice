package utils

import (
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// GrpcErr return Grpc status err
func GrpcErr(code codes.Code, err error) error {
	if err != nil {
		return status.Errorf(code, err.Error())
	}
	return nil
}
