from rest_framework import serializers
from .models import GlobalRank, SpaceRank


class GlobalRankSerializer(serializers.ModelSerializer):
	class Meta:
		model = GlobalRank
		fields = ("level", "xp", "max_xp")


class SpaceRankSerializer(serializers.ModelSerializer):
	class Meta:
		model = SpaceRank
		fields = ("level", "xp", "max_xp")