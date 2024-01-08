from rest_framework import serializers
from django.contrib.auth import get_user_model
from subscriptions.models import UserSubscription
from subscriptions.serializers import UserSubscriptionSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
	name = serializers.SerializerMethodField()
	subscription = serializers.SerializerMethodField()

	class Meta:
		model = User
		fields = ("id", "name", "email", "subscription")

	def get_name(self, obj):
		return obj.first_name

	def get_subscription(self, obj):
		try:
			subscription = UserSubscription.objects.get(user=obj)
			return UserSubscriptionSerializer(subscription).data
		except UserSubscription.DoesNotExist:
			return None