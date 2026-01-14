package model

import "time"

type Post struct { // post = create (?)
	Partnum   string
	Quantity  int
	CreatedAt time.Time
	UpdatedAt time.Time
}
