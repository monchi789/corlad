from rest_framework import serializers
from .models import EstadoCuenta, Pago, MetodoPago, TipoPago
from ..colegiado.models import Colegiado  # Importamos el modelo Colegiado
from aplicaciones.colegiado.serializers import ColegiadoSerializer  # Importamos el serializer de Colegiado
from django.db import transaction, IntegrityError
from django.db.models import Q 

class MetodoPagoSerializer(serializers.ModelSerializer):
    """ Serializer para el modelo MetodoPago """
    class Meta:
        model = MetodoPago
        fields = '__all__'  # Incluye todos los campos del modelo

class TipoPagoSerializer(serializers.ModelSerializer):
    """ Serializer para el modelo TipoPago """
    class Meta:
        model = TipoPago
        fields = '__all__'  # Incluye todos los campos del modelo

class EstadoCuentaSerializer(serializers.ModelSerializer):
    """ Serializer para el modelo EstadoCuenta """
    id_colegiado = ColegiadoSerializer()  # Serializer anidado para el modelo Colegiado
    
    class Meta:
        model = EstadoCuenta
        fields = '__all__'  # Incluye todos los campos del modelo

class PagoSerializer(serializers.ModelSerializer):
    """ Serializer para el modelo Pago """
    # Serializer anidado para los modelos relacionados
    id_colegiado = ColegiadoSerializer(read_only=True)  # Solo lectura para id_colegiado
    id_metodo_pago = MetodoPagoSerializer(read_only=True)  # Solo lectura para id_metodo_pago
    id_tipo_pago = TipoPagoSerializer(read_only=True)  # Solo lectura para id_tipo_pago

    # Campos adicionales para identificar las claves foráneas durante la creación o actualización
    id_colegiado_id = serializers.PrimaryKeyRelatedField(
        queryset=Colegiado.objects.all(),
        source='id_colegiado',  # Campo fuente en el modelo Pago
        write_only=True  # Solo para escritura, no se incluirá en la respuesta JSON
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
        # Campos a incluir en la serialización
        fields = [
            'id', 'id_colegiado', 'id_metodo_pago', 'id_tipo_pago',  # Campos de objetos relacionados
            'id_colegiado_id', 'id_metodo_pago_id', 'id_tipo_pago_id',  # Campos de claves foráneas
            'monto_pago', 'fecha_pago'  # Otros campos del modelo Pago
        ]
    
    def update(self, instance, validated_data):
        """ Método para actualizar una instancia de Pago """
        # Itera sobre los datos validados y actualiza los atributos correspondientes en la instancia
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()  # Guarda la instancia actualizada en la base de datos

        return instance
