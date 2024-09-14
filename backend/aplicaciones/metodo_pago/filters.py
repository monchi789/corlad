from django_filters import rest_framework as filters
from .models import MetodoPago

# Filtro para el modelo MetodoPago
class MetodoPagoFilter(filters.FilterSet):
    nombre_metodo_pago = filters.CharFilter(field_name='nombre_metodo_pago', lookup_expr='istartswith')

    class Meta:
        model = MetodoPago
        fields = ['nombre_metodo_pago']

