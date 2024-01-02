from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
	path("accounts/", include("allauth.urls")),	
	path("api/", include("users.urls")),
	path("api/", include("subscriptions.urls")),
	path("webhook/", include("webhooks.urls")),
]
