from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from aplicaciones.colegiado.serializers import ColegiadoSerializer
from .models import Pago, Colegiado, MetodoPago, TipoPago, EstadoCuenta


class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = '__all__'

class TipoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoPago
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

    def validate(self, data):
        # Aquí puedes implementar tu lógica de validación personalizada
        if not data.get('monto_pago'):
            raise ValidationError("El monto del pago es requerido.")
        return data

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

class EstadoCuentaSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    
    id_colegiado_id = serializers.PrimaryKeyRelatedField(
        queryset=Colegiado.objects.all(),
        source='id_colegiado',
        write_only=True
    )

    class Meta:
        model = EstadoCuenta
        fields = [
            'id', 'saldo', 'fecha_actualizacion', 
            'id_colegiado', 'id_colegiado_id'
        ]

    def update(self, instance, validated_data):
        instance.saldo = validated_data.get('saldo', instance.saldo)
        instance.fecha_actualizacion = validated_data.get('fecha_actualizacion', instance.fecha_actualizacion)
        instance.id_colegiado = validated_data.get('id_colegiado', instance.id_colegiado)
        instance.save()
        return instance

    def validate(self, data):
        # Aquí puedes implementar tu lógica de validación personalizada
        if data.get('saldo') is not None and data['saldo'] < 0:
            raise serializers.ValidationError("El saldo no puede ser negativo.")
        return data
