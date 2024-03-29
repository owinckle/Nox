from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import Post
from users.serializers import UserSerializer
from users.models import Profile

class PostSerializer(serializers.ModelSerializer):
	posted_since = serializers.SerializerMethodField()
	# author uses the profile serializer. Profile objects is identified by the user variable
	author = serializers.SerializerMethodField()

	class Meta:
		model = Post
		fields = ("id", "board", "author", "title", "content", "labels", "posted_since", "author")

	def get_posted_since(self, obj):
		return naturaltime(obj.created_at)

	def get_author(self, obj):
		serializer = UserSerializer(obj.author)
		return serializer.data