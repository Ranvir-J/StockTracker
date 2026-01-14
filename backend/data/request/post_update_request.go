package request

type PostUpdateRequest struct {
	Id       string
	Partnum  string `json:"partNum"`
	Quantity int    `json:"quantity"`
}
