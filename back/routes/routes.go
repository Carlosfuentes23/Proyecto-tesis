package routes

import (
	userControler "main/controlers/user.controler"

	"github.com/gofiber/fiber/v2"
)

func Start(app *fiber.App) {

	//Rutas Para el controlador de usuarios
	app.Post("/api/createuser", userControler.CreateUser)
	app.Get("/api/getusers", userControler.GetUsers)
	app.Post("/api/updateuser/:id", userControler.UpdateUser)
	app.Delete("/api/deleteuser/:id", userControler.DeleteUser)

}
