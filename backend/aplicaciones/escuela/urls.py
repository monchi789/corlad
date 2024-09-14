from django.urls import path, include
from rest_framework import routers
from .views import EscuelaViewSet


router = routers.DefaultRouter()
router.register(r'escuelas', EscuelaViewSet, basename='escuela')

# Definición de las URLs para la API utilizando el enrutador
urlpatterns = [
    path('', include(router.urls))
]
