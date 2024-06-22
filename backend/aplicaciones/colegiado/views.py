from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Colegiado, Escuela, Especialidad
from .serializer import ColegiadoSerializer, EscuelaSerializer, EspecialidadSerializer

# Create your views here.
class EscuelaViewSet(viewsets.ModelViewSet):
    queryset = Escuela.objects.all()
    serializer_class = EscuelaSerializer

    def list(self, request, *args, **kwargs):
        escuelas = self.get_queryset()
        serializer = self.get_serializer(escuelas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

    def list(self, request, *args, **kwargs):
        especialidades = self.get_queryset()
        serializer = self.get_serializer(especialidades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ColegiadoViewSet(viewsets.ModelViewSet):
    queryset = Colegiado.objects.all()
    serializer_class = ColegiadoSerializer

    def list(self, request, *args, **kwargs):
        colegiados = self.get_queryset()
        serializer = self.get_serializer(colegiados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
