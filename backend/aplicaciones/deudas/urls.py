from django.urls import path, include
from rest_framework import routers
from .views import DeudasViewSet

router = routers.DefaultRouter()

router.register(r'deudas', DeudasViewSet, basename='deudas')

urlpatterns = [
    path('', include(router.urls))
]
