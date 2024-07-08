from rest_framework import serializers
from .models import Categoria, Publicacion

# Serializer Categoria
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre_categoria']


# Serializer Publicacion
class PublicacionSerializer(serializers.ModelSerializer):
    id_categoria = CategoriaSerializer(read_only=True)

    id_categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        source='id_categoria',
        write_only=True
    )

    class Meta:
        model = Publicacion
        fields = ['id', 'id_categoria_id','titulo', 'contenido', 'fecha_publicacion', 'imagen_publicacion', 'documento', 'id_categoria']

    def update(self, instance, validated_data): 
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
