from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from .models import Colegiado, Escuela, Especialidad
from .serializer import ColegiadoSerializer, EscuelaSerializer, EspecialidadSerializer
from .filters import ColegiadoFilter

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.
class EscuelaViewSet(viewsets.ViewSet):
    queryset = Escuela.objects.all()
    serializer_class = EscuelaSerializer

    def list(self, request, *args, **kwargs):
        escuelas = self.get_queryset()
        serializer = self.get_serializer(escuelas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EspecialidadViewSet(viewsets.ViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

    def list(self, request, *args, **kwargs):
        especialidades = self.get_queryset()
        serializer = self.get_serializer(especialidades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ColegiadoViewSet(viewsets.ViewSet):
    queryset = Colegiado.objects.all()
    serializer_class = ColegiadoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ColegiadoFilter

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs


    allow_query_params = {'estado', 'apellido_paterno', 'apellido_materno', 'nombre_escuela', 'nombre_especialidad', 'dni_colegiado', 'numero_colegiatura'}

    @swagger_auto_schema(
        operation_id='Listar colegiados',
        responses={200: openapi.Response(description="Lista de colegiados")},
    )
    def list(self, request, *args, **kwargs):
        # Validamos los parametros
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': f'Los parametros permitidos son: {self.allow_query_params}'})

        queryset = self.filter_queryset(self.queryset)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
