from django_filters import rest_framework as filters
from .models import PopUp, Slider

# Filtro para PopUp
class PopUpFilter(filters.FilterSet):
    # Definición del filtro para el estado del PopUp
    estado = filters.CharFilter(field_name='estado_popup', lookup_expr='iexact')

    class Meta:
        model = PopUp  # Especificamos el modelo al que pertenece el filtro
        fields = ['estado']  # Campos por los que se pueden filtrar los PopUps

# Filtro para Slider
class SliderFilter(filters.FilterSet):
    # Definición del filtro para el estado del Slider
    estado = filters.CharFilter(field_name='estado_slider', lookup_expr='iexact')

    class Meta:
        model = Slider  # Especificamos el modelo al que pertenece el filtro
        fields = ['estado']  # Campos por los que se pueden filtrar los Sliders
