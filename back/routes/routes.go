package routes

import (
	userControler "main/controlers/user.controler"

	"github.com/gofiber/fiber/v2"
)

func Start(app *fiber.App) {
	app.Post("/api/createuser", userControler.CreateUser)
}
