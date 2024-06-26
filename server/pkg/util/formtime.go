package util

import (
	"strings"
	"time"
)

type FormDateTime struct {
	time.Time
}

const expiryDateLayout = "2006-01-02"

func (ct *FormDateTime) UnmarshalJSON(b []byte) (err error) {
	s := strings.Trim(string(b), "\"")
	if s == "null" {
		ct.Time = time.Time{}
		return
	}
	ct.Time, err = time.Parse(expiryDateLayout, s)
	return
}
