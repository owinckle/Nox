from django.urls import path
import spaces.views as views

urlpatterns = [
	path("spaces/get/", views.GetSpaces.as_view()),
	path("space/get/", views.GetSpace.as_view()),
	path("space/create/", views.CreateSpace.as_view()),
	path("space/exists/", views.SpaceExists.as_view()),
]