from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import EstadoCuenta, Pago, MetodoPago, TipoPago
from ..colegiado.models import Colegiado
from .serializers import PagoSerializer, MetodoPagoSerializer, TipoPagoSerializer


from rest_framework.exceptions import ValidationError


#TODO: Definir el metodo get por ID
# Create your views here.
class MetodoPagoViewSet(viewsets.ViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return MetodoPago.objects.get(pk=pk)
        except MetodoPago.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return MetodoPago.objects.all()

    # Metodos GET, UPDATE, CREATE y DELETE

    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar metodos de pago',
        responses={200: openapi.Response(description='Lista de metodos de pago')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.get_queryset()
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo GET por ID
    @swagger_auto_schema(
        operation_id='Obtener un Metodo de Pago',
        responses={200: openapi.Response(description='Detalle de un Metodo de Pago')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except MetodoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo CREATE
    @swagger_auto_schema(
        operation_id='Crear un metodo de pago',
        request_body=MetodoPagoSerializer,
        responses={201: openapi.Response(description='Metodo de pago creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Metodo UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar un Metodo de Pago',
        request_body=MetodoPagoSerializer,
        responses={200: openapi.Response(description='Metodo de pago Actualizado')}
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
    
    # Metodo DELETE
    @swagger_auto_schema(
        operation_id='Eliminar un Metodo de Pago',
        responses={204: openapi.Response(description='Metodo de Pago eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MetodoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)


#TODO: Definir el metodo get por ID
class TipoPagoViewSet(viewsets.ViewSet):
    queryset = TipoPago.objects.all()
    serializer_class = TipoPagoSerializer

    # Metodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return TipoPago.objects.get(pk=pk)
        except TipoPago.DoesNotExist:
            return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)
    
    def get_queryset(self):
        return TipoPago.objects.all()

    # Metodos GET, UPDATE, CREATE y DELETE

    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar Tipo de Pago',
        responses={200: openapi.Response(description='Lista de Tipo de Pagos')}
    )
    def list(self, request, *args, **kwargs):
        # Validar los parametros permitidos
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.get_queryset()
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo GET por ID
    @swagger_auto_schema(
        operation_id='Obtener un Metodo de Pago',
        responses={200: openapi.Response(description='Detalle de un Metodo de Pago')}
    )
    def retrieve(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
        except TipoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo CREATE
    @swagger_auto_schema(
        operation_id='Crear un Metodo de Pago',
        request_body=TipoPagoSerializer,
        responses={201: openapi.Response(description='Metodo de Pago creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Metodo UPDATE
    @swagger_auto_schema(
        operation_id='Actualizar un Metodo de Pago',
        request_body=TipoPagoSerializer,
        responses={200: openapi.Response(description='Metodo de Pago Actualizado')}
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
    
    # Metodo DELETE
    @swagger_auto_schema(
        operation_id='Eliminar un Metodo de Pago',
        responses={204: openapi.Response(description='Metodo de Pago Eliminado')}
    )
    def destroy(self, request, pk=None):
        try:
            instance = self.get_queryset().get(pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TipoPago.DoesNotExist:
            return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)


#TODO: Definir el metodo get por ID
# class PagoViewSet(viewsets.ViewSet):
#     queryset = Pago.objects.all()
#     serializer_class = PagoSerializer

#     def get_object(self):
#         pk = self.kwargs.get('pk')
#         try:
#             return Pago.objects.get(pk=pk)
#         except Pago.DoesNotExist:
#             return Response({'detail': 'No se encontró el ID'}, status=status.HTTP_404_NOT_FOUND)
    
#     def get_serializer(self, *args, **kwargs):
#         try:
#             return self.serializer_class(*args, **kwargs)
#         except Exception as e:
#             return Response({'detail': f'Error al obtener el serializer: {str(e)}'}, status=status.HTTP_404_NOT_FOUND)

#     def perform_update(self, serializer):
#         try:
#             serializer.save()
#         except Exception as e:
#             return Response({'detail': f'Error al actualizar: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
        
#     def get_queryset(self):
#         try:
#             return self.queryset
#         except Exception as e:
#             return Response({'detail': f'Error al obtener el queryset: {str(e)}'}, status=status.HTTP_404_NOT_FOUND)

#     @swagger_auto_schema(
#         operation_id='Listar los Pagos',
#         responses={200: openapi.Response(description='Lista de Pagos de los colegiados')}    
#     )
#     def list(self, request, *args, **kwargs):
#         if request.query_params:
#             return Response({'detail': 'No se permiten los parámetros de la solicitud.'}, status=status.HTTP_400_BAD_REQUEST)
        
#         queryset = self.queryset
#         serializer = self.serializer_class(queryset, many=True)
        
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     @swagger_auto_schema(
#         operation_id='Obtener un Pago',
#         responses={200: openapi.Response(description='Detalle de un Pago')}    
#     )
#     def retrieve(self, request, pk=None):
#         try:
#             instance = self.get_queryset().get(pk=pk)
#         except Pago.DoesNotExist:
#             return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = self.get_serializer(instance)

#         return Response(serializer.data, status=status.HTTP_200_OK)

#     @swagger_auto_schema(
#         operation_id='Crear un Pago',
#         request_body=PagoSerializer,
#         responses={201: openapi.Response(description='Pago creado')}
#     )
#     def create(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @swagger_auto_schema(
#         operation_id='Actualizar un Pago',
#         responses={201: openapi.Response(description='Pago actualizado')}
#     )
#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()

#         data = request.data.copy()

#         # Manejar los IDs de las relaciones
#         if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
#             id_colegiado = data['id_colegiado'].get('id')
#             if Colegiado.objects.filter(id=id_colegiado).exists():
#                 data['id_colegiado_id'] = id_colegiado
#             del data['id_colegiado']
        
#         if 'id_metodo_pago' in data and isinstance(data['id_metodo_pago'], dict):
#             id_metodo_pago = data['id_metodo_pago'].get('id')
#             if MetodoPago.objects.filter(id=id_metodo_pago).exists():
#                 data['id_metodo_pago_id'] = id_metodo_pago
#             del data['id_metodo_pago']

#         if 'id_tipo_pago' in data and isinstance(data['id_tipo_pago'], dict):
#             id_tipo_pago = data['id_tipo_pago'].get('id')
#             if TipoPago.objects.filter(id=id_tipo_pago).exists():
#                 data['id_tipo_pago_id'] = id_tipo_pago
#             del data['id_tipo_pago']

#         # Asegurarse de que los campos write_only estén en los datos
#         missing_fields = []
#         if 'id_colegiado_id' not in data:
#             missing_fields.append('id_colegiado_id')
#         if 'id_metodo_pago_id' not in data:
#             missing_fields.append('id_metodo_pago_id')
#         if 'id_tipo_pago_id' not in data:
#             missing_fields.append('id_tipo_pago_id')
        
#         if missing_fields:
#             return Response({field: 'Este campo es requerido.' for field in missing_fields}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer = self.get_serializer(instance, data=data, partial=partial)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)

#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class PagoViewSet(viewsets.ViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

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

    # Metodo GET
    @swagger_auto_schema(
        operation_id='Listar los Pagos',
        responses={200: openapi.Response(description='Lista de Pagos de los colegiados')}    
    )
    def list(self, request, *args, **kwargs):
        if request.query_params:
            return Response({'detail': 'No se permiten los parametros de la solicitud.'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Metodo GET por ID
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

    # Metodo CREATE
    @swagger_auto_schema(
        operation_id='Crear un Pago',
        request_body=PagoSerializer,
        responses={201: openapi.Response(description='Pago creado')}
    )
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Metodo UPDATE
    @swagger_auto_schema(
    operation_id='Actualizar un Pago',
    responses={201: openapi.Response(description='Pago actualizado')}
    )
    def update(self, request, pk=None, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        data = request.data.copy()

        # Process nested objects
        for field in ['id_colegiado', 'id_metodo_pago', 'id_tipo_pago']:
            if field in data and isinstance(data[field], dict):
                data[f'{field}_id'] = data[field].get('id')
                del data[field]

        serializer = self.get_serializer(instance, data=data, partial=partial)
        
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationError as e:
            # Handle validation errors
            error_details = {}
            for field, errors in e.detail.items():
                error_details[field] = str(errors[0])
            return Response({'detail': error_details}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle other exceptions
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#TODO: Definir el metodo get por ID
# class EstadoCuentaViewSet(viewsets.ViewSet):
#     queryset = EstadoCuenta.objects.all()
#     serializer_class = EstadoCuentaSerializer

#     # Metodos
#     def filter_queryset(self, queryset):
#         filterset = self.filterset_class(self.request.query_params, queryset=queryset)
#         return filterset.qs

#     def get_object(self):
#         pk = self.kwargs.get('pk')
#         try:
#             return EstadoCuenta.objects.get(pk=pk)
#         except EstadoCuenta.DoesNotExist:
#             return Response({'detail': 'No se encontro el ID'}, status=status.HTTP_404_NOT_FOUND)

#     def get_serializer(self, *args, **kwargs):
#         return self.serializer_class(*args, **kwargs)
    
#     def get_queryset(self):
#         return EstadoCuenta.objects.all()

#     # Metodos GET, UPDATE, CREATE y DELETE

#     # Metodo GET
#     @swagger_auto_schema(
#         operation_id='Listar Estado de Cuentas',
#         responses={200: openapi.Response(description='Lista de Estados de Cuentas')}
#     )
#     def list(self, request, *args, **kwargs):
#         # Validar los parametros permitidos
#         if request.query_params:
#             return Response({'detail': 'No se permiten los parametros de la solicitud'}, status=status.HTTP_400_BAD_REQUEST)
        
#         queryset = self.get_queryset()
#         serializer =  self.serializer_class(queryset, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     # Metodo GET por ID
#     @swagger_auto_schema(
#         operation_id='Obtener un Estado de Cuenta',
#         responses={200: openapi.Response(description='Detalle de un Estado de Cuenta')}
#     )
#     def retrieve(self, request, pk=None):
#         try:
#             instance = self.get_queryset().get(pk=pk)
#         except EstadoCuenta.DoesNotExist:
#             return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = self.get_serializer(instance)
        
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     # Metodo CREATE
#     @swagger_auto_schema(
#         operation_id='Crear un Estado de Cuenta',
#         request_body=EstadoCuentaSerializer,
#         responses={201: openapi.Response(description='Estado de Cuenta creado')}
#     )
#     def create(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Metodo UPDATE
#     @swagger_auto_schema(
#         operation_id='Actualizar un Estado de Cuenta',
#         request_body=EstadoCuentaSerializer,
#         responses={200: openapi.Response(description='Estado de Cuenta actualizado')}
#     )
#     def update(self, request, pk=None):
#         try:
#             instance = self.get_queryset().get(pk=pk)
#         except EstadoCuenta.DoesNotExist:
#             return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
#         serializer = self.get_serializer(instance, data=request.data, partial=False)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     # Metodo DELETE
#     @swagger_auto_schema(
#         operation_id='Eliminar un Estado de Cuenta',
#         responses={204: openapi.Response(description='Estado de Cuenta eliminado')}
#     )
#     def destroy(self, request, pk=None):
#         try:
#             instance = self.get_queryset().get(pk=pk)
#             instance.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except EstadoCuenta.DoesNotExist:
#             return Response({'detail': 'ID no encontrado'}, status=status.HTTP_404_NOT_FOUND)
