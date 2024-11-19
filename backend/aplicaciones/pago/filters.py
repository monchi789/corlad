from django_filters import rest_framework as filters
from .models import Pago


# Filtro para el modelo Pago
class PagoFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    metodo_pago = filters.CharFilter(field_name='id_metodo_pago__nombre_metodo_pago')
    tipo_pago = filters.CharFilter(field_name='id_tipo_pago__nombre_tipo_pago')
    fecha_pago = filters.CharFilter(field_name='fecha_pago', lookup_expr='iexact')
    apellido_materno = filters.CharFilter(field_name='id_colegiado__apellido_materno', lookup_expr='istartswith')
    nombres = filters.CharFilter(field_name='id_colegiado__nombre', lookup_expr='istartswith')

    class Meta:
        model = Pago
        fields = ['apellido_paterno', 'dni_colegiado', 'numero_colegiatura', 'metodo_pago', 'tipo_pago', 'fecha_pago', 'apellido_materno', 'nombres']
