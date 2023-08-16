package data

type Recommedation struct {
	Id        int64  `json:"Id"`
	ProductId int64  `json:"ProductId"`
	Notes     string `json:"Notes"`
}
