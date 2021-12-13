package phase_service

import (
	m "main/models"
	phaseRepo "main/repositories/phase.repository"
)

func CreatePhase(phase m.Phase) error {

	err := phaseRepo.CreatePhase(phase)

	if err != nil {
		return err
	}

	return nil
}

func GetPhaseList() (m.Phases, error) {

	phaseList, err := phaseRepo.GetPhaseList()

	if err != nil {
		return nil, err
	}

	return phaseList, nil
}

func GetPhaseById(phaseId string) (*m.Phase, error) {

	phase, err := phaseRepo.GetPhaseById(phaseId)

	if err != nil {
		return nil, err
	}

	return phase, nil
}

func UpdatePhase(phase m.Phase, phaseId string) error {

	err := phaseRepo.UpdatePhase(phase, phaseId)

	if err != nil {
		return err
	}

	return nil
}

func GetPhaseMembers(phaseId []string) (m.Users, error) {

	members, err := phaseRepo.GetPhaseMembers(phaseId)

	if err != nil {
		return nil, err
	}

	return members, nil
}
