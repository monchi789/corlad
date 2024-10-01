from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Especialidad
from .serializers import EspecialidadSerializer
from .filters import EspecialidadFilter 
from .permissions import EspecialidadPermissions


class EspecialidadViewSet(viewsets.ViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer
    
    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, EspecialidadPermissions]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filterset_class = EspecialidadFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {
        'nombre_escuela', 'nombre_especialidad'
    }

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Especialidad.objects.get(pk=pk)
        except Especialidad.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return Especialidad.objects.all()
    
    def perform_update(self, serializer):
        try:
            serializer.save()
        except:
            return Response({'detail': 'Error al actualizar'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Metodo GET, UPDATE, CREATE y DELETE
    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar especialidad profesional',
        responses={200: openapi.Response(description='Lista de las especialidades profesionales')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo GET por ID
    @swagger_auto_schema(
        operation_id='Obtener una especialidad profesional',
        responses={200: openapi.Response(description='Detalle de una especialidad profesional')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Especialidad.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo CREATE
    @swagger_auto_schema(
        operation_id='Crear una especialidad profesional',
        request_body=EspecialidadSerializer,
        responses={201: openapi.Response(description='Especialidad profesional creada')}
    )
    def create(self, request):
        data = request.data.copy()
        
        # Manejar los IDs de las relaciones
        if 'id_escuela' in data and isinstance(data['id_escuela'], dict):
            data['id_escuela_id'] = data['id_escuela'].get('id')
            del data['id_escuela']

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Metodo UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar una especialidad profesional',
        request_body=EspecialidadSerializer,
        responses={200: openapi.Response(description='Especialidad profesional actualizada')}
    )
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        # Manejar los IDs de las relaciones si es necesario
        if 'id_escuela' in data and isinstance(data['id_escuela'], dict):
            data['id_escuela_id'] = data['id_escuela'].get('id')
            del data['id_escuela']

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save() 

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Metodo DELETE
    @swagger_auto_schema(
        operation_id='Eliminar una especialidad profesional',
        responses={204: openapi.Response(description='Especialidad profesional eliminada')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Especialidad.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

