package response

type WebResponse struct { // expected json format from background.js
	PartNumber string `json:"partNumber" binding:"required"`
	Quantity   int    `json:"quantity" binding:"required"`
	Data       interface{}
}
