package helper

func ErrorPanic(err error) {
	if err != nil {
		panic(err)
	}
}

// error panic function? Does the equivalent of panic(err), shuts down program immediately
