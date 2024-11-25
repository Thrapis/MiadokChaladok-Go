package utils

import (
	"testing"
	"time"

	"miadok-chaladok/pkg/utils"

	"github.com/stretchr/testify/assert"
)

func TestUnmarshalJSON(t *testing.T) {
	tests := []struct {
		got      []byte
		expected utils.FormDateTime
	}{
		{
			got: []byte("2024-11-24"),
			expected: utils.FormDateTime{
				Time: time.Date(2024, 11, 24, 0, 0, 0, 0, time.UTC),
			},
		},
		{
			got: []byte("null"),
			expected: utils.FormDateTime{
				Time: time.Time{},
			},
		},
	}

	for _, testCase := range tests {
		actual := utils.FormDateTime{}
		err := actual.UnmarshalJSON(testCase.got)

		assert.NoError(t, err)
		assert.Equal(t, testCase.expected, actual)
	}
}
