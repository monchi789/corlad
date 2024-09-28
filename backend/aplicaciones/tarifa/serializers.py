from rest_framework import serializers
from .models import Tarifa

class TarifaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifa
        fields = '__all__'
    