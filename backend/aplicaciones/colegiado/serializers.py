from rest_framework import serializers
from .models import Colegiado, Escuela, Especialidad, HistorialEducativo

# Serializer para Escuela
class EscuelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escuela
        fields = '__all__'


# Serializer para Especialidad
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
        '''Actualiza y devuelve una instancia de Especialidad.'''
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

# Serializer para Colegiado
class ColegiadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = '__all__'


# Serializer para HistorialEducativo
class HistorialEducativoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    id_especialidad = EspecialidadSerializer(read_only=True)

    id_colegiado_id = serializers.PrimaryKeyRelatedField(
        queryset=Colegiado.objects.all(),
        source='id_colegiado', 
        write_only=True
    )
    id_especialidad_id = serializers.PrimaryKeyRelatedField(
        queryset=Especialidad.objects.all(),
        source='id_especialidad',
        write_only=True
    )

    class Meta:
        model = HistorialEducativo
        fields = [
            'id', 'id_colegiado',
            'id_especialidad', 'id_colegiado_id', 'id_especialidad_id', 'universidad', 'denominacion_bachiller', 
            'denominacion_titulo', 'titulo_fecha', 
        ]

    def update(self, instance, validated_data):
        '''Actualiza y devuelve una instancia de HistorialEducativo.'''
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

# Serializer personalizado para la vista

# Serializer detallado para Colegiado
class ColegiadoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'correo', 'numero_colegiatura', 'estado', 'foto_colegiado']


# Serializer para consulta de habilidades
class ConsultarHabilidadSerializer(serializers.ModelSerializer):
    id_especialidad = EspecialidadSerializer()
    id_colegiado = ColegiadoDetailSerializer()

    class Meta:
        model = HistorialEducativo
        fields = ['id_colegiado', 'id_especialidad']
