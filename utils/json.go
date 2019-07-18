package utils

import (
	"encoding/json"
	"log"
)

// ReadableJSON human readable json
func ReadableJSON(t interface{}) string {
	buf, err := json.MarshalIndent(t, "", "  ")
	if err != nil {
		log.Printf("marshal %v err: %v", t, err)
		return ""
	}
	return string(buf)
}
