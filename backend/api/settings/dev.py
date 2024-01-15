from .base import *
import os

DEBUG = True

CORS_ALLOW_ALL_ORIGINS = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATICFILES_DIRS = (
	os.path.join(BASE_DIR, "static"),
)