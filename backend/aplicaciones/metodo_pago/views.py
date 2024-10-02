from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import MetodoPagoPermissions
from .filters import MetodoPagoFilter
from .models import MetodoPago
from .serializers import MetodoPagoSerializer
from functions.paginations import CustomPagination


# Create your views here.
class MetodoPagoViewSet(viewsets.ViewSet):
    queryset = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer

    # JWT
    permission_classes = [IsAuthenticated, DjangoModelPermissions, MetodoPagoPermissions]
    authentication_classes = [JWTAuthentication]

    # Aplicamos los filtros
    filterset_class = MetodoPagoFilter
    filter_backends = [DjangoFilterBackend]

    allow_query_params = {
        'nombre_metodo_pago'
    }

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

    @swagger_auto_schema(
        operation_id='Listar metodos de pago',
        responses={200: openapi.Response(description='Lista de metodos de pago')}
    )
    def list(self, request, *args, **kwargs):
        for param in request.query_params:
            if param not in self.allow_query_params:
                return Response({'detail': 'Parametro no permitido'}, status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer =  self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_id='Obtener un Metodo de Pago',
        responses={200: openapi.Response(description='Detalle de un Metodo de Pago')}
    )
    def retrieve(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
