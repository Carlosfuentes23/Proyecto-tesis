package project_service

import (
	m "main/models"

	projectRepo "main/repositories/project.repository"
)

func CreateProject(project m.Project) error {

	err := projectRepo.CreateProject(project)

	if err != nil {
		return err
	}

	return nil
}

func GetProjectList() (m.Projects, error) {

	projects, err := projectRepo.GetProjectList()

	if err != nil {
		return nil, err
	}

	return projects, nil
}

func GetProjectById(projectId string) (*m.Project, error) {

	project, err := projectRepo.GetProjectById(projectId)

	if err != nil {
		return nil, err
	}

	return project, nil
}

func UpdateProject(project m.Project, projectId string) error {

	err := projectRepo.UpdateProject(project, projectId)

	if err != nil {
		return err
	}

	return nil
}

func GetProjectMembers(projectId string) (m.Users, error) {
	project, err := GetProjectById(projectId)
	if err != nil {
		return nil, err
	}

	members, err := projectRepo.GetProjectMembers(project.MembersId)

	if err != nil {
		return nil, err
	}

	return members, nil
}

func GetProjectPhases(projectId string) (m.Phases, error) {
	project, err := GetProjectById(projectId)
	phases, err := projectRepo.GetProjectPhases(project.Phases)

	if err != nil {
		return nil, err
	}

	return phases, nil
}
