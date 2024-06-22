from rest_framework import serializers
from .models import Colegiado, Escuela, Especialidad

# Serializer Escuela
class EscuelaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escuela
        fields = ['id', 'nombre_escuela']


# Serializer Especialidad
class EspecialidadSerializer(serializers.ModelSerializer):
    id_escuela = EscuelaSerializer()
    
    class Meta:
        model = Especialidad
        fields = ['id', 'nombre_especialidad', 'id_escuela']


# Serializer Colegiado
class ColegiadoSerializer(serializers.ModelSerializer):
    id_especialidad = EspecialidadSerializer()
    
    class Meta:
        model = Colegiado
        fields =  ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'celular', 'universidad', 'correo', 'estado', 'dni_colegiado', 'numero_colegiatura', 'foto_colegiado', 'id_especialidad']
