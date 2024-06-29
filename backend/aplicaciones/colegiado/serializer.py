from rest_framework import serializers
from .models import Colegiado, Escuela, Especialidad, HistorialEducativo

# Serializer Escuela
class EscuelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escuela
        fields = '__all__'


# Serializer Especialidad
class EspecialidadSerializer(serializers.ModelSerializer):
    id_escuela = EscuelaSerializer()
    
    class Meta:
        model = Especialidad
        fields = '__all__'


# Serializer Colegiado
class ColegiadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = '__all__'


# Serializer HistorialEducativo
class HistorialEducativoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer()
    id_especialidad = EspecialidadSerializer()

    class Meta:
        model = HistorialEducativo
        fields = '__all__'
