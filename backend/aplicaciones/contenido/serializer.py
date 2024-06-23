from rest_framework import serializers
from .models import PopUp, Slider

# Serializer
class PopUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopUp
        fields = ['id', 'imagen', 'estado_popup']
    

class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'imagen_1', 'imagen_2', 'imagen_3', 'imagen_4', 'estado_slider']
