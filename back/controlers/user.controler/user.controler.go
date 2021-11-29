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

func GetUsers(c *fiber.Ctx) error {
	users, err := userService.Read()
	if err != nil {
		return err
	}
	return c.JSON(users)
}

/*func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	user, err := userService.ReadByID(id)
	if err != nil {
		return err
	}
	return c.JSON(user)
}*/

func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		UpdateAt: time.Now(),
	}

	err := userService.Update(user, id)
	if err != nil {
		return err
	}

	return c.JSON(user)
}

func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	err := userService.Delete(id)
	if err != nil {
		return err
	}
	return c.JSON(fiber.Map{"message": "User deleted"})
}
