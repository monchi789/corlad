from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['groups'] = [group.name for group in user.groups.all()]

        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        response_data = serializer.validated_data
        response = Response(response_data, status=status.HTTP_200_OK)
        
        # Set cookies
        response.set_cookie(
            'access', response_data['access'], httponly=True, secure=True, samesite='Lax'
        )
        response.set_cookie(
            'refresh', response_data['refresh'], httponly=True, secure=True, samesite='Lax'
        )
        
        return response
