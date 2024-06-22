from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PagoViewSet, EstadoCuentaViewSet

router = DefaultRouter()

# Registrando las rutas
router.register(r'pagos', PagoViewSet, basename='pago')
router.register(r'estado-cuentas', EstadoCuentaViewSet, basename='estado_cuenta')

urlpatterns = [
    path('', include(router.urls))
]
