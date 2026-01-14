package repository

import (
	"context"
	"errors"
	"fmt"
	"stBackend/helper"
	"stBackend/model"
	"stBackend/prisma/db"
)

type PostRepositoryImplement struct { // check if a post repo implementation has all interfaces
	Db *db.PrismaClient
}

// Delete implements [PostRepository].
func (p *PostRepositoryImplement) Delete(ctx context.Context, postId string) {
	result, err := p.Db.Post.FindUnique(db.Post.Partnum.Equals(postId)).Delete().Exec(ctx)
	helper.ErrorPanic(err)
	fmt.Println("Rows affected: ", result)
}

// FindById implements [PostRepository].
func (p *PostRepositoryImplement) FindById(ctx context.Context, postId string) (model.Post, error) {
	post, err := p.Db.Post.FindFirst(db.Post.Partnum.Equals(postId)).Exec(ctx)
	// p.Db.Post represents the prisma client (SQL equivalent: FROM Post)
	// FindFirst() represents a WHERE clause (so here, it's WHERE Post.Partnum = postID)
	// FindFirst() limits to returning 0 or 1 record
	// Exec(ctx) for sending information to database
	helper.ErrorPanic(err)

	postData := model.Post{
		Partnum:  post.Partnum,
		Quantity: post.Quantity,
	}

	if post != nil {
		return postData, nil
	} else {
		return postData, errors.New("Could not find corresponding id.")
	}
}

// GetAll implements [PostRepository].
func (p *PostRepositoryImplement) GetAll(ctx context.Context) []model.Post {
	allPosts, err := p.Db.Post.FindMany().Exec(ctx)
	helper.ErrorPanic(err)

	var posts []model.Post

	for _, post := range allPosts {
		postData := model.Post{
			Partnum:  post.Partnum,
			Quantity: post.Quantity,
		}
		posts = append(posts, postData)
	}
	return posts
}

// Save implements [PostRepository].
func (p *PostRepositoryImplement) Save(ctx context.Context, post model.Post) {
	result, err := p.Db.Post.CreateOne(
		db.Post.Partnum.Set(post.Partnum),
		db.Post.Quantity.Set(post.Quantity),
	).Exec(ctx)
	helper.ErrorPanic(err)
	fmt.Println("Rows affected: ", result)
}

// Update implements [PostRepository].
func (p *PostRepositoryImplement) Update(ctx context.Context, post model.Post) {
	result, err := p.Db.Post.FindMany(db.Post.Partnum.Equals(post.Partnum)).Update(
		db.Post.Partnum.Set(post.Partnum),
		db.Post.Quantity.Set(post.Quantity),
	).Exec(ctx)
	helper.ErrorPanic(err)
	fmt.Println("Rows affected: ", result)
}

func NewPostRepo(Db *db.PrismaClient) PostRepository {
	return &PostRepositoryImplement{Db: Db}
}
