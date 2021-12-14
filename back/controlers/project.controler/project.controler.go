package project_controler

import (
	"main/models"
	projectServices "main/services/project.service"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
)

func CreateProject(c *fiber.Ctx) error {
	var data models.Project

	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}
	data.UpdateAt = time.Now()
	err = projectServices.CreateProject(data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}
	return c.JSON(data)
}

func GetProjectList(c *fiber.Ctx) error {
	projects, err := projectServices.GetProjectList()
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(err)
	}

	return c.JSON(projects)
}

func GetProjectById(c *fiber.Ctx) error {
	id := c.Params("id")

	project, err := projectServices.GetProjectById(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(err)
	}
	return c.JSON(project)
}

func UpdateProject(c *fiber.Ctx) error {
	id := c.Params("id")
	var data models.Project

	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}
	data.UpdateAt = time.Now()
	err = projectServices.UpdateProject(data, id)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}
	return c.JSON(data)
}

func GetProjectMembers(c *fiber.Ctx) error {
	id := c.Params("id")
	members, err := projectServices.GetProjectMembers(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(err)
	}

	return c.JSON(members)
}

func GetProjectPhases(c *fiber.Ctx) error {
	id := c.Params("id")
	phases, err := projectServices.GetProjectPhases(id)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(err)
	}
	return c.JSON(phases)
}
