package http

import (
	"net/http"

	"miadok-chaladok/internal/app"
	"miadok-chaladok/internal/model"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/rs/xid"
)

// SessionController - entity of session controller.
type SessionController struct {
	log app.ILogger
}

// NewSessionController - returns SessionController instance.
func NewSessionController(log app.ILogger) *SessionController {
	return &SessionController{
		log: log,
	}
}

const tokenKey = "token"

// SetSession - adds cookie authentication token to client cookies.
func (c *SessionController) SetSession(ctx *gin.Context) {
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
			ctx.JSON(http.StatusInternalServerError, model.HTTPResponse[any]{
				Errors: err.Error(),
			})
		}
	}

	ctx.Status(http.StatusOK)
}
