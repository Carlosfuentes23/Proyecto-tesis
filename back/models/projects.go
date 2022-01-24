package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name          string             `json:"name"`
	LeaderId      string             `json:"leaderid"`
	Skills        []string           `json:"skills"`
	MembersId     []string           `json:"membersid"`
	Description   string             `json:"description"`
	Phases        []string           `json:"phases"`
	State         bool               `json:"state"`
	CreateAt      time.Time          `bson:"created_at" json:"created_at"`
	DateEstimated time.Time          `bson:"date_estimated" json:"date_estimated"`
	UpdateAt      time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type Projects []*Project
