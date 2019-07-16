package v1

import (
	"context"

	v1 "github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/api/v1"
	"github.com/jinzhu/gorm"
)

// NewBlogServiceServer NewblogServiceServer
func NewBlogServiceServer(db *gorm.DB) v1.BlogServiceServer {
	ret := &blogServiceServer{
		commentServiceServer: &commentServiceServer{
			db: db,
		},
		db: db,
	}
	return ret
}

type blogServiceServer struct {
	*commentServiceServer
	db *gorm.DB
}

func (s *blogServiceServer) ReadAllBlog(context.Context, *v1.ReadAllBlogRequest) (*v1.ReadAllBlogResponse, error) {
	panic("not implemented")
}
func (s *blogServiceServer) CreateBlog(context.Context, *v1.CreateBlogRequest) (*v1.CreateBlogResponse, error) {
	panic("not implemented")
}
func (s *blogServiceServer) ReadBlog(context.Context, *v1.ReadBlogRequest) (*v1.ReadBlogResponse, error) {
	panic("not implemented")
}
func (s *blogServiceServer) DeleteBlog(context.Context, *v1.DeleteBlogRequest) (*v1.DeleteBlogResponse, error) {
	panic("not implemented")
}
