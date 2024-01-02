from rest_framework import serializers
from django.contrib.auth import get_user_model
from subscriptions.models import UserSubscription

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
	current_plan = serializers.SerializerMethodField()

	class Meta:
		model = User
		fields = ("id", "email", "current_plan")

	def get_current_plan(self, obj):
		try:
			subscription = UserSubscription.objects.get(user=obj)
			if subscription and subscription.plan:
				return subscription.plan.name
		except UserSubscription.DoesNotExist:
			pass
		return "Free"
