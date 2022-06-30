package abilitie_service

import (
	m "main/models"
	abiliteRepo "main/repositories/abilitie.repository"
)

func CreateAbilite(abilite m.Abilitie) error {

	err := abiliteRepo.CreateAbilite(abilite)

	if err != nil {
		return err
	}

	return nil
}

func GetAbilitieList() (m.Abilities, error) {

	abilites, err := abiliteRepo.GetAbilitieList()

	if err != nil {
		return nil, err
	}

	return abilites, nil
}

func GetAbilitiesByProjectId(projectId string) (m.Abilities, error) {
	abilites, err := abiliteRepo.GetAbilitiesByProjectId(projectId)

	if err != nil {
		return nil, err
	}

	return abilites, nil
}

func GetAbilitieById(abiliteId string) (*m.Abilitie, error) {

	abilite, err := abiliteRepo.GetAbilitieById(abiliteId)

	if err != nil {
		return nil, err
	}

	return abilite, nil
}

func UpdateAbilitie(abilite m.Abilitie) error {

	err := abiliteRepo.UpdateAbilitie(abilite)

	if err != nil {
		return err
	}

	return nil
}
