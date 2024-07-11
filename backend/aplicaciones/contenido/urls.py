from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PopUpViewSet, SliderViewSet

# Creamos un enrutador para manejar las vistas de API con rutas automáticas
router = DefaultRouter()

# Registrando las vistas con el enrutador
router.register(r'pop-ups', PopUpViewSet, basename='pop-up')  # Ruta para las vistas de PopUpViewSet
router.register(r'sliders', SliderViewSet, basename='slider')  # Ruta para las vistas de SliderViewSet

# Definimos las URLs de la aplicación, incluyendo las generadas por el enrutador
urlpatterns = [
    path('', include(router.urls)),  # Incluimos las rutas generadas por el enrutador en las URLs principales
]
