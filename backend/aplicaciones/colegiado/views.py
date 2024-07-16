from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny

from .models import Colegiado, Escuela, Especialidad, HistorialEducativo
from .serializers import ColegiadoSerializer, EscuelaSerializer, EspecialidadSerializer, HistorialEducativoSerializer, ConsultarHabilidadSerializer
from .filters import HistorialEducativoFilter, ColegiadoFilter, EscuelaFilter, EspecialidadFilter, ConsultarHabilidadFilter
from .permission import EscuelaPermissions, ColegiadoPermissions, EspecialidadPermissions, HistorialEducativoPermissions


class EscuelaViewSet(viewsets.ViewSet):
    queryset = Escuela.objects.all()
    serializer_class = EscuelaSerializer

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
        serializer = EspecialidadSerializer(data=request.data)
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


class ColegiadoViewSet(viewsets.ModelViewSet):
    queryset = Colegiado.objects.all()
    serializer_class = ColegiadoSerializer

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

    def get_serializer(self, *args, **kwargs):
        # Obtener el serializador para la vista
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        # Obtener el queryset de todos los colegiados
        return Colegiado.objects.all()

    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar colegiados',
        responses={200: openapi.Response(description='Lista de colegiados')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros de la consulta permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_class(queryset, many=True)
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


class HistorialEducativoViewSet(viewsets.ViewSet):
    queryset = HistorialEducativo.objects.all()
    serializer_class = HistorialEducativoSerializer

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, HistorialEducativoPermissions]
    authentication_classes = [JWTAuthentication]
    
    # Aplicamos los filtros
    filterset_class = HistorialEducativoFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {
        'estado', 'apellido_paterno', 'apellido_materno', 'nombre_escuela', 'nombre_especialidad', 'dni_colegiado', 'numero_colegiatura'
    }

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return HistorialEducativo.objects.get(pk=pk)
        except HistorialEducativo.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)
    
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return HistorialEducativo.objects.all()
    
    def perfom_update(self, serializer):
        try:
            serializer.save()
        except:
            return Response({'detail': 'Error al actualizar'}, status=status.HTTP_404_NOT_FOUND)

    # Metodos GET, UPDATE, CREATE y UPDATE
    
    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar Historial Educativo',
        responses={200: openapi.Response (description='Lista de Historial Educativo')},
    )
    def list(self, request, *args, **kwargs):
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)

        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Metodo GET por ID
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except HistorialEducativo.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo CREATE
    @swagger_auto_schema(
        operation_id='Crear un historial educativo',
        request_body=HistorialEducativoSerializer,
        responses={201: openapi.Response(description='Historial Educativo creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Metodo UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar un Historial',
        request_body=ColegiadoSerializer,
        responses={201: openapi.Response(description='Actualizar un pago')}
    )
    def update(self, request, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        # Manejar los IDs de las relaciones
        if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
            data['id_colegiado_id'] = data['id_colegiado'].get('id')
            del data['id_colegiado']
        
        if 'id_especialidad' in data and isinstance(data['id_especialidad'], dict):
            data['id_especialidad_id'] = data['id_especialidad'].get('id')
            del data['id_especialidad']
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perfom_update(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Metodo DELETE
    @swagger_auto_schema(
            operation_id='Eliminar un historial educativo',
        responses={204: openapi.Response(description='Historial Educativo eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance =  self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except HistorialEducativo.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

# Consultar Habilidad
class ConsultarHabilidadViewSet(viewsets.ViewSet):
    queryset = HistorialEducativo.objects.all()
    serializer_class = ConsultarHabilidadSerializer
    permission_classes = [AllowAny]
    
    # Aplicamos los filtros
    filterset_class = ConsultarHabilidadFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {'dni_colegiado', 'numero_colegiatura', 'apellido_paterno', 'apellido_materno'}
    
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
        # Validar los parametros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
