package routes

import (
	authControler "main/controlers/auth.controler"
	userControler "main/controlers/user.controler"

	"github.com/gofiber/fiber/v2"
)

func Start(app *fiber.App) {
	app.Post("/api/auth/signin", authControler.SignIn)
	app.Post("/api/auth/register", userControler.CreateUser)

	//Rutas Para el controlador de usuarios
	app.Get("/api/users/getusers", userControler.GetUsers)
	app.Get("/api/users/getuser/:id", userControler.GetUserById)
	app.Post("/api/users/updateuser/:id", userControler.UpdateUser)
	app.Delete("/api/users/deleteuser/:id", userControler.DeleteUser)

}
