package repository

import (
	"context"
	"stBackend/model"
)

type PostRepository interface {
	Save(ctx context.Context, post model.Post)
	Update(ctx context.Context, post model.Post)
	Delete(ctx context.Context, post model.Post)
	FindById(ctx context.Context, post model.Post) (model.Post, error)
	GetAll(ctx context.Context, post model.Post) []model.Post
}
