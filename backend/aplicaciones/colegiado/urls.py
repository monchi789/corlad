from django.urls import path, include
from rest_framework import routers
from .views import ColegiadoViewSet


router = routers.DefaultRouter()
router.register(r'colegiados', ColegiadoViewSet, basename='colegiado')

# Definición de las URLs para la API utilizando el enrutador
urlpatterns = [
    path('', include(router.urls))
]
