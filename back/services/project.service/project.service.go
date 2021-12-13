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

func GetProjectMembers(membersId []string) (m.Users, error) {

	members, err := projectRepo.GetProjectMembers(membersId)

	if err != nil {
		return nil, err
	}

	return members, nil
}

func GetProjectPhases(phasesId []string) (m.Phases, error) {

	phases, err := projectRepo.GetProjectPhases(phasesId)

	if err != nil {
		return nil, err
	}

	return phases, nil
}
