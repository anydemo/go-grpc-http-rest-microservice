package blog

import (
	"time"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

// UUIDModel corresponds to gorm.Model with ID replaced by uuid
type UUIDModel struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4();column:id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
}

// BeforeCreate callback for gorm model create hook
func (u *UUIDModel) BeforeCreate(scope *gorm.Scope) error {
	id := uuid.NewV4()
	return scope.SetColumn("ID", id)
}

// User user
type User struct {
	UUIDModel
	Name    string
	Email   string
	Enabled bool
}

// Blog blog model
type Blog struct {
	UUIDModel
	Title     string
	content   string
	CreatorID string
}

// Comment comment model
type Comment struct {
	UUIDModel
	Content   string
	CreatorID string
}
