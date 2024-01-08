from django.urls import path
from .views import CreateCheckoutSessionView, GetPlans, CancelSubscription

urlpatterns = [
	path("subscription/session/create/", CreateCheckoutSessionView.as_view(), name="create-checkout-session"),
	path("plans/", GetPlans.as_view(), name="list-plans"),
	path("subscription/cancel/", CancelSubscription.as_view(), name="cancel-subscription")
]
