from rest_framework import serializers
from .models import Colegiado, Escuela, Especialidad, HistorialEducativo, EstadoColegiatura

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
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

# Serializer para Colegiado
class ColegiadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = '__all__'


# Serializer para EstadoColegiatura
class EstadoColegiaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoColegiatura
        fields = '__all__'


# Serializer para HistorialEducativo
class HistorialEducativoSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    id_especialidad = EspecialidadSerializer(read_only=True)
    id_estado_colegiatura = EstadoColegiaturaSerializer(read_only=True)

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
    id_estado_colegiatura_id = serializers.PrimaryKeyRelatedField(
        queryset=EstadoColegiatura.objects.all(),
        source='id_estado_colegiatura',
        write_only=True,
        required=False
    )

    class Meta:
        model = HistorialEducativo
        fields = [
            'id', 'id_colegiado', 'id_especialidad', 'id_estado_colegiatura', 
            'id_colegiado_id', 'id_especialidad_id', 'id_estado_colegiatura_id',
            'universidad', 'denominacion_bachiller', 'denominacion_titulo', 'titulo_fecha', 'fecha_bachiller'
        ]

    def update(self, instance, validated_data):
        id_colegiado = validated_data.pop('id_colegiado', None)
        id_especialidad = validated_data.pop('id_especialidad', None)
        id_estado_colegiatura = validated_data.pop('id_estado_colegiatura', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if id_colegiado is not None:
            instance.id_colegiado = id_colegiado
        if id_especialidad is not None:
            instance.id_especialidad = id_especialidad
        if id_estado_colegiatura is not None:
            instance.id_estado_colegiatura = id_estado_colegiatura

        instance.save()
        return instance

# Serializer personalizado para la vista

# Serializer detallado para Colegiado
class ColegiadoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegiado
        fields = ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'correo', 'numero_colegiatura', 'foto_colegiado']


class EstadoColegiaturaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoColegiatura
        fields = ['fecha_final', 'estado_colegiatura']


# Serializer para consulta de habilidades
class ConsultarHabilidadSerializer(serializers.ModelSerializer):
    id_especialidad = EspecialidadSerializer()
    id_colegiado = ColegiadoDetailSerializer()
    id_estado_colegiatura = EstadoColegiaturaDetailSerializer()

    class Meta:
        model = HistorialEducativo
        fields = ['id_colegiado', 'id_especialidad', 'id_estado_colegiatura']
