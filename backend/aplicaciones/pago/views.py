from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import EstadoCuenta, Pago, MetodoPago, TipoPago
from ..colegiado.models import Colegiado
from .serializers import PagoSerializer, EstadoCuentaSerializer, MetodoPagoSerializer, TipoPagoSerializer


#TODO: Definir el metodo get por ID
# Create your views here.
class MetodoPagoViewSet(viewsets.ViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer

    @swagger_auto_schema(
        operation_id='Listar metodos de pago',
        responses={200: openapi.Response(description='Lista de los metodos de pago')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los  parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


#TODO: Definir el metodo get por ID
class TipoPagoViewSet(viewsets.ViewSet):
    queryset = TipoPago.objects.all()
    serializer_class = TipoPagoSerializer

    @swagger_auto_schema(
        operation_id='Listar tipos de pagos',
        responses={200: openapi.Response(description='Lista del tipo de pago')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#TODO: Definir el metodo get por ID
class PagoViewSet(viewsets.ViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

    # Metodos para los metodos
    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Pago.objects.get(pk=pk)
        except Pago.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)
    
    def get_serializer(self, *args, **kwargs):
        try:
            return self.serializer_class(*args, **kwargs)
        except:
            return Response({'detail': 'Error al obtener el serializer'}, status=status.HTTP_404_NOT_FOUND)

    def perform_update(self, serializer):
        try:
            serializer.save()
        except:
            return Response({'detail': 'Error al actualizar'}, status=status.HTTP_400_BAD_REQUEST)
        
    def get_queryset(self):
        try:
            return self.queryset
        except:
            return Response({'detail': 'Error al obtener el queryset'}, status=status.HTTP_404_NOT_FOUND)


    @swagger_auto_schema(
        operation_id='Lista de pagos',
        responses={200: openapi.Response(description='Lista de Pagos de los colegiados')}    
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud.'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except Pago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)


    @swagger_auto_schema(
        operation_id='Actualizar pagos',
        responses={201: openapi.Response(description='Actualizar un pago')}
    )
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        # Manejar los IDs de las relaciones
        if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
            data['id_colegiado_id'] = data['id_colegiado'].get('id')
            del data['id_colegiado']
        
        if 'id_metodo_pago' in data and isinstance(data['id_metodo_pago'], dict):
            data['id_metodo_pago_id'] = data['id_metodo_pago'].get('id')
            del data['id_metodo_pago']

        if 'id_tipo_pago' in data and isinstance(data['id_tipo_pago'], dict):
            data['id_tipo_pago_id'] = data['id_tipo_pago'].get('id')
            del data['id_tipo_pago']
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
   
    
#TODO: Definir el metodo get por ID
class EstadoCuentaViewSet(viewsets.ViewSet):
    queryset = EstadoCuenta.objects.all()
    serializer_class = EstadoCuentaSerializer

    @swagger_auto_schema(
        operation_id='Listar estado de cuenttas de colegiados',
        responses={200: openapi.Response(description='Lista de los estado de cuenta de los colegiados')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)

        estado_cuentas = self.queryset
        serializer = self.serializer_class(estado_cuentas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
