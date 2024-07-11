from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PagoViewSet, EstadoCuentaViewSet, TipoPagoViewSet, MetodoPagoViewSet

# Creamos un enrutador predeterminado para los ViewSets
router = DefaultRouter()

# Registrando las rutas para cada ViewSet

# Ruta para los pagos
router.register(r'pagos', PagoViewSet, basename='pago')

# Ruta para los estados de cuenta
router.register(r'estado-cuentas', EstadoCuentaViewSet, basename='estado_cuenta'),

# Ruta para los tipos de pago
router.register(r'tipo-pagos', TipoPagoViewSet, basename='tipo_pago')

# Ruta para los métodos de pago
router.register(r'metodo-pagos', MetodoPagoViewSet, basename='metodo_pago')


# Definimos las URLs de la aplicación
urlpatterns = [
    # Incluimos las URLs generadas por el enrutador
    path('', include(router.urls))
]
