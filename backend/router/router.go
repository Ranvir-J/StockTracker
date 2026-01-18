package router

import (
	"fmt"
	"net/http"
	"stBackend/controller"

	"github.com/julienschmidt/httprouter"
)

func NewRouter(postController *controller.PostController) *httprouter.Router {
	router := httprouter.New()

	router.GET("/", func(writer http.ResponseWriter, req *http.Request, params httprouter.Params) {
		fmt.Print(writer, "Welcome Home")
	})

	router.GET("/api/post", postController.GetAll)
	router.GET("/api/post/:postId", postController.FindById) // placeholder postid
	router.POST("/api/post", postController.Create)
	router.PATCH("/api/post/:postId", postController.Update)
	router.DELETE("/api/post", postController.Delete)

	return router
}
