from rest_framework import serializers
from .models import PopUp, Slider

# Serializer para el modelo PopUp
class PopUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopUp  # Especifica el modelo que se va a serializar
        fields = '__all__'  # Incluye todos los campos del modelo en la serialización

# Serializer para el modelo Slider
class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider  # Especifica el modelo que se va a serializar
        fields = '__all__'  # Incluye todos los campos del modelo en la serialización
