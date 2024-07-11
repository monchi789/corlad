from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, PublicacionViewSet

# Creación de un enrutador por defecto
router = DefaultRouter()

# Registrando las rutas para los ViewSets de Categoria y Publicacion
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'publicaciones', PublicacionViewSet, basename='publicacion')

# Definición de las URLs de la aplicación
urlpatterns = [
    path('', include(router.urls))  # Incluyendo todas las rutas registradas en el router
]
