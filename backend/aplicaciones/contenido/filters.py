from django_filters import rest_framework as filters
from .models import PopUp, Slider

# PopUp
class PopUpFilter(filters.FilterSet):
    estado = filters.CharFilter(field_name='estado_popup', lookup_expr='iexact')

    class Meta:
        model = PopUp
        fields = ['estado']
        

# Slider
class SliderFilter(filters.FilterSet):
    estado = filters.CharFilter(field_name='estado_slider', lookup_expr='iexact')

    class Meta:
        model = Slider  
        fields = ['estado']
