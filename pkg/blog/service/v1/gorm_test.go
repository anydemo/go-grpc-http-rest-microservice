package v1

import (
	"testing"

	"github.com/anydemo/go-grpc-http-rest-microservice/pkg/blog"
	"github.com/stretchr/testify/assert"
)

func TestGorm(t *testing.T) {
	db := DB(t)
	user1 := &blog.User{Name: "u1", Email: "u1@example.com", Enabled: true}
	user2 := &blog.User{Name: "name", Email: "u1@example.com", Enabled: true}
	c1 := blog.Comment{Content: "c1", Creator: user1}
	c2 := blog.Comment{Content: "c2", Creator: user2}
	bg := &blog.Blog{Title: "title", Creator: user1, Comments: []blog.Comment{c1, c2}}
	db.Create(bg)
	assert.NoError(t, db.Error)
}

func TestQueryBlog(t *testing.T) {
	db := DB(t)
	bg := blog.Blog{}
	db.Find(&bg)
	assert.Equal(t, "title", bg.Title)
	u := blog.User{}
	db.Model(&bg).
		Related(&u, "CreatorID").
		Find(&u)
	assert.Equal(t, "u1", u.Name)

	c := []blog.Comment{}
	err := db.Model(&bg).
		Related(&c, "Comments").
		Find(&c).Error
	assert.NoError(t, err)

	tbg := blog.Blog{}
	db.Preload("Creator").Find(&tbg)
	assert.Equal(t, "title", tbg.Title)
	assert.NotNil(t, tbg.Creator)
}

func TestQueryBlogGORM(t *testing.T) {
	db := DB(t)
	bg := blog.Blog{}
	notFound := db.First(&bg, "id = ?", "aaa").RecordNotFound()
	assert.Equal(t, false, notFound)
}
