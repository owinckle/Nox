from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
import stripe
from decouple import config
from subscriptions.models import Plan, UserSubscription


User = get_user_model()
stripe.api_key = config("STRIPE_SECRET_KEY")


class  UserRegistrationAPIView(APIView):
	def post(self, request):
		user_data = request.data
	
		if User.objects.filter(email=user_data["email"]).exists():
			return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

		try:
			user = User.objects.create_user(
				user_data["email"], # Set the email as the username
				user_data["email"],
				user_data["password"],
			)

			user.first_name = user_data["name"]
			user.save()

			free_plan = Plan.objects.get(name="Free")
			stripe_customer = stripe.Customer.create(email=user_data["email"])
			UserSubscription.objects.create(
				user=user,
				plan=free_plan,
				stripe_customer_id=stripe_customer["id"],
				status="active"
			)

		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

		return Response({}, status=status.HTTP_201_CREATED)


class UserLoginAPIView(APIView):
	def post(self, request):
		email = request.data.get("email")
		password = request.data.get("password")

		user = authenticate(email=email, password=password)
		print(user)
		if user:
			token, _ = Token.objects.get_or_create(user=user)
			

			return Response({"user": UserSerializer(user).data, "token": token.key}, status=status.HTTP_200_OK)

		return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def put(self, request):
		name = request.data.get("name")
		email = request.data.get("email")
		new_password = request.data.get("new_password")
		current_password = request.data.get("current_password")
		user = request.user

		print(current_password)

		if not user.check_password(current_password):
			return Response({"error": "Invalid Password"}, status=status.HTTP_400_BAD_REQUEST)

		if name:
			user.first_name = name
		if email:
			user.email = email
		if new_password:
			user.set_password(new_password)
		user.save()

		serializer = UserSerializer(user)
		return Response(serializer.data, status=status.HTTP_200_OK)