from django.urls import path, re_path
from .views import app

urlpatterns = [
    path("", app, name="app"),
    re_path(r"^(.*)$", app, name="app-catch-all"),
    path("login/", app, name="app-login"),
    path("register/", app, name="app-register"),
]