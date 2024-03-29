from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
	path("", include("pages.urls")),
	path("api/", include("users.urls")),
	path("api/", include("subscriptions.urls")),
	path("webhook/", include("webhooks.urls")),
	path("api/", include("spaces.urls")),
	path("api/", include("boards.urls")),
]
