from rest_framework import serializers
from .models import Colegiado


# Serializer para Colegiado
class ColegiadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = '__all__'


# Serializer detallado para Colegiado
class ColegiadoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'correo', 'numero_colegiatura', 'foto_colegiado', 'estado_activo']



