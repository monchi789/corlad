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
    fecha_pago = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    
    # Campos relacionados para crear o actualizar (Primary Key Related)
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
            'meses_pagados', 'foto_baucher'
        ]
        read_only_fields = ['monto_total', 'fecha_pago']

    def validate(self, data):
        # Validación personalizada si es necesario
        if 'meses_pagados' in data and not data['meses_pagados']:
            raise ValidationError("Debes especificar al menos un mes pagado.")
        
        # Agrega validaciones adicionales si es necesario
        return data

    def create(self, validated_data):
        tarifas = validated_data.pop('tarifas', [])
        pago = Pago.objects.create(**validated_data)
        
        # Asignar tarifas después de crear el pago (ya que es un ManyToMany)
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
