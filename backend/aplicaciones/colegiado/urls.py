from django.urls import path, include
from rest_framework import routers
from .views import EscuelaViewSet, EspecialidadViewSet, ColegiadoViewSet, HistorialEducativoViewSet, ConsultarHabilidadViewSet

router = routers.DefaultRouter()
router.register(r'escuelas', EscuelaViewSet, basename='escuela')
router.register(r'especialidades', EspecialidadViewSet, basename='especilidad')
router.register(r'colegiados', ColegiadoViewSet, basename='colegiado')
router.register(r'historial-educativo', HistorialEducativoViewSet, basename='historial_educativo')
router.register(r'consultar-habilidad', ConsultarHabilidadViewSet, basename='consultar_habilidad')

urlpatterns = [
    path('', include(router.urls)),
]
