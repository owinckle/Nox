from django.contrib import admin
from .models import Board, Labels, Post


admin.site.register(Board)
admin.site.register(Labels)
admin.site.register(Post)