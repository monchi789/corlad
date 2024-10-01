from django_filters import rest_framework as filters
from .models import Tarifa


# Filtro para el modelo Pago
class TarifaFilter(filters.FilterSet):
    nombre_tarifa = filters.CharFilter(field_name='nombre_tarifa', lookup_expr='istartswith')
    class Meta:
        model = Tarifa
        fields = ['nombre_tarifa']
