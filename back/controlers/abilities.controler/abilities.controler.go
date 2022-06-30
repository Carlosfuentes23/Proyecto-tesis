package abilities_controler

import (
	"main/models"
	"net/http"
	"time"

	abilitie_service "main/services/abilitie.service"
	phase_service "main/services/phase.service"

	"github.com/gofiber/fiber/v2"
)

func CreateAbilite(c *fiber.Ctx) error {
	phaseId := c.Params("phaseId")

	var data models.Abilitie

	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	data.CreateAt = time.Now()
	data.UpdateAt = time.Now()

	err = abilitie_service.CreateAbilite(data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	phase, err := phase_service.GetPhaseById(phaseId)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	phase.AbilitiesId = append(phase.AbilitiesId, data.ID.Hex())
	err = phase_service.UpdatePhase(*phase, phaseId)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	return c.JSON(data)
}

func GetAbilitieList(c *fiber.Ctx) error {
	abilities, err := abilitie_service.GetAbilitieList()
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	return c.JSON(abilities)
}

func GetAbilitiesByProjectId(c *fiber.Ctx) error {
	projectId := c.Params("projectId")

	abilities, err := abilitie_service.GetAbilitiesByProjectId(projectId)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	return c.JSON(abilities)
}

func GetAbilitieById(c *fiber.Ctx) error {
	abilitieId := c.Params("abilitieId")

	abilitie, err := abilitie_service.GetAbilitieById(abilitieId)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	return c.JSON(abilitie)
}

func UpdateAbilitie(c *fiber.Ctx) error {
	var data models.Abilitie

	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	data.UpdateAt = time.Now()

	err = abilitie_service.UpdateAbilitie(data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}

	return c.JSON(data)
}
