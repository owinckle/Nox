#!/usr/bin/env python
import os
import subprocess

# Constants
DEFAULT_API_BASE_URL = "http://localhost:8000/api"
DEFAULT_FREE_PLAN_NAME = "Free"
DEFAULT_FRONTEND_DOMAIN = "http://localhost:5173"

# Color codes for terminal output
class bcolors:
	HEADER = '\033[95m'
	OKBLUE = '\033[94m'
	OKGREEN = '\033[92m'
	WARNING = '\033[93m'
	FAIL = '\033[91m'
	ENDC = '\033[0m'
	BOLD = '\033[1m'
	UNDERLINE = '\033[4m'

# Function to write to .env files
def write_env_file(path, contents):
	with open(path, "w") as file:
		file.writelines(contents)

# Frontend setup function
def frontend_setup(project_name):
	print(bcolors.HEADER + "Setting up frontend..." + bcolors.ENDC)
	api_base_url = input(f"Base URL of your DRF API (Press enter for {DEFAULT_API_BASE_URL}): ").strip()
	api_base_url = api_base_url or DEFAULT_API_BASE_URL

	stripe_public_key = input("Stripe public key: ").strip()
	google_client_id = input("Google OAuth client ID: ").strip()

	frontend_env_content = [
		f"VITE_APP_NAME=\"{project_name}\"\n",
		f"VITE_API_BASE_URL=\"{api_base_url}\"\n",
		f"VITE_STRIPE_PUBLIC_KEY=\"{stripe_public_key}\"\n",
		f"VITE_GOOGLE_CLIENT_ID=\"{google_client_id}\"\n"
	]
	write_env_file("frontend/.env.local", frontend_env_content)
	print(bcolors.OKGREEN + "Generated frontend .env.local file." + bcolors.ENDC)

# Backend setup function
def backend_setup(project_name):
	print(bcolors.HEADER + "Setting up backend..." + bcolors.ENDC)
	domain = input(f"Domain of your frontend (Press enter for {DEFAULT_FRONTEND_DOMAIN}): ").strip()
	domain = domain or DEFAULT_FRONTEND_DOMAIN

	secret_key = subprocess.run(["python", "-c", "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"],
								cwd="backend", stdout=subprocess.PIPE).stdout.decode().strip()
	stripe_secret_key = input("Stripe secret key: ").strip()
	stripe_webhook_secret = input("Stripe webhook secret: ").strip()

	backend_env_content = [
		"# App\n",
		f"APP_NAME=\"{project_name}\"\n",
		f"SECRET_KEY=\"{secret_key}\"\n",
		"ENVIRONMENT=\"dev\"\n",
		f"DOMAIN=\"{domain}\"\n",
		"\n# Stripe\n",
		f"STRIPE_SECRET_KEY=\"{stripe_secret_key}\"\n",
		f"STRIPE_WEBHOOK_SECRET=\"{stripe_webhook_secret}\"\n"
	]
	write_env_file("backend/.env", backend_env_content)
	print(bcolors.OKGREEN + "Generated backend .env file." + bcolors.ENDC)

	# Database migration
	print(bcolors.OKGREEN + "Migrating backend database..." + bcolors.ENDC)
	subprocess.run(["python", "manage.py", "migrate"], cwd="backend")

	# Superuser creation
	print(bcolors.OKGREEN + "Creating super user..." + bcolors.ENDC)
	username = input("Username: ").strip()
	email = input("Email: ").strip()
	subprocess.run(["python", "manage.py", "createsuperuser", "--username", username, "--email", email], cwd="backend")

	# Free plan creation
	has_free_plan = input("Does your app have a free plan? (y/n): ").strip().lower()
	if has_free_plan == "y":
		free_plan_name = input(f"Name for the free plan (Press enter for \"{DEFAULT_FREE_PLAN_NAME}\"): ").strip()
		free_plan_name = free_plan_name or DEFAULT_FREE_PLAN_NAME
		print(bcolors.OKGREEN + "Creating free plan..." + bcolors.ENDC)
		subprocess.run(["python", "manage.py", "shell"], cwd="backend", stdout=subprocess.DEVNULL,
					input=("from subscriptions.models import Plan\n"
							f"Plan.objects.create(name=\"{free_plan_name}\", price=0, price_id=\"free\", features=\"Feature 1\nFeature 2\nFeature 3\")").encode())
		print(bcolors.OKGREEN + "Free plan created!" + bcolors.ENDC)

def main():
	print(bcolors.HEADER + "Welcome to the Nox Boilerplate setup!" + bcolors.ENDC)
	project_name = input("App name: ").strip()

	# Check if backend/db.sqlite3 exists, if yes, ask if user wants to continue
	if os.path.exists("backend/db.sqlite3"):
		choice = input("A database already exists, do you want to continue? (y/n): ").strip().lower()
		if choice != "y":
			print(bcolors.FAIL + "Setup cancelled." + bcolors.ENDC)
			return

	backend_setup(project_name)
	frontend_setup(project_name)
	print(bcolors.OKGREEN + "Setup complete!" + bcolors.ENDC)


if __name__ == "__main__":
	main()