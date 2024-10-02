from django_filters import rest_framework as filters
from .models import Especialidad


class EspecialidadFilter(filters.FilterSet):
    nombre_escuela = filters.CharFilter(field_name='id_escuela__nombre_escuela', lookup_expr='iexact')
    nombre_especialidad = filters.CharFilter(field_name='nombre_especialidad', lookup_expr='iexact')

    class Meta:
        model = Especialidad
        fields = ['nombre_escuela', 'nombre_especialidad']
