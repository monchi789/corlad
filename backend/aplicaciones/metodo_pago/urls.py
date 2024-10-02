from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MetodoPagoViewSet

# Creamos un enrutador predeterminado para los ViewSets
router = DefaultRouter()

# Ruta para los métodos de pago
router.register(r'metodo-pagos', MetodoPagoViewSet, basename='metodo_pago')

# Definimos las URLs de la aplicación
urlpatterns = [
    # Incluimos las URLs generadas por el enrutador
    path('', include(router.urls))
]
