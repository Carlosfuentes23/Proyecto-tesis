package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Note struct {
	Note    string `json:"note"`
	Date    string `json:"date"`
	PhaseId string `json:"phaseId"`
}

type Member struct {
	Id_member string `json:"id_member"`
	Name      string `json:"name"`
	Lastname  string `json:"lastname"`
	Notes     []Note `json:"notes"`
}

type Members []*Member

type Abilitie struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Id_project  string             `json:"id_project"`
	Members     []Member           `json:"members"`
	State       string             `json:"state"`
	CreateAt    time.Time          `bson:"created_at" json:"created_at"`
	UpdateAt    time.Time          `bson:"updated_at" json:"updated_at,omitempty"`
}

type Abilities []*Abilitie
