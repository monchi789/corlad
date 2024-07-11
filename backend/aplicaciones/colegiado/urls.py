from django.urls import path, include
from rest_framework import routers
from .views import EscuelaViewSet, EspecialidadViewSet, ColegiadoViewSet, HistorialEducativoViewSet, ConsultarHabilidadViewSet


# Definición del enrutador para las vistas de API
router = routers.DefaultRouter()
router.register(r'escuelas', EscuelaViewSet, basename='escuela')
router.register(r'especialidades', EspecialidadViewSet, basename='especialidad')
router.register(r'colegiados', ColegiadoViewSet, basename='colegiado')
router.register(r'historial-educativo', HistorialEducativoViewSet, basename='historial_educativo')
router.register(r'consultar-habilidad', ConsultarHabilidadViewSet, basename='consultar_habilidad')

# Definición de las URLs para la API utilizando el enrutador
urlpatterns = [
    path('', include(router.urls)),  # Incluye las URLs generadas por el enrutador
]
