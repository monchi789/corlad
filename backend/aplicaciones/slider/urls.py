from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SliderViewSet, SliderAPIView


router = DefaultRouter()

# Registrando las vistas con el enrutador
router.register(r'sliders', SliderViewSet, basename='slider')
router.register(r'list-sliders', SliderAPIView, basename='list-slider')

urlpatterns = [
    path('', include(router.urls)),
]
