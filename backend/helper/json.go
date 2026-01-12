package helper

import (
	"encoding/json"
	"net/http"
)

func readRequest(r *http.Request, result interface{}) { // get request from extension
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(result)
	errorPanic(err)
}

func writeResponse(w http.ResponseWriter, response interface{}) {
	w.Header().Add("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	err := encoder.Encode(response)
	errorPanic(err)
}
