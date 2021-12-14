package project_repository

import (
	"context"
	"main/database"
	m "main/models"
	phase_repository "main/repositories/phase.repository"
	user_repository "main/repositories/user.repository"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collection = database.GetCollection("projects")
var ctx = context.Background()

func CreateProject(project m.Project) error {
	var err error

	_, err = collection.InsertOne(ctx, project)

	if err != nil {
		return err
	}

	return nil
}

func GetProjectList() (m.Projects, error) {
	var projects m.Projects
	filter := bson.D{}

	cursor, err := collection.Find(ctx, filter)

	if err != nil {
		return nil, err
	}

	for cursor.Next(ctx) {
		var project m.Project
		err = cursor.Decode(&project)

		if err != nil {
			return nil, err
		}

		projects = append(projects, &project)
	}

	return projects, nil
}

func GetProjectById(projectId string) (*m.Project, error) {
	var project m.Project
	var err error

	uid, err := primitive.ObjectIDFromHex(projectId)

	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": uid}

	err = collection.FindOne(ctx, filter).Decode(&project)
	if err != nil {
		return nil, err
	}

	return &project, nil
}

func UpdateProject(project m.Project, projectId string) error {
	var err error
	uid, _ := primitive.ObjectIDFromHex(projectId)

	filter := bson.M{"_id": uid}

	Update := bson.M{
		"$set": bson.M{
			"name":        project.Name,
			"skills":      project.Skills,
			"membersId":   project.MembersId,
			"description": project.Description,
			"phases":      project.Phases,
			"state":       project.State,
			"updated_at":  time.Now(),
		}}

	_, err = collection.UpdateOne(ctx, filter, Update)
	if err != nil {
		return err
	}

	return nil
}

func GetProjectMembers(membersId []string) (m.Users, error) {
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

func GetProjectPhases(phasesId []string) (m.Phases, error) {
	var phases m.Phases

	for _, phaseId := range phasesId {
		phase, err := phase_repository.GetPhaseById(phaseId)

		if err != nil {
			return phases, err
		}

		phases = append(phases, phase)
	}

	return phases, nil
}
