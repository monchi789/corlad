from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import PopUp
from .serializers import PopUpSerializer
from .filters import PopUpFilter
from .permissions import PopUpPermissions



# Vista para PopUps
class PopUpAPIView(viewsets.ViewSet):
    queryset = PopUp.objects.all()
    serializer_class = PopUpSerializer

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    permission_classes = [AllowAny]
    filterset_class = PopUpFilter

    allow_query_params = {
        'estado'
    }

    # Método para filtrar el queryset según los parámetros de consulta      
    def filter_queryset(self, queryset):
        filterset = self.filter_class(self.request.query_params, queryset=queryset)
        return filterset.qs
    
    # Obtener el serializador con los argumentos proporcionados
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    # Obtener el queryset completo de PopUps
    def get_queryset(self):
        return PopUp.objects.all()

    @swagger_auto_schema(
        operation_id='Listar PopUps',
        responses={200: openapi.Response(description='Lista PopUps disponibles')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros permitidos en la consulta
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.get_queryset()
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PopUpViewSet(viewsets.ViewSet):
    queryset = PopUp.objects.all()
    serializer_class = PopUpSerializer

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, PopUpPermissions]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = PopUpFilter

    allow_query_params = {
        'estado'
    }

    # Método para filtrar el queryset según los parámetros de consulta      
    def filter_queryset(self, queryset):
        filterset = self.filter_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    # Obtener un objeto por su ID
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return PopUp.objects.get(pk=pk)
        except PopUp.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)

    # Obtener el serializador con los argumentos proporcionados
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    # Obtener el queryset completo de PopUps
    def get_queryset(self):
        return PopUp.objects.all()
    
    # Métodos CRUD: GET, CREATE, UPDATE, DELETE

    # Listar todos los PopUps
    @swagger_auto_schema(
        operation_id='Listar PopUps',
        responses={200: openapi.Response(description='Lista PopUps disponibles')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros permitidos en la consulta
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.get_queryset()
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Obtener un PopUp por su ID
    @swagger_auto_schema(
        operation_id='Obtener un PopUp',
        responses={200: openapi.Response(description='Detalle de un PopUp')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except PopUp.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Crear un nuevo PopUp
    @swagger_auto_schema(
        operation_id='Crear un PopUp',
        request_body=PopUpSerializer,
        responses={201: openapi.Response(description='PopUp creado')}
    )
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Actualizar un PopUp existente
    @swagger_auto_schema(
        operation_id='Actualizar un PopUp',
        request_body=PopUpSerializer,
        responses={200: openapi.Response(description='PopUp actualizado')}
    )
    def update(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except PopUp.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Eliminar un PopUp por su ID
    @swagger_auto_schema(
        operation_id='Eliminar un PopUp',
        responses={204: openapi.Response(description='PopUp eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PopUp.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
