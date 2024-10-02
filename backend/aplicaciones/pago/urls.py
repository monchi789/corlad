from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PagoViewSet, EstadoCuentaViewSet

# Creamos un enrutador predeterminado para los ViewSets
router = DefaultRouter()

# Ruta para los pagos
router.register(r'pagos', PagoViewSet, basename='pago')
router.register(r'estado-cuenta', EstadoCuentaViewSet, basename='estado-cuenta')

# Definimos las URLs de la aplicación
urlpatterns = [
    # Incluimos las URLs generadas por el enrutador
    path('', include(router.urls))
]
