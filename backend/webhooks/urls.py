from django.urls import path
from .views import StripeWebhook

urlpatterns = [
	path("stripe/", StripeWebhook.as_view(), name="webhook-stripe"),
]
