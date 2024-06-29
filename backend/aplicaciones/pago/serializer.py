from rest_framework import serializers
from .models import EstadoCuenta, Pago, MetodoPago, TipoPago
from aplicaciones.colegiado.serializer import ColegiadoSerializer


class PagoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer()
    class Meta:
        model = Pago
        fields = '__all__'

class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = '__all__'


class TipoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPago
        fields = '__all__'


class EstadoCuentaSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer()
    id_tipo_pago = TipoPagoSerializer()
    id_metodo_pago = MetodoPagoSerializer()

    class Meta:
        model = EstadoCuenta
        fields = '__all__'
