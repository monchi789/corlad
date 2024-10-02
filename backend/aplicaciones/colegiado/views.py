from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Colegiado
from .serializers import ColegiadoSerializer
from .filters import ColegiadoFilter
from .permissions import ColegiadoPermissions
from functions.paginations import CustomPagination

# COLEGIADO
class ColegiadoViewSet(viewsets.ViewSet):
    queryset = Colegiado.objects.all()
    serializer_class = ColegiadoSerializer
    pagination_class = CustomPagination 

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, ColegiadoPermissions]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filterset_class = ColegiadoFilter
    filter_backends = [DjangoFilterBackend]

    # Métodos permitidos para filtros en la URL
    allow_query_params = {
        'numero_colegiatura', 'dni_colegiado', 'apellido_paterno', 'estado'
    }

    # Metodos
    def filter_queryset(self, queryset):
        # Filtrar utilizando el filtro definido
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        # Obtener un objeto por su clave primaria (id)
        pk = self.kwargs.get('pk')
        try:
            return Colegiado.objects.get(pk=pk)
        except Colegiado.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)

    def perform_update(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            return Response({'detail': f'Error al actualizar: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer(self, *args, **kwargs):
        # Obtener el serializador para la vista
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        # Obtener el queryset de todos los colegiados
        return Colegiado.objects.all()

    def paginate_queryset(self, queryset):
        paginator = self.pagination_class()
        return paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        paginator = self.pagination_class()
        return paginator.get_paginated_response(data)

    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar colegiados',
        responses={200: openapi.Response(description='Lista de colegiados')}
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
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Metodo GET por ID
    @swagger_auto_schema(
        operation_id='Obtener un colegiado por ID',
        responses={200: openapi.Response(description='Detalle de un colegiado')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Colegiado.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo CREATE
    @swagger_auto_schema(
        operation_id='Crear un colegiado',
        request_body=ColegiadoSerializer,
        responses={201: openapi.Response(description='Colegiado creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Metodo UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar un colegiado',
        request_body=ColegiadoSerializer,
        responses={200: openapi.Response(description='Colegiado actualizado')}
    )
    def update(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Colegiado.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Metodo DELETE
    @swagger_auto_schema(
        operation_id='Eliminar un colegiado',
        responses={204: openapi.Response(description='Colegiado eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Colegiado.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

