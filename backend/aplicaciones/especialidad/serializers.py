from rest_framework import serializers
from .models import Especialidad
from ..escuela.models import Escuela
from ..escuela.serializers import EscuelaSerializer

class EspecialidadSerializer(serializers.ModelSerializer):
    id_escuela = EscuelaSerializer(read_only=True)

    id_escuela_id = serializers.PrimaryKeyRelatedField(
        queryset=Escuela.objects.all(),
        source='id_escuela',
        write_only=True
    )
    
    class Meta:
        model = Especialidad
        fields = ['id', 'id_escuela', 'nombre_especialidad', 'id_escuela_id']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
