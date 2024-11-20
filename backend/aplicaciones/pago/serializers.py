from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from ..metodo_pago.serializers import MetodoPagoSerializer
from ..metodo_pago.models import MetodoPago
from ..colegiado.models import Colegiado
from ..colegiado.serializers import ColegiadoSerializer
from ..tarifa.models import Tarifa
from .models import Pago


class PagoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    id_metodo_pago = MetodoPagoSerializer(read_only=True)

    fecha_pago = serializers.DateField(format="%Y-%m-%d")  
    
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
    
    tarifas = serializers.PrimaryKeyRelatedField(
        queryset=Tarifa.objects.all(),
        many=True
    )

    class Meta:
        model = Pago
        fields = [
            'id', 'id_colegiado', 'id_metodo_pago',
            'id_colegiado_id', 'id_metodo_pago_id',
            'tarifas', 'monto_total', 'fecha_pago',
            'numero_operacion', 'observacion',
            'meses_pagados', 'foto_baucher', 'numero_recibo'
        ]
        read_only_fields = ['monto_total']

    def validate(self, data):
        if self.instance is None and 'fecha_pago' not in data:
            raise ValidationError({"fecha_pago": "Este campo es requerido."})

        if 'meses_pagados' in data and not data['meses_pagados']:
            raise ValidationError({"meses_pagados": "Debes especificar al menos un mes pagado."})
        
        return data

    def create(self, validated_data):
        tarifas = validated_data.pop('tarifas', [])
        if 'fecha_pago' not in validated_data:
            raise ValidationError({"fecha_pago": "Este campo es requerido."})
            
        pago = Pago.objects.create(**validated_data)
        
        pago.tarifas.set(tarifas)
        pago.save()
        return pago

    def update(self, instance, validated_data):
        tarifas = validated_data.pop('tarifas', [])
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Actualizar las tarifas
        instance.tarifas.set(tarifas)
        instance.save()
        return instance


class EstadoCuentaSerializer(serializers.ModelSerializer):
    monto_acumulado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Colegiado
        fields = ['nombre', 'apellido_paterno', 'apellido_materno', 'numero_colegiatura', 'monto_acumulado']
