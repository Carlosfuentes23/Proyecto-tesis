package routes

import (
	authControler "main/controlers/auth.controler"
	userControler "main/controlers/user.controler"

	"github.com/gofiber/fiber/v2"
)

func Start(app *fiber.App) {
	app.Post("/api/signin", authControler.SignIn)

	//Rutas Para el controlador de usuarios
	app.Post("/api/register", userControler.CreateUser)
	app.Get("/api/getusers", userControler.GetUsers)
	app.Get("/api/getuser/:id", userControler.GetUserById)
	app.Post("/api/updateuser/:id", userControler.UpdateUser)
	app.Delete("/api/deleteuser/:id", userControler.DeleteUser)

}
