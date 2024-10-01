from rest_framework import serializers
from .models import Categoria

# Serializer para el modelo Categoria
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        # Campos que serán serializados
        fields = ['id', 'nombre_categoria']
