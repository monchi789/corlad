from django.urls import path, include
from rest_framework import routers
from .views import HistorialEducativoViewSet, ConsultarHabilidadViewSet

router = routers.DefaultRouter()
router.register(r'historial-educativo', HistorialEducativoViewSet, basename='historial_educativo')
router.register(r'consultar-habilidad', ConsultarHabilidadViewSet, basename='consultar_habilidad')

# Definición de las URLs para la API utilizando el enrutador
urlpatterns = [
    path('', include(router.urls))
]
