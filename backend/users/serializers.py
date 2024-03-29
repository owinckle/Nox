from rest_framework import serializers
from django.contrib.auth import get_user_model
from subscriptions.models import UserSubscription
from subscriptions.serializers import UserSubscriptionSerializer
from gamify.models import GlobalRank, SpaceRank
from gamify.serializers import GlobalRankSerializer, SpaceRankSerializer
from .models import Profile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
	name = serializers.SerializerMethodField()
	subscription = serializers.SerializerMethodField()
	is_social = serializers.SerializerMethodField()
	rank = serializers.SerializerMethodField()

	class Meta:
		model = User
		fields = ("id", "name", "email", "subscription", "is_social", "rank")

	def get_name(self, obj):
		return obj.first_name

	def get_subscription(self, obj):
		try:
			subscription = UserSubscription.objects.get(user=obj)
			return UserSubscriptionSerializer(subscription).data
		except UserSubscription.DoesNotExist:
			return None
		
	def get_is_social(self, obj):
		profile = Profile.objects.get(user=obj)
		return profile.is_social
	
	def get_rank(self, obj):
		# profile = Profile.objects.get(user=obj)
		# return profile.rank
		rank = GlobalRank.objects.get(user=obj)
		return GlobalRankSerializer(rank).data
