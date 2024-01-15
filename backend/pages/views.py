from django.shortcuts import render
from decouple import config
from subscriptions.models import Plan


def home(request):
	plans = Plan.objects.all()

	ctx = {
		"app_name": config("APP_NAME"),
		"plans": plans
	}

	return render(request, "pages/home.html", ctx)