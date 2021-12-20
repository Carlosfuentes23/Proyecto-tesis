package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Phase struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name          string             `json:"name"`
	ProjectId     string             `json:"project_id"`
	Skills        []string           `json:"skills"`
	MembersId     []string           `json:"members_id"`
	Description   string             `json:"description"`
	State         bool               `json:"state"`
	CreateAt      time.Time          `bson:"created_at" json:"created_at"`
	DateEstimated time.Time          `bson:"date_estimated" json:"date_estimated"`
	UpdateAt      time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type Phases []*Phase
