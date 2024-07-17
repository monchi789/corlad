from django_filters import rest_framework as filters
from .models import Categoria, Publicacion

class CategoriaFilter(filters.FilterSet):
    nombre_categoria = filters.CharFilter(field_name='nombre_categoria', lookup_expr='startswith')

    class Meta:
        model = Categoria
        fields = ['nombre_categoria']

class PublicacionFilter(filters.FilterSet):
    titulo = filters.CharFilter(field_name='titulo', lookup_expr='startswith')
    fecha = filters.CharFilter(field_name='fecha', lookup_expr='iexact')
    categoria = filters.CharFilter(field_name='id_categoria__nombre_categoria')

    class Meta:
        model = Publicacion
        fields = ['titulo', 'fecha', 'categoria']
