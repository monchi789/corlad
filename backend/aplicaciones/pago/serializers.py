from rest_framework import serializers
from .models import EstadoCuenta, Pago, MetodoPago, TipoPago
from ..colegiado.models import Colegiado
from aplicaciones.colegiado.serializers import ColegiadoSerializer
from django.db import transaction, IntegrityError
from django.db.models import Q 


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
    class Meta:
        model = EstadoCuenta
        fields = '__all__'


class PagoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    id_metodo_pago = MetodoPagoSerializer(read_only=True)
    id_tipo_pago = TipoPagoSerializer(read_only=True)

    id_colegiado_id = serializers.PrimaryKeyRelatedField(
        queryset=Colegiado.objects.all(),
        source='id_colegiado', 
        write_only=True
    )
    id_metodo_pago_id = serializers.PrimaryKeyRelatedField(
        queryset=MetodoPago.objects.all(),
        source='id_metodo_pago',
        write_only=True
    )
    id_tipo_pago_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoPago.objects.all(),
        source='id_tipo_pago',
        write_only=True
    )

    class Meta:
        model = Pago
        fields = [
            'id', 'id_colegiado', 'id_metodo_pago', 'id_tipo_pago',
            'id_colegiado_id', 'id_metodo_pago_id', 'id_tipo_pago_id',
            'monto_pago', 'fecha_pago'
        ]
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
