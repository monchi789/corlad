from django_filters import rest_framework as filters
from .models import PopUp


class PopUpFilter(filters.FilterSet):
    estado = filters.CharFilter(field_name='estado_popup', lookup_expr='iexact')

    class Meta:
        model = PopUp
        fields = ['estado']
        
