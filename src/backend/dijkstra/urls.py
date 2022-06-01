from django.urls import path
from .views import createMap, showMap

urlpatterns = [
    path('create-map/', createMap),
    path('show-map/', showMap)
]
