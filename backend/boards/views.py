from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Board, Post
from spaces.models import Space
from .serializers import PostSerializer

class GetFeatureRequestsBoard(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		space_slug = request.data.get("space_slug")

		space = Space.objects.get(slug=space_slug)
		board = Board.objects.get(space=space, type="feature_requests")
		posts = Post.objects.filter(board=board)
		serializer = PostSerializer(posts, many=True)
		return Response(serializer.data)
