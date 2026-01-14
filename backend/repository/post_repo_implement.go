package repository

import (
	"context"
	"stBackend/model"
	"stBackend/prisma/db"
)

type PostRepositoryImplement struct { // check if a post repo implementation has all interfaces
	db *db.PrismaClient
}

// Delete implements [PostRepository].
func (p *PostRepositoryImplement) Delete(ctx context.Context, post model.Post) {
	panic("unimplemented")
}

// FindById implements [PostRepository].
func (p *PostRepositoryImplement) FindById(ctx context.Context, post model.Post) (model.Post, error) {
	panic("unimplemented")
}

// GetAll implements [PostRepository].
func (p *PostRepositoryImplement) GetAll(ctx context.Context, post model.Post) []model.Post {
	panic("unimplemented")
}

// Save implements [PostRepository].
func (p *PostRepositoryImplement) Save(ctx context.Context, post model.Post) {
	panic("unimplemented")
}

// Update implements [PostRepository].
func (p *PostRepositoryImplement) Update(ctx context.Context, post model.Post) {
	panic("unimplemented")
}

func NewPostRepo(db *db.PrismaClient) PostRepository {
	return &PostRepositoryImplement{db: db}
}
