from django.urls import path
from .views import CreateCheckoutSessionView, GetPlans, CancelSubscription, ReactivateSubscription, ChangeSubscription

urlpatterns = [
	path("subscription/session/create/", CreateCheckoutSessionView.as_view(), name="create-checkout-session"),
	path("plans/", GetPlans.as_view(), name="list-plans"),
	path("subscription/cancel/", CancelSubscription.as_view(), name="cancel-subscription"),
	path("subscription/reactivate/", ReactivateSubscription.as_view(), name="reactivate-subscription"),
	path("subscription/change/", ChangeSubscription.as_view(), name="change-subscription")
]
