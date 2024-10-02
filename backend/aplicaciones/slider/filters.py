from django_filters import rest_framework as filters
from .models import Slider

# Slider
class SliderFilter(filters.FilterSet):
    estado = filters.CharFilter(field_name='estado_slider', lookup_expr='iexact')

    class Meta:
        model = Slider  
        fields = ['estado']
