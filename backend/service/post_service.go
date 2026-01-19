package service

import (
	"context"
	"stBackend/data/request"
	"stBackend/data/response"
)

type PostService interface { // CRUD interface
	Create(ctx context.Context, request request.PostCreateRequest)
	Update(ctx context.Context, request request.PostUpdateRequest)
	Delete(ctx context.Context, postId string)
	FindById(ctx context.Context, postId string) response.PostResponse
	GetAll(ctx context.Context) []response.PostResponse
}
