from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import Colegiado, Escuela, Especialidad, HistorialEducativo
from .serializer import ColegiadoSerializer, EscuelaSerializer, EspecialidadSerializer, HistorialEducativoSerializer
from .filters import HistorialEducativoFilter


# Create your views here.
class EscuelaViewSet(viewsets.ViewSet):
    queryset = Escuela.objects.all()
    serializer_class = EscuelaSerializer

    # Metodos
    # def filter_queryset(self, queryset):
    #     filterset = self.filterset_class(self.request.query_params, queryset=queryset)
    #     return filterset.qs

    @swagger_auto_schema(
        operation_id='Listar escuelas profesionales',
        responses={200: openapi.Response(description='Lista de escuelas profesionales')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.queryset
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EspecialidadViewSet(viewsets.ViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

    # Metodos
    # def filter_queryset(self, queryset):
    #     filterset = self.filterset_class(self.request.query_params, queryset=queryset)
    #     return filterset.qs
    
    @swagger_auto_schema(
        operation_id='Listar especialidad profesional',
        responses={200: openapi.Response(description='Lista de las especialidades profesionales')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ColegiadoViewSet(viewsets.ViewSet):
    queryset = Colegiado.objects.all()
    serializer_class = ColegiadoSerializer

    @swagger_auto_schema(
        operation_id='Listar colegiados',
        responses={200: openapi.Response(description='Lista de colegiados')},
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HistorialEducativoViewSet(viewsets.ViewSet):
    queryset = HistorialEducativo.objects.all()
    serializer_class = HistorialEducativoSerializer
    filterset_class = HistorialEducativoFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {
        'estado', 'apellido_paterno', 'apellido_materno', 'nombre_escuela', 'nombre_especialidad', 'dni_colegiado', 'numero_colegiatura'
    }

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs
    

    @swagger_auto_schema(
        operation_id='Listar Historial Educativo',
        responses={200: openapi.Response (description='Lista de Historial Educativo')},
    )
    def list(self, request, *args, **kwargs):
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': f'Los parametros permitidos son {self.allow_query_params}'})

        queryset = self.filter_queryset(self.queryset)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
