from rest_framework import serializers
from .models import EstadoColegiatura


# Serializer para EstadoColegiatura
class EstadoColegiaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoColegiatura
        fields = '__all__'


class EstadoColegiaturaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoColegiatura
        fields = ['fecha_final', 'estado_colegiatura']
