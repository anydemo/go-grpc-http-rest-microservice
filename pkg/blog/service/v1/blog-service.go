package v1

import (
	"context"
	"fmt"

	"github.com/anydemo/go-grpc-http-rest-microservice/utils"

	"github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog"

	v1 "github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/api/v1"
	"github.com/jinzhu/gorm"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

const (
	// apiVersion is version of API is provided by server
	apiVersion = "v1"
)

// NewBlogServiceServer NewblogServiceServer
func NewBlogServiceServer(db *gorm.DB) v1.BlogServiceServer {

	db.AutoMigrate(&blog.User{}, &blog.Blog{}, &blog.Comment{})

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

func (s *blogServiceServer) DB() *gorm.DB {
	return s.db
}

func (s *blogServiceServer) checkAPI(api string) error {
	// API version is "" means use current version of the service
	if len(api) > 0 {
		if apiVersion != api {
			return status.Errorf(codes.Unimplemented,
				"unsupported API version: service implements API version '%s', but asked for '%s'", apiVersion, api)
		}
	}
	return nil
}

func (s *blogServiceServer) ReadAllBlog(ctx context.Context, req *v1.ReadAllBlogRequest) (*v1.ReadAllBlogResponse, error) {
	// check if the API version requested by client is supported by server
	if err := s.checkAPI(req.Api); err != nil {
		return nil, err
	}

	blogs := []blog.Blog{}
	result := s.DB().Find(&blogs)
	if result.Error != nil {
		return nil, status.Error(codes.Unknown, "failed to retrieve all blog-> "+result.Error.Error())
	}
	return &v1.ReadAllBlogResponse{
		Blogs: toBlogs(blogs),
	}, nil
}

func (s *blogServiceServer) CreateBlog(ctx context.Context, req *v1.CreateBlogRequest) (*v1.CreateBlogResponse, error) {
	// check if the API version requested by client is supported by server
	if err := s.checkAPI(req.Api); err != nil {
		return nil, err
	}

	db := s.DB()
	tBlog := fromBlog(req.Blog)
	result := db.Create(tBlog)
	if result.Error != nil {
		return nil, status.Error(codes.Unknown, "create blog err for create blog-> "+db.Error.Error())
	}
	return &v1.CreateBlogResponse{
		Api: apiVersion,
		Id:  tBlog.ID.String(),
	}, nil
}

func (s *blogServiceServer) ReadBlog(ctx context.Context, req *v1.ReadBlogRequest) (*v1.ReadBlogResponse, error) {
	// check if the API version requested by client is supported by server
	if err := s.checkAPI(req.Api); err != nil {
		return nil, err
	}

	db := s.DB()
	ret := &blog.Blog{}
	if err := db.First(ret, "id = ?", req.Id).Error; err != nil {
		return nil, status.Error(codes.NotFound, fmt.Sprintf("find one goal err, id(%v) -> %v", req.Id, err.Error()))
	}

	return &v1.ReadBlogResponse{
		Api:   apiVersion,
		Blogs: toBlog(ret),
	}, nil
}

func (s *blogServiceServer) DeleteBlog(ctx context.Context, req *v1.DeleteBlogRequest) (*v1.DeleteBlogResponse, error) {
	// check if the API version requested by client is supported by server
	if err := s.checkAPI(req.Api); err != nil {
		return nil, err
	}
	db := s.DB()
	querySet := db.Delete(&blog.Blog{
		UUIDModel: blog.UUIDModel{
			ID: utils.Str2UUID(req.Id),
		},
	})
	if err := querySet.Error; err != nil {
		return nil, status.Error(codes.Unknown, fmt.Sprintf("delete err id(%v), err(%v)", req.Id, err))
	}
	return &v1.DeleteBlogResponse{
		Api:     apiVersion,
		Deleted: querySet.RowsAffected,
	}, nil
}
