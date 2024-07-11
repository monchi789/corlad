from rest_framework import serializers
from .models import Categoria, Publicacion

# Serializer para el modelo Categoria
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        # Campos que serán serializados
        fields = ['id', 'nombre_categoria']

# Serializer para el modelo Publicacion
class PublicacionSerializer(serializers.ModelSerializer):
    # Serializer anidado para mostrar los detalles de la categoría de solo lectura
    id_categoria = CategoriaSerializer(read_only=True)

    # Campo para manejar la relación con el modelo Categoria, solo escritura
    id_categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),  # Conjunto de datos de la categoría
        source='id_categoria',  # Relaciona con el campo 'id_categoria' del modelo Publicacion
        write_only=True  # Campo de solo escritura
    )

    class Meta:
        model = Publicacion
        # Campos que serán serializados
        fields = ['id', 'id_categoria_id', 'titulo', 'contenido', 'fecha_publicacion', 'imagen_publicacion', 'documento', 'id_categoria']

    def update(self, instance, validated_data):
        """
        Actualiza una instancia del modelo Publicacion con los datos validados.
        """
        # Itera sobre los datos validados y establece los atributos de la instancia
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        # Guarda la instancia actualizada
        instance.save()

        return instance
