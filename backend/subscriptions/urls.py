from django.urls import path
from .views import CreateCheckoutSessionView, GetPlans

urlpatterns = [
	path("subscription/session/create/", CreateCheckoutSessionView.as_view(), name="create-checkout-session"),
	path("plans/", GetPlans.as_view(), name="list-plans"),
]
