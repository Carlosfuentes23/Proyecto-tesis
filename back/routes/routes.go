package routes

import (
	authControler "main/controlers/auth.controler"
	phaseControler "main/controlers/phase.controler"
	projectControler "main/controlers/project.controler"
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

	//Rutas Para el controlador de proyectos
	app.Post("/api/projects/createproject", projectControler.CreateProject)
	app.Get("/api/projects/getprojectlist", projectControler.GetProjectList)
	app.Get("/api/projects/getproject/:id", projectControler.GetProjectById)
	app.Post("/api/projects/updateproject/:id", projectControler.UpdateProject)
	app.Get("/api/projects/getprojectmembers/:id", projectControler.GetProjectMembers)
	app.Get("/api/projects/getprojectphases/:id", projectControler.GetProjectPhases)

	//Rutas Para el controlador de fases
	app.Post("/api/phases/createphase/:projectId", phaseControler.CreatePhase)
	app.Get("/api/phases/getphase/:id", phaseControler.GetPhaseById)
	app.Get("/api/phases/getphaselist/:projectId", phaseControler.GetPhaseListByProjectId)
	app.Post("/api/phases/updatephase/:id", phaseControler.UpdatePhase)
	app.Get("/api/phases/getphasemembers/:id", phaseControler.GetPhaseMembers)
}
