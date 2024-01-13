from django.urls import path
from .views import UserRegistrationAPIView, UserLoginAPIView, UserProfileAPIView, GoogleAuth

urlpatterns = [
	path("auth/register/", UserRegistrationAPIView.as_view(), name="auth-register"),
	path("auth/login/", UserLoginAPIView.as_view(), name="auth-login"),
	path("auth/profile/", UserProfileAPIView.as_view(), name="auth-profile"),
	path("auth/google/", GoogleAuth.as_view(), name="auth-google"),
]
