package repository

import (
	"context"
	"stBackend/model"
)

type PostRepository interface {
	Save(ctx context.Context, post model.Post)
	Update(ctx context.Context, post model.Post)
	Delete(ctx context.Context, postId string)
	FindById(ctx context.Context, postId string) (model.Post, error)
	GetAll(ctx context.Context) []model.Post
}
