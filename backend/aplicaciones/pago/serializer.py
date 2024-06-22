from rest_framework import serializers
from .models import EstadoCuenta, Pago, Colegiado
from aplicaciones.colegiado.serializer import ColegiadoSerializer

# Serializer
class ColegiadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'numero_colegiatura']


class PagoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer()
    class Meta:
        model = Pago
        fields = ['id', 'monto_pago', 'fecha_pago', 'id_colegiado']


class EstadoCuentaSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer()

    class Meta:
        model = EstadoCuenta
        fields = ['id', 'saldo', 'fecha_actualizacion', 'id_colegiado']
