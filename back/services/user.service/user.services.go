package user_service

import (
	m "main/models"
	userRepository "main/repositories/user.repository"
)

func Create(user m.User) error {

	err := userRepository.Create(user)

	if err != nil {
		return err
	}

	return nil
}

func Read() (m.Users, error) {

	user, err := userRepository.Read()
	if err != nil {
		return nil, err
	}

	return user, nil
}

func Update(user m.User, userId string) error {

	err := userRepository.Update(user, userId)
	if err != nil {
		return err
	}

	return nil
}

func Delete(userId string) error {

	err := userRepository.Delete(userId)
	if err != nil {
		return err
	}
	return nil
}
