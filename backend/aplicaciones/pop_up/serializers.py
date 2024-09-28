from rest_framework import serializers
from .models import PopUp

# Serializer
class PopUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopUp  
        fields = '__all__' 
