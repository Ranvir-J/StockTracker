package response

type WebResponse struct { // expected json format from background.js
	Status string `json:"partNumber" binding:"required"`
	Code   int    `json:"quantity" binding:"required"`
	Data   interface{}
}
