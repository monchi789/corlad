from django_filters import rest_framework as filters
from .models import Escuela, Especialidad, Colegiado, HistorialEducativo


# Filtros para la entidad Escuela
class EscuelaFilter(filters.FilterSet):
    nombre_escuela = filters.CharFilter(field_name='nombre_escuela', lookup_expr='iexact')

    class Meta:
        model = Escuela
        fields = ['nombre_escuela']


# Filtros para la entidad Especialidad
class EspecialidadFilter(filters.FilterSet):
    nombre_escuela = filters.CharFilter(field_name='id_escuela__nombre_escuela', lookup_expr='iexact')
    nombre_especialidad = filters.CharFilter(field_name='nombre_especialidad', lookup_expr='iexact')

    class Meta:
        model = Especialidad
        fields = ['nombre_escuela', 'nombre_especialidad']


# Filtros para la entidad Colegiado
class ColegiadoFilter(filters.FilterSet):
    numero_colegiatura = filters.CharFilter(field_name='numero_colegiatura', lookup_expr='iexact')
    dni_colegiado = filters.CharFilter(field_name='dni_colegiado', lookup_expr='iexact')
    apellido_paterno = filters.CharFilter(field_name='apellido_paterno', lookup_expr='istartswith')

    class Meta:
        model = Colegiado
        fields = ['numero_colegiatura', 'dni_colegiado', 'apellido_paterno']


# Filtros para la entidad HistorialEducativo
class HistorialEducativoFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    nombre_escuela = filters.CharFilter(field_name='id_especialidad__id_escuela__nombre_escuela', lookup_expr='icontains')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    universidad = filters.BooleanFilter(field_name='universidad', lookup_expr='istartswith')
    estado_colegiado = filters.CharFilter(field_name='id_estado_colegiatura__estado_colegiatura', lookup_expr='iexact')

    class Meta:
        model = HistorialEducativo
        fields = ['apellido_paterno', 'nombre_escuela', 'dni_colegiado', 'numero_colegiatura', 'universidad', 'estado_colegiado']


# Filtros para consultar habilidad de un colegiado
class ConsultarHabilidadFilter(filters.FilterSet):
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    apellido_materno = filters.CharFilter(field_name='id_colegiado__apellido_materno', lookup_expr='istartswith')
    estado_colegiado = filters.CharFilter(field_name='id_estado_colegiatura__estado_colegiatura', lookup_expr='iexact')

    class Meta:
        model = HistorialEducativo
        fields = ['dni_colegiado', 'numero_colegiatura', 'apellido_paterno', 'apellido_materno', 'estado_colegiado']
