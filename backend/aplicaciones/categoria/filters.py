from django_filters import rest_framework as filters
from .models import Categoria


class CategoriaFilter(filters.FilterSet):
    nombre_categoria = filters.CharFilter(field_name='nombre_categoria', lookup_expr='startswith')

    class Meta:
        model = Categoria
        fields = ['nombre_categoria']
