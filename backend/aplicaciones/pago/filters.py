from django_filters import rest_framework as filters
from .models import EstadoCuenta, MetodoPago, Pago, TipoPago

# Filtro para el modelo TipoPago
class TipoPagoFilter(filters.FilterSet):
    nombre_tipo_pago = filters.CharFilter(field_name='nombre_tipo_pago', lookup_expr='istartswith')

    class Meta:
        model = TipoPago
        fields = ['nombre_tipo_pago']


# Filtro para el modelo MetodoPago
class MetodoPagoFilter(filters.FilterSet):
    nombre_metodo_pago = filters.CharFilter(field_name='nombre_metodo_pago', lookup_expr='istartswith')

    class Meta:
        model = MetodoPago
        fields = ['nombre_metodo_pago']


# Filtro para el modelo EstadoCuenta
class EstadoCuentaFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')

    class Meta:
        model = EstadoCuenta
        fields = ['apellido_paterno', 'dni_colegiado', 'numero_colegiatura']


# Filtro para el modelo Pago
class PagoFilter(filters.FilterSet):
    apellido_paterno = filters.CharFilter(field_name='id_colegiado__apellido_paterno', lookup_expr='istartswith')
    dni_colegiado = filters.CharFilter(field_name='id_colegiado__dni_colegiado', lookup_expr='iexact')
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado__numero_colegiatura', lookup_expr='iexact')
    metodo_pago = filters.CharFilter(field_name='id_metodo_pago__nombre_metodo_pago')
    tipo_pago = filters.CharFilter(field_name='id_tipo_pago__nombre_tipo_pago')
    fecha_pago = filters.CharFilter(field_name='fecha_pago', lookup_expr='iexact')

    class Meta:
        model = Pago
        fields = ['apellido_paterno', 'dni_colegiado', 'numero_colegiatura', 'metodo_pago', 'tipo_pago', 'fecha_pago']
