from django_filters import rest_framework as filters
from .models import Deudas


class DeudasFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    
    class Meta:
        model = Deudas
        fields = ['apellido_paterno', 'dni_colegiado', 'numero_colegiatura']
