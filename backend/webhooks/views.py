import json
import stripe
import logging
from decouple import config
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from subscriptions.models import Plan, UserSubscription

# Configure Stripe with your secret key
stripe.api_key = config("STRIPE_SECRET_KEY")

# Set up logging
logger = logging.getLogger(__name__)


def handle_payment_intent_succeeded(payment_intent):
	logger.info("PaymentIntent was successful!")


def handle_subscription_created(subscription):
	logger.info("[Handle Subscription Created] Subscription was successful!")
	try:
		plan = Plan.objects.get(price_id=subscription["plan"]["id"])
		user_subscription = UserSubscription.objects.get(stripe_customer_id=subscription["customer"])
		user_subscription.status = "active"
		user_subscription.stripe_subscription_id = subscription["id"]
		user_subscription.plan = plan
		user_subscription.save()
		return HttpResponse(status=201, content="Subscription created")
	except Exception as e:
		logger.error("Something went wrong (webhooks/views.py) -> %s", str(e))
		return HttpResponse(status=400, content="Something went wrong")


EVENT_HANDLLERS = {
	"payment_intent.succeeded": handle_payment_intent_succeeded,
	"customer.subscription.created": handle_subscription_created
}


@method_decorator(csrf_exempt, name="dispatch")
class StripeWebhook(APIView):
	def post(self, request, *args, **kwargs):
		payload = request.body.decode("utf-8")
		sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
		endpoint_secret = config("STRIPE_WEBHOOK_SECRET")

		if not endpoint_secret:
			return HttpResponse(status=500, content="Webhook signing secret is not set in settings.")

		try:
			event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
			handler = EVENT_HANDLLERS.get(event["type"])

			# Handle the event
			if handler:
				handler(event["data"]["object"])
			else:
				# Unhandled event
				logger.info("Unhandled event type %s", event["type"])
			return HttpResponse(status=200)
		except ValueError as e:
			logger.error("Invalid payload: %s", str(e))
			return HttpResponse(status=400, content="Invalid payload")
		except stripe.error.SignatureVerificationError as e:
			logger.error("Invalid signature: %s", str(e))
			return HttpResponse(status=400, content="Invalid signature")
		except Exception as e:
			logger.error("Webhook handler failed: %s", str(e))
			return HttpResponse(status=400, content="Webhook handler failed")
