from django_filters import rest_framework as filters
from .models import Publicacion


class PublicacionFilter(filters.FilterSet):
    titulo = filters.CharFilter(field_name='titulo', lookup_expr='startswith')
    fecha = filters.DateFromToRangeFilter(field_name='fecha')
    categoria = filters.CharFilter(field_name='id_categoria__nombre_categoria')

    class Meta:
        model = Publicacion
        fields = ['titulo', 'fecha', 'categoria']
