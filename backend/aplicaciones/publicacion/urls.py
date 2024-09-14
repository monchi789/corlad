from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicacionViewSet, PublicacionAPIView, BolsaTrabajo

# Creación de un enrutador por defecto
router = DefaultRouter()

router.register(r'publicaciones', PublicacionViewSet, basename='publicacion')
router.register(r'list-publicacion', PublicacionAPIView, basename='list-publicacion')
router.register(r'bolsa-trabajos', BolsaTrabajo, basename='bolsa-trabajo')


urlpatterns = [
    path('', include(router.urls)) 
]
