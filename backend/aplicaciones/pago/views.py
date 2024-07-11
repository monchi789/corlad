from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django_filters.rest_framework import DjangoFilterBackend

from .models import EstadoCuenta, Pago, MetodoPago, TipoPago
from .filters import EstadoCuentaFilter, TipoPagoFilter, PagoFilter, MetodoPagoFilter
from ..colegiado.models import Colegiado
from .serializers import PagoSerializer, EstadoCuentaSerializer, MetodoPagoSerializer, TipoPagoSerializer

# ViewSet para los Métodos de Pago
class MetodoPagoViewSet(viewsets.ViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer

    # Aplicamos el filtro backend para DjangoFilterBackend
    filter_backends = [DjangoFilterBackend]
    filterset_class = MetodoPagoFilter

    # Lista de parámetros permitidos en las consultas
    allow_query_params = {
        'nombre_metodo_pago'
    }

    # Método para filtrar el queryset con los parámetros permitidos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    # Obtener un objeto específico por ID
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return MetodoPago.objects.get(pk=pk)
        except MetodoPago.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)

    # Obtener el serializer adecuado
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    # Obtener todos los objetos del queryset
    def get_queryset(self):
        return MetodoPago.objects.all()

    # Método para listar todos los Métodos de Pago
    @swagger_auto_schema(
        operation_id='Listar métodos de pago',
        responses={200: openapi.Response(description='Lista de métodos de pago')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para obtener un Método de Pago por ID
    @swagger_auto_schema(
        operation_id='Obtener un Método de Pago',
        responses={200: openapi.Response(description='Detalle de un Método de Pago')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except MetodoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para crear un Método de Pago
    @swagger_auto_schema(
        operation_id='Crear un método de pago',
        request_body=MetodoPagoSerializer,
        responses={201: openapi.Response(description='Método de pago creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método para actualizar un Método de Pago
    @swagger_auto_schema(
        operation_id='Actualizar un Método de Pago',
        request_body=MetodoPagoSerializer,
        responses={200: openapi.Response(description='Método de pago actualizado')}
    )
    def update(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except MetodoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Método para eliminar un Método de Pago
    @swagger_auto_schema(
        operation_id='Eliminar un Método de Pago',
        responses={204: openapi.Response(description='Método de Pago eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MetodoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)


# ViewSet para los Tipos de Pago
class TipoPagoViewSet(viewsets.ViewSet):
    queryset = TipoPago.objects.all()
    serializer_class = TipoPagoSerializer

    # Aplicamos el filtro backend para DjangoFilterBackend
    filter_backends = [DjangoFilterBackend]
    filterset_class = TipoPagoFilter

    # Lista de parámetros permitidos en las consultas
    allow_query_params = {
        'nombre_tipo_pago'
    }

    # Método para filtrar el queryset con los parámetros permitidos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    # Obtener un objeto específico por ID
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return TipoPago.objects.get(pk=pk)
        except TipoPago.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)

    # Obtener el serializer adecuado
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    # Obtener todos los objetos del queryset
    def get_queryset(self):
        return TipoPago.objects.all()

    # Método para listar todos los Tipos de Pago
    @swagger_auto_schema(
        operation_id='Listar Tipos de Pago',
        responses={200: openapi.Response(description='Lista de Tipos de Pago')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para obtener un Tipo de Pago por ID
    @swagger_auto_schema(
        operation_id='Obtener un Tipo de Pago',
        responses={200: openapi.Response(description='Detalle de un Tipo de Pago')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except TipoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para crear un Tipo de Pago
    @swagger_auto_schema(
        operation_id='Crear un Tipo de Pago',
        request_body=TipoPagoSerializer,
        responses={201: openapi.Response(description='Tipo de Pago creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método para actualizar un Tipo de Pago
    @swagger_auto_schema(
        operation_id='Actualizar un Tipo de Pago',
        request_body=TipoPagoSerializer,
        responses={200: openapi.Response(description='Tipo de Pago actualizado')}
    )
    def update(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except TipoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Método para eliminar un Tipo de Pago
    @swagger_auto_schema(
        operation_id='Eliminar un Tipo de Pago',
        responses={204: openapi.Response(description='Tipo de Pago eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TipoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)


# ViewSet para los Pagos
class PagoViewSet(viewsets.ViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

    # Aplicamos el filtro backend para DjangoFilterBackend
    filter_backends = [DjangoFilterBackend]
    filterset_class = PagoFilter

    # Lista de parámetros permitidos en las consultas
    allow_query_params = {
        'monto',
        'fecha',
        'numero_operacion',
        'meses',
        'observacion',
        'id_colegiado',
        'id_tipo_pago',
        'id_metodo_pago'
    }

    # Método para filtrar el queryset con los parámetros permitidos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    # Obtener un objeto específico por ID
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Pago.objects.get(pk=pk)
        except Pago.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)

    # Obtener el serializer adecuado
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    # Obtener todos los objetos del queryset
    def get_queryset(self):
        return Pago.objects.all()

    # Método para listar todos los Pagos
    @swagger_auto_schema(
        operation_id='Listar Pagos',
        responses={200: openapi.Response(description='Lista de Pagos')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para obtener un Pago por ID
    @swagger_auto_schema(
        operation_id='Obtener un Pago',
        responses={200: openapi.Response(description='Detalle de un Pago')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Pago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para crear un Pago
    @swagger_auto_schema(
        operation_id='Crear un Pago',
        request_body=PagoSerializer,
        responses={201: openapi.Response(description='Pago creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Validación personalizada para permitir solo un pago inicial por colegiado
            id_colegiado = request.data.get('id_colegiado')
            id_tipo_pago = request.data.get('id_tipo_pago')
            tipo_pago = TipoPago.objects.get(pk=id_tipo_pago)
            if tipo_pago.nombre_tipo_pago == 'matrícula' and Pago.objects.filter(id_colegiado=id_colegiado, id_tipo_pago=id_tipo_pago).exists():
                return Response({'detail': 'Ya existe un pago de matrícula para este colegiado'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método para actualizar un Pago
    @swagger_auto_schema(
        operation_id='Actualizar un Pago',
        request_body=PagoSerializer,
        responses={200: openapi.Response(description='Pago actualizado')}
    )
    def update(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Pago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Método para eliminar un Pago
    @swagger_auto_schema(
        operation_id='Eliminar un Pago',
        responses={204: openapi.Response(description='Pago eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Pago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)


# ViewSet para los Estados de Cuenta
class EstadoCuentaViewSet(viewsets.ViewSet):
    queryset = EstadoCuenta.objects.all()
    serializer_class = EstadoCuentaSerializer

    # Aplicamos el filtro backend para DjangoFilterBackend
    filter_backends = [DjangoFilterBackend]
    filterset_class = EstadoCuentaFilter

    # Lista de parámetros permitidos en las consultas
    allow_query_params = {
        'id_colegiado'
    }

    # Método para filtrar el queryset con los parámetros permitidos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    # Obtener un objeto específico por ID
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return EstadoCuenta.objects.get(pk=pk)
        except EstadoCuenta.DoesNotExist:
            return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)

    # Obtener el serializer adecuado
    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    # Obtener todos los objetos del queryset
    def get_queryset(self):
        return EstadoCuenta.objects.all()

    # Método para listar todos los Estados de Cuenta
    @swagger_auto_schema(
        operation_id='Listar Estados de Cuenta',
        responses={200: openapi.Response(description='Lista de Estados de Cuenta')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros permitidos
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parámetro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para obtener un Estado de Cuenta por ID
    @swagger_auto_schema(
        operation_id='Obtener un Estado de Cuenta',
        responses={200: openapi.Response(description='Detalle de un Estado de Cuenta')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except EstadoCuenta.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Método para crear un Estado de Cuenta
    @swagger_auto_schema(
        operation_id='Crear un Estado de Cuenta',
        request_body=EstadoCuentaSerializer,
        responses={201: openapi.Response(description='Estado de Cuenta creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Método para actualizar un Estado de Cuenta
    @swagger_auto_schema(
        operation_id='Actualizar un Estado de Cuenta',
        request_body=EstadoCuentaSerializer,
        responses={200: openapi.Response(description='Estado de Cuenta actualizado')}
    )
    def update(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except EstadoCuenta.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Método para eliminar un Estado de Cuenta
    @swagger_auto_schema(
        operation_id='Eliminar un Estado de Cuenta',
        responses={204: openapi.Response(description='Estado de Cuenta eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EstadoCuenta.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
