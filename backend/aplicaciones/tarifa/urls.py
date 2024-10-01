from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarifaViewSet

router = DefaultRouter()

# Registrar las vistas con el enrutador
router.register(r'tarifas', TarifaViewSet, basename='tarifas')

urlpatterns = [
    path('', include(router.urls))
]
