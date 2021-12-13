package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name        string             `json:"name"`
	Skills      []string           `json:"skills"`
	MembersId   []string           `json:"members_id"`
	Description string             `json:"description"`
	Phases      []string           `json:"phases"`
	State       bool               `json:"state"`
	CreateAt    time.Time          `bson:"created_at" json:"created_at"`
	UpdateAt    time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type Projects []*Project
