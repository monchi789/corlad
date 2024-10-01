from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PopUpViewSet, PopUpAPIView


router = DefaultRouter()

# Registrando las vistas con el enrutador
router.register(r'pop-ups', PopUpViewSet, basename='pop-up')
router.register(r'list-pop-ups', PopUpAPIView, basename='list-pop-up')

urlpatterns = [
    path('', include(router.urls))
]
