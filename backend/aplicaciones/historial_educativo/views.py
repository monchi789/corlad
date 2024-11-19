from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import HistorialEducativo
from .serializers import HistorialEducativoSerializer, ConsultarHabilidadSerializer
from .filters import HistorialEducativoFilter,ConsultarHabilidadFilter
from .permissions import HistorialEducativoPermissions
from functions.paginations import CustomPagination



class HistorialEducativoViewSet(viewsets.ViewSet):
    queryset = HistorialEducativo.objects.all()
    serializer_class = HistorialEducativoSerializer
    pagination_class = CustomPagination

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, HistorialEducativoPermissions]
    authentication_classes = [JWTAuthentication]
    
    # Aplicamos los filtros
    filterset_class = HistorialEducativoFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {
        'estado_activo', 'apellido_paterno', 'apellido_materno', 'nombre_escuela', 'nombre_especialidad', 'dni_colegiado', 'numero_colegiatura', 
        'page', 'page_size'
    }

    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return HistorialEducativo.objects.get(pk=pk)
        except HistorialEducativo.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)
    
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return HistorialEducativo.objects.all()
    
    def perform_update(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            return Response({'detail': f'Error al actualizar: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    
    def paginate_queryset(self, queryset):
        paginator = self.pagination_class()
        return paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        paginator = self.pagination_class()
        return paginator.get_paginated_response(data)


    # Métodos GET
    @swagger_auto_schema(
        operation_id='Listar Historial Educativo',
        responses={200: openapi.Response(description='Lista de Historial Educativo')},
    )
    def list(self, request, *args, **kwargs):
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.filter_queryset(self.get_queryset())
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request, self)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except HistorialEducativo.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id='Crear un historial educativo',
        request_body=HistorialEducativoSerializer,
        responses={201: openapi.Response(description='Historial Educativo creado')}
    )
    def create(self, request):
        data = request.data.copy()

        # Manejar los IDs de las relaciones
        if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
            data['id_colegiado_id'] = data['id_colegiado'].get('id')
        if 'id_especialidad' in data and isinstance(data['id_especialidad'], dict):
            data['id_especialidad_id'] = data['id_especialidad'].get('id')

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
    operation_id='Actualizar un Historial',
    request_body=HistorialEducativoSerializer,
    responses={200: openapi.Response(description='Historial educativo actualizado')}
    )
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        # Manejar los IDs de las relaciones
        for field in ['id_colegiado', 'id_especialidad']:
            if field in data and isinstance(data[field], dict):
                data[f'{field}_id'] = data[field].get('id')
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id='Eliminar un historial educativo',
        responses={204: openapi.Response(description='Historial Educativo eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except HistorialEducativo.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)


# Consultar Habilidad
class ConsultarHabilidadViewSet(viewsets.ViewSet):
    queryset = HistorialEducativo.objects.all()
    serializer_class = ConsultarHabilidadSerializer
    pagination_class = CustomPagination
    permission_classes = [AllowAny]
    
    # Aplicamos los filtros
    filterset_class = ConsultarHabilidadFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {
        'dni_colegiado', 'numero_colegiatura', 'apellido_paterno', 'apellido_materno', 'estado_activo'
    }
    
    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return HistorialEducativo.objects.all()

    @swagger_auto_schema(
        operation_id='Listar Habilidades Colegiados',
        responses={200: openapi.Response(description='Lista de habilidades  de colegiados')}
    )
    def list(self, request, *args, **kwargs):
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_400_BAD_REQUEST)
                
        queryset = self.filter_queryset(self.get_queryset())
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request, self)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
