from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from django.utils import timezone
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models.functions import Coalesce
from django.db.models import Sum, Count, Max, DecimalField
from rest_framework import viewsets, status
from functions.paginations import CustomPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import PagoSerializer, EstadoCuentaSerializer
from .permissions import PagoPermissions
from .models import Pago
from .filters import PagoFilter
from ..colegiado.models import Colegiado


# Pago
class PagoViewSet(viewsets.ViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    pagination_class = CustomPagination

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, PagoPermissions]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filter_backends = [DjangoFilterBackend]
    filterset_class = PagoFilter

    allow_query_params = {
        'apellido_paterno', 'dni_colegiado',
        'numero_colegiatura', 'metodo_pago',
        'fecha_pago', 'page', 'page_size'
    }

    # Métodos
    def filter_queryset(self, queryset):
        filterset = self.filterset_class(self.request.query_params, queryset=queryset)
        return filterset.qs

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Pago.objects.get(pk=pk)
        except Pago.DoesNotExist:
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
        queryset = Pago.objects.all()
        fecha_pago = self.request.query_params.get('fecha_pago', None)
        if fecha_pago:
            date = timezone.datetime.strptime(fecha_pago, "%Y-%m-%d").date()
            queryset = queryset.filter(fecha_pago__date=date)
        return queryset
    
    def paginate_queryset(self, queryset):
        paginator = self.pagination_class()
        return paginator.paginate_queryset(queryset, self.request, view=self)
    
    def get_paginated_response(self, data):
        paginator = self.pagination_class()
        return paginator.get_paginated_response(data)

    @swagger_auto_schema(
        operation_id='Listar los Pagos',
        responses={200: openapi.Response(description='Lista de Pagos de los colegiados')}    
    )
    def list(self, request, *args, **kwargs):
        # Validar los parámetros permitidos
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
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id='Obtener un Pago',
        responses={200: openapi.Response(description='Detalle de un Pago')}    
    )
    def retrieve(self, request, pk=None):
        instance = self.get_object()
        if isinstance(instance, Response):
            return instance
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_id='Crear un Pago',
        request_body=PagoSerializer,
        responses={201: openapi.Response(description='Pago creado')}
    )
    def create(self, request):
        data = request.data.copy()

        # Manejar los IDs de las relaciones
        if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
            data['id_colegiado_id'] = data['id_colegiado'].get('id')
        if 'id_metodo_pago' in data and isinstance(data['id_metodo_pago'], dict):
            data['id_metodo_pago_id'] = data['id_metodo_pago'].get('id')

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_id='Actualizar un Pago',
        request_body=PagoSerializer,
        responses={200: openapi.Response(description='Pago actualizado')}
    )
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if isinstance(instance, Response):
            return instance

        data = request.data.copy()

        # Manejar los IDs de las relaciones
        if 'id_colegiado' in data and isinstance(data['id_colegiado'], dict):
            data['id_colegiado_id'] = data['id_colegiado'].get('id')
        if 'id_metodo_pago' in data and isinstance(data['id_metodo_pago'], dict):
            data['id_metodo_pago_id'] = data['id_metodo_pago'].get('id')
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_id='Eliminar un Pago',
        responses={204: openapi.Response(description='Pago eliminado')}
    )
    def destroy(self, request, pk=None):
        instance = self.get_object()
        if isinstance(instance, Response):
            return instance
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EstadoCuentaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Colegiado.objects.annotate(
        monto_acumulado=Sum('pago__monto_total')
    ).order_by('apellido_paterno', 'apellido_materno')
    serializer_class = EstadoCuentaSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(monto_acumulado__isnull=False)

