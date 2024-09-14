from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Escuela
from .serializers import EscuelaSerializer
from .filters import EscuelaFilter
from .permissions import EscuelaPermissions
from functions.paginations import CustomPagination


class EscuelaViewSet(viewsets.ViewSet):
    queryset = Escuela.objects.all()
    serializer_class = EscuelaSerializer

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, EscuelaPermissions]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filterset_class = EscuelaFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {
        'nombre_escuela'
    }

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Escuela.objects.get(pk=pk)
        except Escuela.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return Escuela.objects.all()

    # Metodos GET, UPDATE, CREATE y DELETE
    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar escuelas profesionales',
        responses={200: openapi.Response(description='Lista de escuelas profesionales')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo GET por ID
    @swagger_auto_schema(
        operation_id='Obtener una escuela profesional',
        responses={200: openapi.Response(description='Detalle de una escuela profesional')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Escuela.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo CREATE
    @swagger_auto_schema(
        operation_id='Crear una escuela profesional',
        request_body=EscuelaSerializer,
        responses={201: openapi.Response(description='Escuela profesional creada')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Metodo UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar una escuela profesional',
        request_body=EscuelaSerializer,
        responses={200: openapi.Response(description='Escuela profesional actualizada')}
    )
    def update(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Escuela.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Metodo DELETE
    @swagger_auto_schema(
        operation_id='Eliminar una escuela profesional',
        responses={204: openapi.Response(description='Escuela profesional eliminada')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Escuela.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
