from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import PopUp, Slider
from .serializer import PopUpSerializer, SliderSerializer

# Create your views here.
class PopUpViewSet(viewsets.ModelViewSet):
    queryset = PopUp.objects.all()
    serializer_class = PopUpSerializer

    def list(self, request, *args, **kwargs):
        popups = self.get_queryset()
        serializer = self.get_serializer(popups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SliderViewSet(viewsets.ModelViewSet):
    queryset = Slider.objects.all()
    serializer_class = SliderSerializer

    def list(self, request, *args, **kwargs):
        sliders = self.get_queryset()
        serializer = self.get_serializer(sliders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
