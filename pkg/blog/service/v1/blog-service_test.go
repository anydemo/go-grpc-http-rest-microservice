package v1

import (
	"context"
	"testing"

	"github.com/jinzhu/gorm"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	datasource "github.com/anydemo/go-grpc-http-rest-microservice/datasource/gorm"
	"github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog"
	v1 "github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog/api/v1"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func DB(t *testing.T) *gorm.DB {
	cfg := &datasource.Config{Addr: "postgres://user:password@localhost:5433/weibo?sslmode=disable"}
	db, err := datasource.NewDB(cfg)
	require.NoError(t, err)
	db.AutoMigrate(&blog.User{}, &blog.Blog{}, &blog.Comment{})
	return db
}

func NewBlogSvr(t *testing.T) v1.BlogServiceServer {
	db := DB(t)
	return NewBlogServiceServer(db)
}

func TestBlogSvrCreate(t *testing.T) {
	ctx := context.TODO()
	blogSvr := NewBlogSvr(t)
	resCreate, err := blogSvr.CreateBlog(ctx, &v1.CreateBlogRequest{
		Api: apiVersion,
		Blog: &v1.Blog{
			Title:       "new title",
			Description: "new blog descrition",
			CreatorId:   "96dc34e7-160d-4da3-945c-5437571a7985",
		},
	})
	assert.NoError(t, err)
	assert.NotEqual(t, "", resCreate.Id)

	resDel, err := blogSvr.DeleteBlog(ctx, &v1.DeleteBlogRequest{
		Api: apiVersion,
		Id:  resCreate.Id,
	})
	assert.NoError(t, err)
	assert.EqualValues(t, 1, resDel.Deleted)
}
