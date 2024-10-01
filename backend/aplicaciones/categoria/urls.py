from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, CategoriaAPIView

# Creación de un enrutador por defecto
router = DefaultRouter()

router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'list-categoria', CategoriaAPIView, basename='list-categoria')

urlpatterns = [
    path('', include(router.urls)) 
]
