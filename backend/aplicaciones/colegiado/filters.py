from django_filters import rest_framework as filters
from .models import Escuela, Especialidad, Colegiado, HistorialEducativo

class HistorialEducativoFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado_apellido_paterno', lookup_expr='istartswith')
    apellido_materno = filters.CharFilter(field_name='id_colegiado_apellido_materno', lookup_expr='istartswith')
    nombre_especialidad = filters.CharFilter(field_name='id_especialidad_nombre_especialidad', lookup_expr='icontains')
    nombre_escuela = filters.CharFilter(field_name='id_especialidad_id_escuela_nombre_escuela', lookup_expr='icontains')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado_dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado_numero_colegiatura', lookup_expr='iexact')
    estado = filters.CharFilter(field_name='id_colegiado_estado', lookup_expr='iexact')

    class Meta:
        model = HistorialEducativo
        fields = ['estado', 'apellido_paterno', 'apellido_materno', 'nombre_escuela', 'nombre_especialidad', 'dni_colegiado', 'numero_colegiatura']
