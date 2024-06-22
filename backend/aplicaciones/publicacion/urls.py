from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, PublicacionViewSet

router = DefaultRouter()

# Registrando las rutas
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'publicaciones', PublicacionViewSet, basename='publicacion')

urlpatterns = [
    path('', include(router.urls))
]
