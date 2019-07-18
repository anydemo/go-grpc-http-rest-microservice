package gorm

import (
	"fmt"

	"github.com/jinzhu/gorm"
	log "github.com/sirupsen/logrus"
)

// Config config for gorm
type Config struct {
	Addr string
}

// DB gorm.DB wrapper
type DB struct {
	*gorm.DB
}

// Tx represents Transaction
type Tx struct {
	DB
}

// NewDB new gorm.DB
func NewDB(conf *Config) (*gorm.DB, error) {
	db, err := gorm.Open(
		"postgres", conf.Addr)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %v", err)
	}
	// debug info for db
	db.LogMode(true)
	db.SingularTable(true)
	// prevent update without where clause
	db.BlockGlobalUpdate(true)
	return db, err
}

// RunInTransaction wraps function in db transaction
func (db *DB) RunInTransaction(fn func(*Tx) error) error {
	tx := &Tx{
		DB: DB{
			DB: db.DB.Begin(),
		},
	}
	if err := fn(tx); err != nil {
		rollbackErr := tx.Rollback().Error
		if rollbackErr != nil {
			log.Warnf("failed to rollback transaction: %v", rollbackErr)
		}
		return err
	}
	return tx.Commit().Error
}
