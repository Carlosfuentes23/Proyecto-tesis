package controler_user

import (
	"main/models"
	"time"

	userService "main/services/user.service"

	"github.com/gofiber/fiber/v2"
)

func CreateUser(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		CreateAt: time.Now(),
		UpdateAt: time.Now(),
	}

	err := userService.Create(user)
	if err != nil {
		return err
	}

	return c.JSON(user)

}
