from django.urls import path, include
from rest_framework import routers
from .views import EscuelaViewSet, EspecialidadViewSet, ColegiadoViewSet, HistorialEducativoViewSet

router = routers.DefaultRouter()
router.register(r'escuelas', EscuelaViewSet)
router.register(r'especialidades', EspecialidadViewSet)
router.register(r'colegiados', ColegiadoViewSet)
router.register(r'historial-educativo', HistorialEducativoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
