package controller

import (
	"net/http"
	"stBackend/data/request" // from repo
	"stBackend/data/response"
	"stBackend/helper"  // from repo
	"stBackend/service" // from repo

	"github.com/julienschmidt/httprouter"
)

type PostController struct {
	PostService service.PostService
}

func NewPostController(postService service.PostService) *PostController {
	return &PostController{PostService: postService}
}

// create function
func (controller *PostController) Create(writer http.ResponseWriter, requests *http.Request, params httprouter.Params) {
	postCreateRequest := request.PostCreateRequest{}
	helper.ReadRequest(requests, &postCreateRequest)

	controller.PostService.Create(requests.Context(), postCreateRequest)
	web_response := response.WebResponse{
		Code:   67,
		Status: "Good 2 Go",
		Data:   nil,
	}

	helper.WriteResponse(writer, web_response)

}

// update function
func (controller *PostController) Update(writer http.ResponseWriter, requests *http.Request, params httprouter.Params) {
	postUpdateRequest := request.PostUpdateRequest{}
	helper.ReadRequest(requests, &postUpdateRequest)

	postId := params.ByName("postId")
	postUpdateRequest.Id = postId

	controller.PostService.Update(requests.Context(), postUpdateRequest)
	web_response := response.WebResponse{
		Code:   67,
		Status: "Good 2 Go",
		Data:   nil,
	}

	helper.WriteResponse(writer, web_response)

}

// """"findall"""" function (im calling it get all it makes more sense)
func (controller *PostController) GetAll(writer http.ResponseWriter, requests *http.Request, params httprouter.Params) {

	result := controller.PostService.GetAll(requests.Context())
	web_response := response.WebResponse{
		Code:   67,
		Status: "Good 2 Go",
		Data:   result,
	}

	helper.WriteResponse(writer, web_response)

}

// find by id function
func (controller *PostController) FindbyId(writer http.ResponseWriter, requests *http.Request, params httprouter.Params) {
	postId := params.ByName("postId")
	result := controller.PostService.FindById(requests.Context(), postId)
	web_response := response.WebResponse{
		Code:   67,
		Status: "Good 2 Go",
		Data:   result,
	}

	helper.WriteResponse(writer, web_response)
}

// Delete
func (controller *PostController) Delete(writer http.ResponseWriter, requests *http.Request, params httprouter.Params) {
	postId := params.ByName("postId")
	controller.PostService.Delete(requests.Context(), postId)

	web_response := response.WebResponse{
		Code:   67,
		Status: "Good 2 Go",
		Data:   nil,
	}

	helper.WriteResponse(writer, web_response)
}
