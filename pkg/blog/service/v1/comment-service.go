package v1

import (
	"context"

	v1 "github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/api/v1"
	"github.com/jinzhu/gorm"
)

type commentServiceServer struct {
	db *gorm.DB
}

func (s *commentServiceServer) ReadAllComment(context.Context, *v1.ReadAllCommentRequest) (*v1.ReadAllCommentResponse, error) {
	panic("not implemented")
}
func (s *commentServiceServer) CreateComment(context.Context, *v1.CreateCommentRequest) (*v1.CreateCommentResponse, error) {
	panic("not implemented")
}
func (s *commentServiceServer) DeleteComment(context.Context, *v1.DeleteCommentRequest) (*v1.DeleteCommentResponse, error) {
	panic("not implemented")
}
