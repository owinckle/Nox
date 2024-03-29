from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Space, SpaceMember
from users.models import Profile
from .serializers import SpaceSerializer
from boards.models import Board, Labels


class GetSpaces(APIView):
	persmission_classes = [IsAuthenticated]
	def get(self, request):
		user = request.user
		member_in = SpaceMember.objects.filter(user=user)
		spaces = [member.space for member in member_in]
		serializer = SpaceSerializer(spaces, many=True)
		return Response(serializer.data)

class GetSpace(APIView):
	persmission_classes = [IsAuthenticated]

	def post(self, request):
		slug = request.data.get("slug")

		try:
			space = Space.objects.get(slug=slug)
			serializer = SpaceSerializer(space)

			# TODO: Handle this differently/better
			member, _ = SpaceMember.objects.get_or_create(space=space, user=request.user)
			is_staff = member.role in ["owner", "collaborator"]

			return Response({
				"space": serializer.data,
				"is_staff": is_staff,
				"role": member.role
			})
		except:
			return Response({"error": "Space not found."}, status=404)


class CreateSpace(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		name = request.data.get("name")
		brand_color = request.data.get("brand_color")
		primary_bg_color = request.data.get("primary_bg_color")
		secondary_bg_color = request.data.get("secondary_bg_color")
		primary_text_color = request.data.get("primary_text_color")
		secondary_text_color = request.data.get("secondary_text_color")

		slug = name.lower().replace(" ", "-") 

		# Check if space with slug already exists
		if Space.objects.filter(slug=slug).exists():
			return Response({"error": "Space with this name already exists."}, status=400)

		space = Space.objects.create(
			name=name,
			slug=slug,
			brand_color=brand_color,
			primary_bg_color=primary_bg_color,
			secondary_bg_color=secondary_bg_color,
			primary_text_color=primary_text_color,
			secondary_text_color=secondary_text_color
		)
		space.save()

		# Create the intial boards
		boards = [
			{"title": "Feature Requests", "type": "feature_requests", "position": 0},
			{"title": "Feedback", "type": "feedback", "position": 0},
			{"title": "Open", "type": "bug", "position": 0},
			{"title": "Closed", "type": "bug", "position": 1},
			{"title": "Planned", "type": "roadmap", "position": 0},
			{"title": "In Progress", "type": "roadmap", "position": 1},
			{"title": "Completed", "type": "roadmap", "position": 2},
		]
		for board in boards:
			Board.objects.create(
				title=board["title"],
				space=space,
				type=board["type"]
			)

		SpaceMember.objects.create(space=space, user=request.user, role="owner")
		return Response({"slug": slug})
	

class SpaceExists(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		name = request.data.get("name")
		slug = name.lower().replace(" ", "-")

		if Space.objects.filter(slug=slug).exists():
			return Response({"exists": True})
		else:
			return Response({"exists": False})
