from django.urls import path
from .views import createMap

urlpatterns = [
    path('create-map/', createMap)
]
