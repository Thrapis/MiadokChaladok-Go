package converter

import (
	"testing"
	"time"

	"miadok-chaladok/internal/entity"
	"miadok-chaladok/internal/model"
	"miadok-chaladok/internal/model/converter"

	"github.com/stretchr/testify/assert"
)

func TestReviewToDescriptionResponse(t *testing.T) {
	got := entity.Review{
		AuthorName: "Gzegosz",
		BuyDate:    time.Date(2024, 6, 13, 12, 0, 0, 0, time.UTC),
		Rating:     4,
		Comment:    "I like this product very much!",
	}
	expected := model.ReviewDescriptionResponse{
		AuthorName: "Gzegosz",
		BuyDate:    time.Date(2024, 6, 13, 12, 0, 0, 0, time.UTC),
		Rating:     4,
		Comment:    "I like this product very much!",
	}

	actual := *converter.ReviewToDescriptionResponse(&got)

	assert.Equal(t, expected, actual)
}
