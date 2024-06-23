from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PopUpViewSet, SliderViewSet

router = DefaultRouter()

# Registrando las rutas
router.register(r'pop-ups', PopUpViewSet, basename='pop-up')
router.register(r'sliders', SliderViewSet, basename='slider')

urlpatterns = [
    path('', include(router.urls))
]
