from django_filters import rest_framework as filters
from .models import Escuela, Especialidad, Colegiado, HistorialEducativo


class EscuelaFilter(filters.FilterSet):
    nombre_escuela = filters.CharFilter(field_name='nombre_escuela', lookup_expr='iexact')

    class Meta:
        model = Escuela
        fields = ['nombre_escuela']


class EspecialidadFilter(filters.FilterSet):
    nombre_escuela = filters.CharFilter(field_name='nombre_escuela', lookup_expr='iexact')
    nombre_especialidad = filters.CharFilter(field_name='nombre_especialidad', lookup_expr='iexact')

    class Meta:
        model = Especialidad
        fields = ['nombre_escuela', 'nombre_especialidad']


class ColegiadoFilter(filters.FilterSet):
    numero_colegiatura = filters.CharFilter(field_name='numero_colegiatura', lookup_expr='iexact')
    dni_colegiado = filters.CharFilter(field_name='dni_colegiado', lookup_expr='iexact')
    apellido_paterno = filters.CharFilter(field_name='apellido_paterno', lookup_expr='istartswith')
    estado = filters.CharFilter(field_name='estado', lookup_expr='iexact')

    class Meta:
        model = Colegiado
        fields = ['numero_colegiatura', 'dni_colegiado', 'apellido_paterno', 'estado']


class HistorialEducativoFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado_apellido_paterno', lookup_expr='istartswith')
    nombre_escuela = filters.CharFilter(field_name='id_especialidad_id_escuela_nombre_escuela', lookup_expr='icontains')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado_dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado_numero_colegiatura', lookup_expr='iexact')
    universidad = filters.CharFilter(field_name='universidad', lookup_expr='istartswith')

    class Meta:
        model = HistorialEducativo
        fields = ['apellido_paterno', 'nombre_escuela', 'dni_colegiado', 'numero_colegiatura', 'universidad']


class ConsultarHabilidadFilter(filters.FilterSet):
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    apellido_materno = filters.CharFilter(field_name='id_colegiado__apellido_materno', lookup_expr='istartswith')

    class Meta:
        model = HistorialEducativo
        fields = ['dni_colegiado', 'numero_colegiatura', 'apellido_paterno', 'apellido_materno']

