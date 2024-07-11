from django_filters import rest_framework as filters
from .models import EstadoCuenta, MetodoPago, Pago, TipoPago

# Filtro para el modelo TipoPago
class TipoPagoFilter(filters.FilterSet):
    # Filtrar por nombre_tipo_pago, comenzando con un valor específico (no sensible a mayúsculas/minúsculas)
    nombre_tipo_pago = filters.CharFilter(field_name='nombre_tipo_pago', lookup_expr='istartswith')

    class Meta:
        model = TipoPago
        fields = ['nombre_tipo_pago']

# Filtro para el modelo MetodoPago
class MetodoPagoFilter(filters.FilterSet):
    # Filtrar por nombre_metodo_pago, comenzando con un valor específico (no sensible a mayúsculas/minúsculas)
    nombre_metodo_pago = filters.CharFilter(field_name='nombre_metodo_pago', lookup_expr='istartswith')

    class Meta:
        model = MetodoPago
        fields = ['nombre_metodo_pago']

# Filtro para el modelo EstadoCuenta
class EstadoCuentaFilter(filters.FilterSet):
    # Filtrar por apellido_paterno del colegiado, comenzando con un valor específico (no sensible a mayúsculas/minúsculas)
    apellido_paterno = filters.CharFilter(field_name='id_colegiado_apellido_paterno', lookup_expr='istartswith')
    # Filtrar por dni_colegiado, coincidiendo exactamente (no sensible a mayúsculas/minúsculas)
    dni_colegiado = filters.CharFilter(field_name='id_colegiado_dni_colegiado', lookup_expr='iexact')
    # Filtrar por numero_colegiatura, coincidiendo exactamente (no sensible a mayúsculas/minúsculas)
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado_numero_colegiatura', lookup_expr='iexact')

    class Meta:
        model = EstadoCuenta
        fields = ['apellido_paterno', 'dni_colegiado', 'numero_colegiatura']

# Filtro para el modelo Pago
class PagoFilter(filters.FilterSet):
    # Filtrar por apellido_paterno del colegiado, comenzando con un valor específico (no sensible a mayúsculas/minúsculas)
    apellido_paterno = filters.CharFilter(field_name='id_colegiado_apellido_paterno', lookup_expr='istartswith')
    # Filtrar por dni_colegiado, coincidiendo exactamente (no sensible a mayúsculas/minúsculas)
    dni_colegiado = filters.CharFilter(field_name='id_colegiado_dni_colegiado', lookup_expr='iexact')
    # Filtrar por numero_colegiatura, coincidiendo exactamente (no sensible a mayúsculas/minúsculas)
    numero_colegiatura = filters.CharFilter(field_name='id_colegiado_numero_colegiatura', lookup_expr='iexact')
    # Filtrar por nombre_metodo_pago del método de pago
    metodo_pago = filters.CharFilter(field_name='id_metodo_pago_nombre_metodo_pago')
    # Filtrar por nombre_tipo_pago del tipo de pago
    tipo_pago = filters.CharFilter(field_name='id_tipo_pago_nombre_tipo_pago')
    # Filtrar por fecha de pago, coincidiendo exactamente
    fecha_pago = filters.CharFilter(field_name='fecha_pago', lookup_expr='iexact')

    class Meta:
        model = Pago
        fields = ['apellido_paterno', 'dni_colegiado', 'numero_colegiatura', 'metodo_pago', 'tipo_pago', 'fecha_pago']
