package http

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	dhttp "miadok-chaladok/internal/delivery/http"
	"miadok-chaladok/internal/model"
	amocks "miadok-chaladok/test/internal/app/mocks"
	hmocks "miadok-chaladok/test/internal/delivery/http/mocks"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func TestGetFilterLists(t *testing.T) {
	response := &model.FilterListsResponse{
		Categories: []model.FilterRecordResponse{
			{ID: 1, Name: "Category1"},
			{ID: 2, Name: "Category2"},
			{ID: 3, Name: "Category3"},
		},
		Tastes: []model.FilterRecordResponse{
			{ID: 1, Name: "Taste1"},
			{ID: 2, Name: "Taste2"},
		},
		ShipmentMethods: []model.FilterRecordResponse{
			{ID: 1, Name: "Shipment1"},
			{ID: 2, Name: "Shipment2"},
			{ID: 3, Name: "Shipment3"},
			{ID: 4, Name: "Shipment4"},
		},
	}

	tests := []struct {
		name         string
		setupGot     func() (*httptest.ResponseRecorder, *gin.Context)
		setupMocks   func() *hmocks.IListsUseCase
		expectedCode int
		expectedBody []byte
	}{
		{
			name: "Valid request",
			setupGot: func() (*httptest.ResponseRecorder, *gin.Context) {
				recorder := httptest.NewRecorder()
				context, _ := gin.CreateTestContext(recorder)
				return recorder, context
			},
			setupMocks: func() *hmocks.IListsUseCase {
				useCase := hmocks.NewIListsUseCase(t)
				useCase.On("GetFilterLists", mock.AnythingOfType("*gin.Context")).Return(response, nil)
				return useCase
			},
			expectedCode: http.StatusOK,
			expectedBody: func() []byte {
				body := model.HTTPResponse[*model.FilterListsResponse]{Payload: response}
				array, _ := json.Marshal(body)
				return array
			}(),
		},
	}

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			// Arrange
			recorder, context := testCase.setupGot()
			// Mock setting
			useCase := testCase.setupMocks()
			log := amocks.NewILogger(t)
			controller := dhttp.NewListsController(useCase, log)

			// Act
			controller.GetFilterLists(context)

			// Assert
			assert.Equal(t, testCase.expectedCode, recorder.Code)

			actualBody := recorder.Body.Bytes()

			assert.JSONEq(t, string(testCase.expectedBody), string(actualBody))

			useCase.AssertExpectations(t)
		})
	}
}
