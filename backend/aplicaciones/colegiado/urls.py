from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EscuelaViewSet, EspecialidadViewSet, ColegiadoViewSet

router = DefaultRouter()

# Registrando las rutas
router.register(r'escuelas', EscuelaViewSet, basename='escuela')
router.register(r'especialidades', EspecialidadViewSet, basename='especialidad')
router.register(r'colegiados', ColegiadoViewSet, basename='colegiado')

urlpatterns = [
    path('', include(router.urls)),
]
