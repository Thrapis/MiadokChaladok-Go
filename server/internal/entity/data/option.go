package data

type Option struct {
	Id        int64   `json:"id"`
	ProductId int64   `json:"productId"`
	Name      string  `json:"name"`
	Price     float32 `json:"price"`
}
