package v1

import (
	"context"
	"fmt"

	"google.golang.org/grpc/health/grpc_health_v1"
)

// HealthImpl grpc health
type HealthImpl struct{}

// NewHealthzServer creates ToDo service
func NewHealthzServer() grpc_health_v1.HealthServer {
	return &HealthImpl{}
}

// Check 实现健康检查接口，这里直接返回健康状态，这里也可以有更复杂的健康检查策略，比如根据服务器负载来返回
func (h *HealthImpl) Check(ctx context.Context, req *grpc_health_v1.HealthCheckRequest) (*grpc_health_v1.HealthCheckResponse, error) {
	fmt.Print("health checking\n")
	return &grpc_health_v1.HealthCheckResponse{
		Status: grpc_health_v1.HealthCheckResponse_SERVING,
	}, nil
}

// Watch watch nil
func (h *HealthImpl) Watch(req *grpc_health_v1.HealthCheckRequest, w grpc_health_v1.Health_WatchServer) error {
	return nil
}
