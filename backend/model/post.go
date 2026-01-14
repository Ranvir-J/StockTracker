package model

import "time"

type Post struct { // post = create (?)
	partnum   string
	quantity  int
	createdAt time.Time
	updatedAt time.Time
}
