from rest_framework import serializers
from .models import PopUp, Slider

# Serializer

# PopUp
class PopUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopUp  
        fields = '__all__' 


# Slider
class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = '__all__'

    def validate(self, data):
        # Convierte cadenas vacías a None para todos los campos
        for field in data:
            if data[field] == '':
                data[field] = None
        return data

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance
