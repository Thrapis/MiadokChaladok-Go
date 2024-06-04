package data

import (
	"miadok-chaladok/internal/entity"
	"time"

	"github.com/google/uuid"
)

type Order struct {
	entity.GormModel
	CustomerName     string    `json:"customerName"`
	Email            string    `json:"email"`
	Phone            string    `json:"phone"`
	PaymentNumber    uuid.UUID `json:"paymentNumber"`
	PaymentDate      time.Time `json:"paymentDate"`
	Address          string    `json:"address"`
	Comment          string    `json:"comment"`
	PromoCode        string    `json:"promoCode"`
	ShipmentMethodID uint      `json:"shipmentMethodID"`
	DeliveryDate     time.Time `json:"deliveryDate"`
}
