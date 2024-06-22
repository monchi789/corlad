from rest_framework import serializers
from .models import Categoria, Publicacion

# Serializer Categoria
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre_categoria']


# Serializer Publicacion
class PublicacionSerializer(serializers.ModelSerializer):
    id_categoria = CategoriaSerializer()

    class Meta:
        model = Publicacion
        fields = ['id', 'titulo', 'contenido', 'fecha_publicacion', 'imagen_publicacion', 'documento', 'id_categoria']
