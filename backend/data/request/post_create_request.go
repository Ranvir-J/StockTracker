package request

type PostCreateRequest struct {
	Partnum  string `json:"partNum"`
	Quantity int    `json:"quantity"`
}
