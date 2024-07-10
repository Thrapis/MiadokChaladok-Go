package controllers

import (
	"miadok-chaladok/pkg/api"
	"miadok-chaladok/pkg/api/meta"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/rs/xid"
)

func SetSession(c *gin.Context) {
	session := sessions.Default(c)

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
			api.RespondJSON(c, http.StatusInternalServerError, nil, meta.NewErrorMeta(0, err.Error()))
		}
	}

	api.RespondJSON(c, http.StatusOK, nil, nil)
}
