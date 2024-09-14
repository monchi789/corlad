from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from ..metodo_pago.serializers import MetodoPagoSerializer
from ..metodo_pago.models import MetodoPago
from ..colegiado.models import Colegiado
from ..colegiado.serializers import ColegiadoSerializer
from .models import Pago


class PagoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    id_metodo_pago = MetodoPagoSerializer(read_only=True)
   

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

    class Meta:
        model = Pago
        fields = [
            'id', 'id_colegiado', 'id_metodo_pago',
            'id_colegiado_id', 'id_metodo_pago_id',
            'monto_pago', 'fecha_pago', 'numero_operacion', 'meses', 'observacion'
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
