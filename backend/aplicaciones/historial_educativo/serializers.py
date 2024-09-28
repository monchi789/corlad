from rest_framework import serializers
from ..colegiado.serializers import ColegiadoSerializer, ColegiadoDetailSerializer
from ..especialidad.serializers import EspecialidadSerializer
from .models import HistorialEducativo
from ..colegiado.models import Colegiado
from ..especialidad.models import Especialidad


# Serializer para HistorialEducativo
class HistorialEducativoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    id_especialidad = EspecialidadSerializer(read_only=True)

    id_colegiado_id = serializers.PrimaryKeyRelatedField(
        queryset=Colegiado.objects.all(),
        source='id_colegiado', 
        write_only=True,
        required=False
    )
    id_especialidad_id = serializers.PrimaryKeyRelatedField(
        queryset=Especialidad.objects.all(),
        source='id_especialidad',
        write_only=True,
        required=False
    )

    class Meta:
        model = HistorialEducativo
        fields = [
            'id', 'id_colegiado', 'id_especialidad', 
            'id_colegiado_id', 'id_especialidad_id',  # Aquí estaba el problema
            'universidad', 'denominacion_bachiller', 'denominacion_titulo', 'titulo_fecha', 'fecha_bachiller'
        ]

    def update(self, instance, validated_data):
        id_colegiado = validated_data.pop('id_colegiado', None)
        id_especialidad = validated_data.pop('id_especialidad', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if id_colegiado is not None:
            instance.id_colegiado = id_colegiado
        if id_especialidad is not None:
            instance.id_especialidad = id_especialidad
        
        instance.save()
        return instance


# Serializer para consulta de habilidades
class ConsultarHabilidadSerializer(serializers.ModelSerializer):
    id_especialidad = EspecialidadSerializer()
    id_colegiado = ColegiadoDetailSerializer()

    class Meta:
        model = HistorialEducativo
        fields = ['id_colegiado', 'id_especialidad']
