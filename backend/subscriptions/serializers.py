from rest_framework import serializers
from .models import Plan, UserSubscription
from datetime import datetime
import stripe
from decouple import config

stripe.api_key = config("STRIPE_SECRET_KEY")

class PlanSerializer(serializers.ModelSerializer):
	class Meta:
		model = Plan
		fields = ["name", "price_id", "price", "features"]


class UserSubscriptionSerializer(serializers.ModelSerializer):
	plan = serializers.SerializerMethodField()
	next_billing_date = serializers.SerializerMethodField()

	class Meta:
		model = UserSubscription
		fields = ["plan", "status", "next_billing_date"]

	def get_plan(self, obj):
		return obj.plan.name

	def get_next_billing_date(self, obj):
		# Using stripe, we can get the next billing date
		if obj.stripe_subscription_id:
			strip_subscription = stripe.Subscription.retrieve(obj.stripe_subscription_id)
			return datetime.fromtimestamp(strip_subscription.current_period_end).strftime("%d/%m/%Y")