package utils

import (
	uuid "github.com/satori/go.uuid"
)

// Str2UUID string to UUID
func Str2UUID(input string) uuid.UUID {
	return uuid.FromStringOrNil(input)
}
