from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from .models import PopUp, Slider
from .serializers import PopUpSerializer, SliderSerializer

# Create your views here.
#TODO: Definir el metodo get por ID
class PopUpViewSet(viewsets.ModelViewSet):
    queryset = PopUp.objects.all()
    serializer_class = PopUpSerializer

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['estado_popup']

    def list(self, request, *args, **kwargs):
        popups = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(popups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#TODO: Definir el metodo get por ID
class SliderViewSet(viewsets.ModelViewSet):
    queryset = Slider.objects.all()
    serializer_class = SliderSerializer

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['estado_slider']

    def list(self, request, *args, **kwargs):
        sliders = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(sliders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
