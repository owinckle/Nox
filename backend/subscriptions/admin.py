from django.contrib import admin
from .models import Plan, UserSubscription


class PlanAdmin(admin.ModelAdmin):
	list_display = ("name", "price", "price_id")

admin.site.register(Plan, PlanAdmin)

class UserSubscriptionAdmin(admin.ModelAdmin):
	list_display = ("user", "plan", "status", "created_at", "updated_at")

admin.site.register(UserSubscription, UserSubscriptionAdmin)