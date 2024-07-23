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
