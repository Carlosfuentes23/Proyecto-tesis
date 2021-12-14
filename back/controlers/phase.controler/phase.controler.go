package phase_controler

import (
	"main/models"
	phaseService "main/services/phase.service"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
)

func CreatePhase(c *fiber.Ctx) error {
	var data models.Phase
	err := c.BodyParser(&data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}
	data.UpdateAt = time.Now()
	err = phaseService.CreatePhase(data)
	if err != nil {
		return c.Status(http.StatusUnprocessableEntity).JSON(err)
	}
	return c.JSON(data)
}
