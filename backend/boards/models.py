from django.db import models
from django.contrib.auth.models import User
from spaces.models import Space
from uuid import uuid4


def generate_uuid():
	return uuid4().hex[:5]


class Labels(models.Model):
	id = models.CharField(max_length=8, primary_key=True, default=generate_uuid, editable=False)
	space = models.ForeignKey(Space, on_delete=models.CASCADE)
	label = models.CharField(max_length=100)
	color = models.CharField(max_length=7, default="#776bdc")
	
	class Meta:
		verbose_name_plural = "Labels"


class Board(models.Model):
	id = models.CharField(max_length=8, primary_key=True, default=generate_uuid, editable=False)
	BOARD_TYPES = (
		("feature_requests", "Feature Requests"),
		("feedback", "Feedback"),
		("bug", "Bug"),
		("roadmap", "Roadmap"),
		("custom", "Custom"),
	)

	title = models.CharField(max_length=255)	
	space = models.ForeignKey(Space, on_delete=models.CASCADE)
	position = models.IntegerField(default=0)
	is_private = models.BooleanField(default=False)
	type = models.CharField(max_length=50, choices=BOARD_TYPES, default="custom")

	def __str__(self):
		return f"[{self.space.name}][{self.type.title()}] {self.title}"


class Post(models.Model):
	id = models.CharField(max_length=8, primary_key=True, default=generate_uuid, editable=False)
	board = models.ForeignKey(Board, on_delete=models.CASCADE)
	author = models.ForeignKey(User, on_delete=models.CASCADE)
	title = models.CharField(max_length=255)
	content = models.TextField()
	labels = models.ManyToManyField(Labels, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	