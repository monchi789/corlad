from rest_framework import serializers
from metodo_pago.models import MetodoPago
from .models import MetodoPago


class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetodoPago
        fields = '__all__'
