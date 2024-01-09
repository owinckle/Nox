# subscriptions/views.py
from decouple import config
import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Plan, UserSubscription
from .serializers import PlanSerializer


stripe.api_key = config("STRIPE_SECRET_KEY")


class CreateCheckoutSessionView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		price_id = request.data.get("price_id")

		try:
			user_subscription = UserSubscription.objects.get(user=request.user)
		except:
			user_subscription = UserSubscription.objects.create(
				user=request.user,
				status="active"
			)
			stripe_customer = stripe.Customer.create(email=request.user.email)
			user_subscription.stripe_customer_id = stripe_customer["id"]
			user_subscription.save()
		
		stripe_customer_id = user_subscription.stripe_customer_id

		try:
			# Create a new checkout session
			checkout_session = stripe.checkout.Session.create(
				payment_method_types=["card"],
				line_items=[{
					"price": price_id,
					"quantity": 1,
				}],
				mode="subscription",
				success_url=config("DOMAIN") + "/plans?session_id={CHECKOUT_SESSION_ID}",
				cancel_url=config("DOMAIN") + "/plans", 
				customer=stripe_customer_id
			)
			return Response({"session_id": checkout_session.id})

		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetPlans(APIView):
	def get(self, request):
		plans = Plan.objects.all()
		serializer = PlanSerializer(plans, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)


class CancelSubscription(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		try:
			user_subscription = UserSubscription.objects.get(user=request.user, status="active")
			if user_subscription.stripe_subscription_id:
				# Cancel the subscription at the end of the current billing period
				stripe.Subscription.modify(
					user_subscription.stripe_subscription_id,
					cancel_at_period_end=True
				)
				user_subscription.status = "canceled"
				user_subscription.save()
				return Response({"message": "Your subscription will be canceled at the end of the billing period."})
			else:
				return Response({"error": "No active subscription found."}, status=status.HTTP_404_NOT_FOUND)
		except UserSubscription.DoesNotExist:
			return Response({"error": "Subscription not found."}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
		

class ReactivateSubscription(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		try:
			user_subscription = UserSubscription.objects.get(user=request.user, status="canceled")
			if user_subscription.stripe_subscription_id:
				# Reactivate the subscription
				stripe.Subscription.modify(
					user_subscription.stripe_subscription_id,
					cancel_at_period_end=False
				)
				user_subscription.status = "active"
				user_subscription.save()
				return Response({"message": "Your subscription has been reactivated."})
			else:
				return Response({"error": "No canceled subscription found."}, status=status.HTTP_404_NOT_FOUND)
		except UserSubscription.DoesNotExist:
			return Response({"error": "Subscription not found."}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
		

class ChangeSubscription(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		price_id = request.data.get("price_id")
		try:
			user_subscription = UserSubscription.objects.get(user=request.user, status="active")
			if user_subscription.stripe_subscription_id:
				subscription = stripe.Subscription.retrieve(user_subscription.stripe_subscription_id)
				current_item_id = subscription["items"]["data"][0].id
				stripe.Subscription.modify(
					user_subscription.stripe_subscription_id,
					cancel_at_period_end=False,
					proration_behavior="create_prorations",
					items=[{
						"id": current_item_id,
						"price": price_id,
					}]
				)
				new_plan = Plan.objects.get(price_id=price_id)
				user_subscription.plan = new_plan
				user_subscription.save()
				return Response({"message": "Your subscription has been changed."})
			else:
				return Response({"error": "No active subscription found."}, status=status.HTTP_404_NOT_FOUND)
		except UserSubscription.DoesNotExist:
			return Response({"error": "Subscription not found."}, status=status.HTTP_404_NOT_FOUND)
		except Exception as e:
			print(str(e))
			return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)