from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Categoria, Publicacion
from .filters import CategoriaFilter, PublicacionFilter
from .serializers import CategoriaSerializer, PublicacionSerializer
from rest_framework.pagination import PageNumberPagination

# ViewSet para el modelo Categoria
class CategoriaAPIView(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()  # Consulta para obtener todas las categorías
    serializer_class = CategoriaSerializer  # Serializer para el modelo Categoria

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = CategoriaFilter

    # Parámetros permitidos para consultas
    allow_query_params = {
        'nombre_categoria'
    }

    # Métodos

    def filter_queryset(self, queryset):
        """Filtra el queryset según los parámetros permitidos"""
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs
    
    def get_queryset(self):
        """Obtiene el queryset para el ViewSet"""
        return Categoria.objects.all()
    
    # Método GET
    @swagger_auto_schema(
        operation_id='Listar Categorias',
        responses={200: openapi.Response(description='Lista de Categorias')}
    )
    def list(self, request, *args, **kwargs):
        """Lista todas las categorías"""
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.filter_queryset(self.get_queryset())
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()  # Consulta para obtener todas las categorías
    serializer_class = CategoriaSerializer  # Serializer para el modelo Categoria

    # JWT
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = CategoriaFilter

    # Parámetros permitidos para consultas
    allow_query_params = {
        'nombre_categoria'
    }

    # Métodos

    def filter_queryset(self, queryset):
        """Filtra el queryset según los parámetros permitidos"""
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        """Obtiene una instancia de Categoria por su ID"""
        pk = self.kwargs.get('pk')
        try:
            return Categoria.objects.get(pk=pk)
        except Categoria.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        """Obtiene el serializer para el ViewSet"""
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        """Obtiene el queryset para el ViewSet"""
        return Categoria.objects.all()

    # Métodos GET, UPDATE, CREATE y DELETE

    # Método GET
    @swagger_auto_schema(
        operation_id='Listar Categorias',
        responses={200: openapi.Response(description='Lista de Categorias')}
    )
    def list(self, request, *args, **kwargs):
        """Lista todas las categorías"""
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.filter_queryset(self.get_queryset())
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método GET por ID
    @swagger_auto_schema(
        operation_id='Obtener una Categoria',
        responses={200: openapi.Response(description='Detalle de una Categoria')}
    )
    def retrieve(self, request, pk=None):
        """Obtiene una categoría por su ID"""
        try:
            instance = self.get_queryset().get(pk=pk)
        except Categoria.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método CREATE
    @swagger_auto_schema(
        operation_id='Crear una Categoria',
        request_body=CategoriaSerializer,
        responses={201: openapi.Response(description='Categoria creada')}
    )
    def create(self, request):
        """Crea una nueva categoría"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar una Categoria',
        request_body=CategoriaSerializer,
        responses={200: openapi.Response(description='Categoria actualizada')}
    )
    def update(self, request, pk=None):
        """Actualiza una categoría existente"""
        try:
            instance = self.get_queryset().get(pk=pk)
        except Categoria.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Método DELETE
    @swagger_auto_schema(
        operation_id='Eliminar una Categoria',
        responses={204: openapi.Response(description='Categoria eliminada')}
    )
    def destroy(self, request, pk=None):
        """Elimina una categoría existente"""
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Categoria.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

# Paginación personalizada para el modelo Publicacion
class CustomPagination(PageNumberPagination):
    page_size = 10  # Tamaño de página por defecto
    page_size_query_param = 'page_size'  # Parámetro para especificar el tamaño de página
    max_page_size = 100  # Tamaño máximo de página

class PublicacionAPIView(viewsets.ViewSet):
    queryset = Publicacion.objects.all()  # Consulta para obtener todas las publicaciones
    serializer_class = PublicacionSerializer  # Serializer para el modelo Publicacion
    pagination_class = CustomPagination  # Clase de paginación personalizada

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = PublicacionFilter

    # Parámetros permitidos para consultas
    allow_query_params = {
        'titulo', 'fecha', 'categoria', 'page', 'page_size'
    }

    # Métodos

    def filter_queryset(self, queryset):
        """Filtra el queryset según los parámetros permitidos"""
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_serializer(self, *args, **kwargs):
        """Obtiene el serializer para el ViewSet"""
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        """Obtiene el queryset para el ViewSet"""
        return Publicacion.objects.all()

    # Métodos GET, UPDATE, CREATE y DELETE

    # Método GET
    @swagger_auto_schema(
        operation_id='Listar Publicaciones',
        responses={200: openapi.Response(description='Lista de Publicaciones')},
        manual_parameters=[
            openapi.Parameter('page', openapi.IN_QUERY, description="Número de página", type=openapi.TYPE_INTEGER),
            openapi.Parameter('page_size', openapi.IN_QUERY, description="Tamaño de página", type=openapi.TYPE_INTEGER),
        ]
    )
    def list(self, request, *args, **kwargs):
        """Lista todas las publicaciones"""
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_400_BAD_REQUEST)
                
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# ViewSet para el modelo Publicacion
class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()  # Consulta para obtener todas las publicaciones
    serializer_class = PublicacionSerializer  # Serializer para el modelo Publicacion
    pagination_class = CustomPagination  # Clase de paginación personalizada
    
    # JWT
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = PublicacionFilter

    # Parámetros permitidos para consultas
    allow_query_params = {
        'titulo', 'fecha', 'categoria', 'page', 'page_size'
    }

    # Métodos

    def filter_queryset(self, queryset):
        """Filtra el queryset según los parámetros permitidos"""
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        """Obtiene una instancia de Publicacion por su ID"""
        pk = self.kwargs.get('pk')
        try:
            return Publicacion.objects.get(pk=pk)
        except Publicacion.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        """Obtiene el serializer para el ViewSet"""
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        """Obtiene el queryset para el ViewSet"""
        return Publicacion.objects.all()

    # Métodos GET, UPDATE, CREATE y DELETE

    # Método GET
    @swagger_auto_schema(
        operation_id='Listar Publicaciones',
        responses={200: openapi.Response(description='Lista de Publicaciones')},
        manual_parameters=[
            openapi.Parameter('page', openapi.IN_QUERY, description="Número de página", type=openapi.TYPE_INTEGER),
            openapi.Parameter('page_size', openapi.IN_QUERY, description="Tamaño de página", type=openapi.TYPE_INTEGER),
        ]
    )
    def list(self, request, *args, **kwargs):
        """Lista todas las publicaciones"""
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_400_BAD_REQUEST)
                
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # Método GET por ID
    @swagger_auto_schema(
        operation_id='Obtener una Publicacion',
        responses={200: openapi.Response(description='Detalle de una Publicacion')}
    )
    def retrieve(self, request, pk=None):
        """Obtiene una publicación por su ID"""
        try:
            instance = self.get_queryset().get(pk=pk)
        except Publicacion.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método CREATE
    @swagger_auto_schema(
        operation_id='Crear una Publicacion',
        request_body=PublicacionSerializer,
        responses={201: openapi.Response(description='Publicacion creada')}
    )
    def create(self, request):
        """Crea una nueva publicación"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar una Publicacion',
        request_body=PublicacionSerializer,
        responses={200: openapi.Response(description='Publicacion actualizada')}
    )
    def update(self, request, *args, **kwargs):
        """Actualiza una publicación existente"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        # Manejar los IDS de las relaciones
        if 'id_categoria' in data and isinstance(data['id_categoria'], dict):
            data['id_categoria_id'] = data['id_categoria'].get('id')
            del data['id_categoria']
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método DELETE
    @swagger_auto_schema(
        operation_id='Eliminar una Publicacion',
        responses={204: openapi.Response(description='Publicacion eliminada')}
    )
    def destroy(self, request, pk=None):
        """Elimina una publicación existente"""
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Publicacion.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
