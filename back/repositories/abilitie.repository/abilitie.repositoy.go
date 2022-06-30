package abilitie_repository

import (
	"context"
	"main/database"
	m "main/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collection = database.GetCollection("abilities")
var ctx = context.Background()

func CreateAbilite(abilite m.Abilitie) error {
	var err error

	_, err = collection.InsertOne(ctx, abilite)

	if err != nil {
		return err
	}

	return nil
}

func GetAbilitieList() (m.Abilities, error) {
	var abilites m.Abilities
	filter := bson.D{}

	cur, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	for cur.Next(ctx) {
		var abilite m.Abilitie

		err := cur.Decode(&abilite)
		if err != nil {
			return nil, err
		}

		abilites = append(abilites, &abilite)
	}
	return abilites, nil
}

func GetAbilitieById(abiliteId string) (*m.Abilitie, error) {
	var abilite m.Abilitie
	var err error

	uid, err := primitive.ObjectIDFromHex(abiliteId)

	if err != nil {
		return nil, err
	}

	err = collection.FindOne(ctx, bson.M{"_id": uid}).Decode(&abilite)

	if err != nil {
		return nil, err
	}

	return &abilite, nil
}

func UpdateAbilitie(abilite m.Abilitie) error {
	var err error

	filter := bson.M{"_id": abilite.ID}

	_, err = collection.UpdateOne(ctx, filter, abilite)

	if err != nil {
		return err
	}

	return nil
}

func DeleteAbilitie(abiliteId string) error {
	var err error

	uid, err := primitive.ObjectIDFromHex(abiliteId)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": uid}

	_, err = collection.DeleteOne(ctx, filter)

	if err != nil {
		return err
	}

	return nil
}

func GetAbilitiesByProjectId(projectId string) (m.Abilities, error) {
	var abilites m.Abilities
	var err error

	filter := bson.M{"id_project": projectId}

	cur, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	for cur.Next(ctx) {
		var abilite m.Abilitie

		err := cur.Decode(&abilite)
		if err != nil {
			return nil, err
		}

		abilites = append(abilites, &abilite)
	}
	return abilites, nil
}
