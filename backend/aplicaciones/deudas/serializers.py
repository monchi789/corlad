from rest_framework import serializers
from .models import Deudas
from ..colegiado.serializers import ColegiadoSerializer


class DeudasSerializer(serializers.ModelSerializer):
    id_colegiado = ColegiadoSerializer(read_only=True)
    

    class Meta:
        model = Deudas
        fields = [
            'id', 'id_colegiado', 'codigo_deuda',
            'fecha_deuda', 'motivo_deuda', 
            'monto_deuda'
        ]
