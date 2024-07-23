package http

import (
	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/rs/xid"
)

type sessionController struct {
	log app.ILogger
}

func NewSessionController(log app.ILogger) *sessionController {
	return &sessionController{
		log: log,
	}
}

const tokenKey = "token"

func (c *sessionController) SetSession(ctx *gin.Context) {
	session := sessions.Default(ctx)

	sessionToken := session.Get(tokenKey)

	if sessionToken == nil {
		newSessionToken := xid.New().String()
		session.Set(tokenKey, newSessionToken)
		session.Options(sessions.Options{
			HttpOnly: true,
			MaxAge:   24 * 60 * 60,
			SameSite: http.SameSiteNoneMode,
			Secure:   true,
			Path:     "/api",
		})

		if err := session.Save(); err != nil {
			ctx.JSON(http.StatusInternalServerError, model.HttpResponse[any]{
				Errors: err.Error(),
			})
		}
	}

	ctx.Status(http.StatusOK)
}
