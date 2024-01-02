from rest_framework import serializers
from .models import Plan


class PlanSerializer(serializers.ModelSerializer):
	class Meta:
		model = Plan
		fields = ["name", "price_id", "price", "features"]
