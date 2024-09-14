from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Publicacion
from .filters import PublicacionFilter
from .serializers import PublicacionSerializer
from functions.paginations import CustomPagination
from .permissions import PublicacionPermissions


class PublicacionAPIView(viewsets.ViewSet):
    queryset = Publicacion.objects.all() 
    serializer_class = PublicacionSerializer 
    pagination_class = CustomPagination  

    # Aplicamos los permisos
    filter_backends = [DjangoFilterBackend]
    permission_classes = [AllowAny]
    filterset_class = PublicacionFilter

    # Parámetros permitidos para consultas
    allow_query_params = {
        'titulo', 'fecha', 'categoria', 'page', 'page_size'
    }


    # Métodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return Publicacion.objects.all()
    
    def paginate_queryset(self, queryset):
        paginator = self.pagination_class()
        return paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        paginator = self.pagination_class()
        return paginator.get_paginated_response(data)

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
    

# ViewSet para el modelo Publicacion
class PublicacionViewSet(viewsets.ViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer
    pagination_class = CustomPagination
    
    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, PublicacionPermissions]
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
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Publicacion.objects.get(pk=pk)
        except Publicacion.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return Publicacion.objects.all()
    
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



# Vista que lista con filtro de Bolsa de Trabajo
class BolsaTrabajo(viewsets.ViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer
    pagination_class = CustomPagination

    permission_classes = [AllowAny]
   


    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = PublicacionFilter


    # Parámetros permitidos para consultas
    allow_query_params = {
        'titulo', 'fecha', 'categoria', 'page', 'page_size'
    }

    # Métodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Publicacion.objects.get(pk=pk)
        except Publicacion.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return Publicacion.objects.all()
    
    def paginate_queryset(self, queryset):
        paginator = self.pagination_class()
        return paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        paginator = self.pagination_class()
        return paginator.get_paginated_response(data)

    def list(self, request, *args, **kwargs):
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_400_BAD_REQUEST)
            
        queryset = self.filter_queryset(self.get_queryset())

        # Filtro para que solo liste las publicaciones con el nombre "Bolsa Trabajo"
        queryset = queryset.filter(id_categoria__nombre_categoria="Bolsa Trabajo")

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request, self)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
