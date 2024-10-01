from django_filters import rest_framework as filters
from .models import Colegiado


# Filtros para la entidad Colegiado
class ColegiadoFilter(filters.FilterSet):
    numero_colegiatura = filters.CharFilter(field_name='numero_colegiatura', lookup_expr='iexact')
    dni_colegiado = filters.CharFilter(field_name='dni_colegiado', lookup_expr='iexact')
    apellido_paterno = filters.CharFilter(field_name='apellido_paterno', lookup_expr='istartswith')

    class Meta:
        model = Colegiado
        fields = ['numero_colegiatura', 'dni_colegiado', 'apellido_paterno']





# Filtros para consultar habilidad de un colegiado

