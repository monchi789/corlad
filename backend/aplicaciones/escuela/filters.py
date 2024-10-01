from django_filters import rest_framework as filters
from .models import Escuela

class EscuelaFilter(filters.FilterSet):
    nombre_escuela = filters.CharFilter(field_name='nombre_escuela', lookup_expr='iexact')

    class Meta:
        model = Escuela
        fields = ['nombre_escuela']
