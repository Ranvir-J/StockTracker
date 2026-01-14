package response

type PostResponse struct {
	Id       string `json:"id"`
	Partnum  string `json:"partnum"`
	Quantity int    `json:"quantity"`
}
