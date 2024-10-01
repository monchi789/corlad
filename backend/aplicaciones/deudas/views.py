from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from functions.paginations import CustomPagination
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django_filters.rest_framework import DjangoFilterBackend
from functions.paginations import CustomPagination
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from .serializers import DeudasSerializer
from .models import Deudas
from .filters import DeudasFilter
from .permissions import DeudasPermissions

# Create your views here.
class DeudasViewSet(viewsets.ViewSet):
    queryset = Deudas.objects.all()
    serializer_class = DeudasSerializer
    pagination_class = CustomPagination

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, DeudasPermissions]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = DeudasFilter

    allow_query_params = {
        'apellido_paterno', 'dni_colegiado',
        'numero_colegiatura', 'page', 'page_size'
    }

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Deudas.objects.get(pk=pk)
        except Deudas.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)
    
    def get_serializer(self, *args, **kwargs):
        try:
            return self.serializer_class(*args, **kwargs)
        except Exception as e:
            return Response({'detail': f'Error al obtener el serializer: {str(e)}'}, status=status.HTTP_404_NOT_FOUND)

    def perform_update(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            return Response({'detail': f'Error al actualizar: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        
    def get_queryset(self):
        try:
            return Deudas.objects.all()
        except Exception as e:
            return Response({'detail': f'Error al obtener el queryset: {str(e)}'}, status=status.HTTP_404_NOT_FOUND)
    
    def paginate_queryset(self, queryset):
        paginator = self.pagination_class()
        return paginator.paginate_queryset(queryset, self.request, view=self)
    
    def get_paginated_response(self, data):
        paginator = self.pagination_class()
        return paginator.get_paginated_response(data)

    @swagger_auto_schema(
        operation_id='Listar las Deudas',
        responses={200: openapi.Response(description='Lista de Deudas de los colegiados')}    
    )
    def list(self, request, *args, **kwargs):
        # Validar los paremetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request, self)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id='Obtener una Deuda',
        responses={200: openapi.Response(description='Detalle de una Deuda')}    
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Deudas.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    @swagger_auto_schema(
        operation_id='Crear una Deuda',
        request_body=DeudasSerializer,
        responses={201: openapi.Response(description='Deuda creada')}
    )
    def create(self, request):
        data = request.data.copy()

        # Manejar los IDs de las relaciones
        if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
            data['id_colegiado__id'] = data['id_colegiado'].get('id')

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id='Actualizar una Deuda',
        request_body=DeudasSerializer,
        responses={200: openapi.Response(description='Deuda actualizada')}
    )
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        # Manejar los IDs de las relaciones
        if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
            data['id_colegiado_id'] = data['id_colegiado'].get('id')
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
        except Deudas.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
