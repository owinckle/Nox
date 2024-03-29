from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Space(models.Model):
	name = models.CharField(max_length=50, unique=True)
	slug = models.CharField(max_length=50, unique=True)
	brand_color = models.CharField(max_length=7, default="#776bdc")
	primary_bg_color = models.CharField(max_length=7, default="#171a1d")
	secondary_bg_color = models.CharField(max_length=7, default="#1d2025")
	primary_text_color = models.CharField(max_length=7, default="#f5f5f5")
	secondary_text_color = models.CharField(max_length=7, default="#b3b3b3")
	created_at = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return self.name
	

class SpaceMember(models.Model):
	ROLE_CHOICES = (
		("owner", "Owner"),
		("collaborator", "Collaborator"),
		("member", "Member"),
	)

	space = models.ForeignKey(Space, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="member")
	join_date = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return f"{self.user.username} - {self.space.name} - {self.role}"