from django.db import models
from django.contrib.auth.models import User
from spaces.models import Space, SpaceMember


class GlobalRank(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	level = models.IntegerField(default=1)
	xp = models.IntegerField(default=0)
	max_xp = models.IntegerField(default=100)

	def __str__(self):
		return f"{self.user.username} - {self.level}"


class SpaceRank(models.Model):
	member = models.ForeignKey(SpaceMember, on_delete=models.CASCADE)
	level = models.IntegerField(default=1)
	xp = models.IntegerField(default=0)
	max_xp = models.IntegerField(default=100)

	def __str__(self):
		return f"{self.member.user.username} - {self.level}"