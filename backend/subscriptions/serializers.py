from rest_framework import serializers
from .models import Plan, UserSubscription


class PlanSerializer(serializers.ModelSerializer):
	class Meta:
		model = Plan
		fields = ["name", "price_id", "price", "features"]


class UserSubscriptionSerializer(serializers.ModelSerializer):
	plan = serializers.SerializerMethodField()

	class Meta:
		model = UserSubscription
		fields = ["plan", "status"]

	def get_plan(self, obj):
		return obj.plan.name