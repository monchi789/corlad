from django_filters import rest_framework as filters
from .models import HistorialEducativo


class HistorialEducativoFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    nombre_escuela = filters.CharFilter(field_name='id_especialidad__id_escuela__nombre_escuela', lookup_expr='icontains')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    universidad = filters.BooleanFilter(field_name='universidad', lookup_expr='istartswith')
    estado_activo = filters.CharFilter(field_name='id_colegiado__estado_activo', lookup_expr='iexact')

    class Meta:
        model = HistorialEducativo
        fields = ['apellido_paterno', 'nombre_escuela', 'dni_colegiado', 'numero_colegiatura', 'universidad', 'estado_activo']


class ConsultarHabilidadFilter(filters.FilterSet):
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    apellido_materno = filters.CharFilter(field_name='id_colegiado__apellido_materno', lookup_expr='istartswith')
    estado_activo = filters.CharFilter(field_name='id_colegiado__estado_activo', lookup_expr='iexact')

    class Meta:
        model = HistorialEducativo
        fields = ['dni_colegiado', 'numero_colegiatura', 'apellido_paterno', 'apellido_materno', 'estado_activo']
