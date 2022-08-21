package phase_repository

import (
	"context"
	"main/database"
	m "main/models"
	abilitie_repository "main/repositories/abilitie.repository"
	user_repository "main/repositories/user.repository"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collection = database.GetCollection("phases")
var ctx = context.Background()

func CreatePhase(phase m.Phase) error {
	var err error

	_, err = collection.InsertOne(ctx, phase)

	if err != nil {
		return err
	}

	return nil
}

func GetPhaseList() (m.Phases, error) {
	var phases m.Phases
	filter := bson.D{}

	cur, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	for cur.Next(ctx) {
		var phase m.Phase

		err := cur.Decode(&phase)
		if err != nil {
			return nil, err
		}

		phases = append(phases, &phase)
	}
	return phases, nil
}

func GetPhaseById(phaseId string) (*m.Phase, error) {
	var phase m.Phase
	var err error

	uid, err := primitive.ObjectIDFromHex(phaseId)

	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": uid}

	err = collection.FindOne(ctx, filter).Decode(&phase)

	if err != nil {
		return nil, err
	}

	return &phase, nil
}

func UpdatePhase(phase m.Phase) error {
	var err error

	filter := bson.M{"_id": phase.ID}

	_, err = collection.UpdateOne(ctx, filter, bson.M{"$set": phase})

	if err != nil {
		return err
	}

	return nil

}

func GetPhaseMembers(membersId []string) (m.Users, error) {
	var members m.Users

	for _, memberId := range membersId {
		user, err := user_repository.ReadById(memberId)

		if err != nil {
			return members, err
		}

		members = append(members, user)
	}

	return members, nil
}

func GetAbilitiesPhase(abilitiesId []string) (m.Abilities, error) {
	var abilities m.Abilities

	if len(abilitiesId) > 0 {
		for _, abilityId := range abilitiesId {
			ability, err := abilitie_repository.GetAbilitieById(abilityId)

			if err != nil {
				return abilities, err
			}

			abilities = append(abilities, ability)
		}
	}

	return abilities, nil
}
