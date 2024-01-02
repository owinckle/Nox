from .base import *

DEBUG = True

CORS_ALLOWED_ORIGINS = [
	"http://localhost:5173"
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}