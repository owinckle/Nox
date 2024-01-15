#!/usr/bin/env python
import os
import subprocess

# This setup.py file will help the user set up the Nox Boilerplate project

class bcolors:
	HEADER = '\033[95m'
	OKBLUE = '\033[94m'
	OKGREEN = '\033[92m'
	WARNING = '\033[93m' 
	FAIL = '\033[91m'
	ENDC = '\033[0m'
	BOLD = '\033[1m'
	UNDERLINE = '\033[4m'


DEFUALT_API_BASE_URL = "http://localhost:8000/api"
DEFAULT_FREE_PLAN_NAME = "Free"
DEFAULT_FRONTEND_DOMAIN = "http://localhost:5173"


def frontend_setup(project_name):
	print(bcolors.HEADER + "Setting up frontend..." + bcolors.ENDC)
	# Get the user's input
	api_base_url = input(f"Base URL of your DRF API (Press enter for {DEFUALT_API_BASE_URL}): ")
	if api_base_url == "":
		api_base_url = DEFUALT_API_BASE_URL
	
	stripe_public_key = input("Stripe public key: ")
	google_client_id = input("Google OAuth client ID: ")

	# In the frontend directory, generate the .env.local file
	print(bcolors.OKGREEN + "Generating frontend .env.local file..." + bcolors.ENDC)
	frontend_env = open("frontend/.env.local", "w")
	frontend_env.write("VITE_APP_NAME=\"" + project_name + "\"\n")
	frontend_env.write("VITE_API_BASE_URL=\"" + api_base_url + "\"\n")
	frontend_env.write("VITE_STRIPE_PUBLIC_KEY=\"" + stripe_public_key + "\"\n")
	frontend_env.write("VITE_GOOGLE_CLIENT_ID=\"" + google_client_id + "\"\n")
	frontend_env.close()


def backend_setup(project_name):
	print(bcolors.HEADER + "Setting up backend..." + bcolors.ENDC)
	# .env file
	domain = input(f"Domain of your frontend (Press enter for {DEFAULT_FRONTEND_DOMAIN}): ")
	if domain == "":
		domain = DEFAULT_FRONTEND_DOMAIN
	secret_key = subprocess.run(["python", "-c", "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"], cwd="backend", stdout=subprocess.PIPE).stdout.decode().strip()
	stripe_secret_key = input("Stripe secret key: ")
	stripe_webhook_secret = input("Stripe webhook secret: ")

	# In the backend directory, generate the .env file
	print(bcolors.OKGREEN + "Generating backend .env file..." + bcolors.ENDC)
	backend_env = open("backend/.env", "w")
	backend_env.write("# App\n")
	backend_env.write("APP_NAME=\"" + project_name + "\"\n")
	backend_env.write("SECRET_KEY=\"" + secret_key + "\"\n")
	backend_env.write("ENVIRONMENT=\"dev\"\n")
	backend_env.write("DOMAIN=\"" + domain + "\"\n")
	backend_env.write("\n# Stripe\n")
	backend_env.write("STRIPE_SECRET_KEY=\"" + stripe_secret_key + "\"\n")
	backend_env.write("STRIPE_WEBHOOK_SECRET=\"" + stripe_webhook_secret + "\"\n")
	backend_env.close()


	# Migrate the database
	print(bcolors.OKGREEN + "Migrating backend database..." + bcolors.ENDC)
	subprocess.run(["python", "manage.py", "migrate"], cwd="backend", stdout=subprocess.DEVNULL)

	# Super user
	print(bcolors.OKGREEN + "Creating super user..." + bcolors.ENDC)
	username = input("Username: ")
	email = input("Email: ")
	subprocess.run(["python", "manage.py", "createsuperuser", "--username", username, "--email", email], cwd="backend")

	# Free plan creation
	has_free_plan = input("Does your app have a free plan? (y/n): ")
	if has_free_plan == "y":
		free_plan_name = input(f"Name for the free plan (Press enter for \"{DEFAULT_FREE_PLAN_NAME}\"): ")
		if free_plan_name == "":
			free_plan_name = DEFAULT_FREE_PLAN_NAME
		print(bcolors.OKGREEN + "Creating free plan..." + bcolors.ENDC)
		subprocess.run(["python", "manage.py", "shell"], cwd="backend", stdout=subprocess.DEVNULL, input=("from subscriptions.models import Plan\nPlan.objects.create(name=\"" + free_plan_name + "\", price=0, price_id=\"free\")").encode())
		print(bcolors.OKGREEN + "Free plan created!" + bcolors.ENDC)



def main():
	print(bcolors.HEADER + "Welcome to the Nox Boilerplate setup!" + bcolors.ENDC)
	project_name = input("App name: ")

	backend_setup(project_name)
	frontend_setup(project_name)


if __name__ == "__main__":
	main()