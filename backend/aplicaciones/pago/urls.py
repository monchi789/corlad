from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PagoViewSet, EstadoCuentaViewSet, TipoPagoViewSet, MetodoPagoViewSet

router = DefaultRouter()

# Registrando las rutas
router.register(r'pagos', PagoViewSet, basename='pago')
router.register(r'estado-cuentas', EstadoCuentaViewSet, basename='estado_cuenta'),
router.register(r'tipo-pagos', TipoPagoViewSet, basename='tipo_pago')
router.register(r'metodo-pagos', MetodoPagoViewSet, basename='metodo_pago')


urlpatterns = [
    path('', include(router.urls))
]
