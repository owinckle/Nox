from django.db import models
from django.contrib.auth.models import User


class Plan(models.Model):
	name = models.CharField(max_length=100)
	price = models.DecimalField(max_digits=5, decimal_places=2)
	price_id = models.CharField(max_length=100, unique=True)
	features = models.TextField()

	def __str__(self):
		return self.name


class UserSubscription(models.Model):
	STATUS = (
		("active", "Active"),
		("canceled", "Canceled"),
		("unpaid", "Unpaid"),
	)

	user = models.OneToOneField(User, on_delete=models.CASCADE)
	stripe_subscription_id = models.CharField(max_length=255, blank=True)
	stripe_customer_id = models.CharField(max_length=255, blank=True)
	plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, blank=True)
	status = models.CharField(max_length=100, choices=STATUS)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	
	def __str__(self):
		return f"{self.user}'s subscription to {self.plan}"