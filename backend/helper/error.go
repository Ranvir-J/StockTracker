package helper

func errorPanic(err error) {
	if err != nil {
		panic(err)
	}
}
