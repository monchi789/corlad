from django.urls import path, include
from rest_framework import routers
from .views import EscuelaViewSet, EspecialidadViewSet, ColegiadoViewSet

router = routers.DefaultRouter()
router.register(r'escuelas', EscuelaViewSet)
router.register(r'especialidades', EspecialidadViewSet)
router.register(r'colegiados', ColegiadoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
