from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import EstadoCuenta, Pago
from .serializer import PagoSerializer, EstadoCuentaSerializer


# Create your views here.
class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

    def list(self, request, *args, **kwargs):
        pagos = self.get_queryset()
        serializer = self.get_serializer(pagos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EstadoCuentaViewSet(viewsets.ModelViewSet):
    queryset = EstadoCuenta.objects.all()
    serializer_class = EstadoCuentaSerializer

    def list(self, request, *args, **kwargs):
        estado_cuentas = self.get_queryset()
        serializer = self.get_serializer(estado_cuentas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
