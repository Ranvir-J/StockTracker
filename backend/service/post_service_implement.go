package service

import (
	"context"
	"stBackend/data/request"
	"stBackend/data/response"
	"stBackend/helper"
	"stBackend/model"
	"stBackend/repository"
)

type PostServiceImplement struct {
	PostRepository repository.PostRepository
}

// Create implements [PostService].
func (p *PostServiceImplement) Create(ctx context.Context, request request.PostCreateRequest) {
	postData := model.Post{
		Partnum:  request.Partnum,
		Quantity: request.Quantity,
	}
	p.PostRepository.Save(ctx, postData)
}

// Delete implements [PostService].
func (p *PostServiceImplement) Delete(ctx context.Context, postId string) {
	post, err := p.PostRepository.FindById(ctx, postId)
	helper.ErrorPanic(err)
	p.PostRepository.Delete(ctx, post.Id)
}

// FindById implements [PostService].
func (p *PostServiceImplement) FindById(ctx context.Context, postId string) response.PostResponse {
	post, err := p.PostRepository.FindById(ctx, postId)
	helper.ErrorPanic(err)

	postResponse := response.PostResponse{
		Id:       post.Id,
		Partnum:  post.Partnum,
		Quantity: post.Quantity,
	}

	return postResponse
}

// GetAll implements [PostService].
func (p *PostServiceImplement) GetAll(ctx context.Context) []response.PostResponse {
	posts := p.PostRepository.GetAll(ctx)

	var postResps []response.PostResponse

	for _, v := range posts {
		post := response.PostResponse{
			Id:       v.Id,
			Partnum:  v.Partnum,
			Quantity: v.Quantity,
		}
		postResps = append(postResps, post)
	}

	return postResps
}

// Update implements [PostService].
func (p *PostServiceImplement) Update(ctx context.Context, request request.PostUpdateRequest) {
	postData := model.Post{
		Id:       request.Id,
		Partnum:  request.Partnum,
		Quantity: request.Quantity,
	}
	p.PostRepository.Update(ctx, postData)
}

func NewPostServiceImplement(postRepository repository.PostRepository) PostService {
	return &PostServiceImplement{PostRepository: postRepository}
}
