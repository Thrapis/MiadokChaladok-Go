package http

import (
	"bytes"
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

func TestGetCartItems(t *testing.T) {
	request := model.GetCartItemsRequest{
		OptionIDs: []uint{3, 4, 7},
	}
	emptyRequest := model.GetCartItemsRequest{}
	response := []model.OptionItemResponse{
		{
			ID:                3,
			Name:              "Opt1",
			Price:             13,
			Volume:            8,
			ProductID:         2,
			ProductName:       "Prod2",
			ProductImagePath:  "img/prod2_1.jpg",
			QuantityAvailable: 277,
			ShipmentMethods: []model.OptionItemShipmentMethodResponse{
				{ID: 1, Name: "Shipment1"},
				{ID: 2, Name: "Shipment2"},
				{ID: 3, Name: "Shipment3"},
				{ID: 4, Name: "Shipment4"},
			},
		},
		{
			ID:                4,
			Name:              "Opt2",
			Price:             15,
			Volume:            10,
			ProductID:         2,
			ProductName:       "Prod2",
			ProductImagePath:  "img/prod2_2.jpg",
			QuantityAvailable: 101,
			ShipmentMethods: []model.OptionItemShipmentMethodResponse{
				{ID: 1, Name: "Shipment1"},
				{ID: 2, Name: "Shipment2"},
				{ID: 3, Name: "Shipment3"},
			},
		},
		{
			ID:                7,
			Name:              "Opt2",
			Price:             11,
			Volume:            7,
			ProductID:         3,
			ProductName:       "Prod3",
			ProductImagePath:  "img/prod3_2.jpg",
			QuantityAvailable: 63,
			ShipmentMethods: []model.OptionItemShipmentMethodResponse{
				{ID: 1, Name: "Shipment1"},
				{ID: 4, Name: "Shipment4"},
			},
		},
	}
	emptyResponse := []model.OptionItemResponse{}

	tests := []struct {
		name         string
		setupGot     func() (*httptest.ResponseRecorder, *gin.Context)
		setupMocks   func() (*hmocks.IOptionUseCase, *amocks.ILogger)
		expectedCode int
		checkBody    bool
		expectedBody []byte
	}{
		{
			name: "Valid request: with correct json body",
			setupGot: func() (*httptest.ResponseRecorder, *gin.Context) {
				recorder := httptest.NewRecorder()
				context, _ := gin.CreateTestContext(recorder)

				jsonBody, _ := json.Marshal(request)
				context.Request = httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer(jsonBody))
				context.Request.Header.Set("Content-Type", "application/json")

				return recorder, context
			},
			setupMocks: func() (*hmocks.IOptionUseCase, *amocks.ILogger) {
				useCase := hmocks.NewIOptionUseCase(t)
				useCase.On("GetCartItems", mock.AnythingOfType("*gin.Context"), &request).Return(response, nil)
				logger := amocks.NewILogger(t)
				return useCase, logger
			},
			expectedCode: http.StatusOK,
			checkBody:    true,
			expectedBody: func() []byte {
				body := model.HTTPResponse[[]model.OptionItemResponse]{Payload: response}
				array, _ := json.Marshal(body)
				return array
			}(),
		},
		{
			name: "Valid request: with empty body",
			setupGot: func() (*httptest.ResponseRecorder, *gin.Context) {
				recorder := httptest.NewRecorder()
				context, _ := gin.CreateTestContext(recorder)

				jsonBody, _ := json.Marshal(emptyRequest)
				context.Request = httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer(jsonBody))
				context.Request.Header.Set("Content-Type", "application/json")

				return recorder, context
			},
			setupMocks: func() (*hmocks.IOptionUseCase, *amocks.ILogger) {
				useCase := hmocks.NewIOptionUseCase(t)
				useCase.On("GetCartItems", mock.AnythingOfType("*gin.Context"), &emptyRequest).Return(emptyResponse, nil)
				logger := amocks.NewILogger(t)
				return useCase, logger
			},
			expectedCode: http.StatusOK,
			checkBody:    true,
			expectedBody: func() []byte {
				body := model.HTTPResponse[[]model.OptionItemResponse]{Payload: emptyResponse}
				array, _ := json.Marshal(body)
				return array
			}(),
		},
		{
			name: "Invalid request: with invalid json",
			setupGot: func() (*httptest.ResponseRecorder, *gin.Context) {
				recorder := httptest.NewRecorder()
				context, _ := gin.CreateTestContext(recorder)

				context.Request = httptest.NewRequest(http.MethodPost, "/", bytes.NewBuffer([]byte("in:\"nope\"}")))
				context.Request.Header.Set("Content-Type", "application/json")

				return recorder, context
			},
			setupMocks: func() (*hmocks.IOptionUseCase, *amocks.ILogger) {
				useCase := hmocks.NewIOptionUseCase(t)
				logger := amocks.NewILogger(t)
				logger.On("Error", mock.Anything, "error parsing request body")
				return useCase, logger
			},
			expectedCode: http.StatusBadRequest,
			checkBody:    false,
			expectedBody: nil,
		},
	}

	for _, testCase := range tests {
		t.Run(testCase.name, func(t *testing.T) {
			// Arrange
			recorder, context := testCase.setupGot()
			// Mock setting
			useCase, logger := testCase.setupMocks()
			controller := dhttp.NewOptionController(useCase, logger)

			// Act
			controller.GetCartItems(context)

			// Assert
			assert.Equal(t, testCase.expectedCode, recorder.Code)

			if testCase.checkBody {
				actualBody := recorder.Body.Bytes()
				assert.JSONEq(t, string(testCase.expectedBody), string(actualBody))
			}

			useCase.AssertExpectations(t)
			logger.AssertExpectations(t)
		})
	}
}
