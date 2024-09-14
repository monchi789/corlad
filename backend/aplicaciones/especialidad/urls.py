from django.urls import path, include
from rest_framework import routers
from .views import EspecialidadViewSet

router = routers.DefaultRouter()
router.register(r'especialidades', EspecialidadViewSet, basename='especialidad')


# Definición de las URLs para la API utilizando el enrutador
urlpatterns = [
    path('', include(router.urls))
]
