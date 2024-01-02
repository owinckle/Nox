import os
from django.core.wsgi import get_wsgi_application
from decouple import config

if config("ENVIRONMENT") == "prod":
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings.prod")
else:
	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings.dev")

application = get_wsgi_application()
