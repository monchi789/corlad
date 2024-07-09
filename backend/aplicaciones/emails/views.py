from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

# Create your views here.
class EmailAPIView(APIView):
    def post(self, request):
        try:
            # Parse the JSON data from the request body
            data = JSONParser().parse(request)
            
            # Extract the fields from the data
            nombre = data.get('nombre', '')
            correo = data.get('correo', '')
            celular = data.get('celular', '')
            mensaje = data.get('mensaje', '')
            
            # Prepare the email content
            subject = f"Mensaje de {nombre}"
            message = f"Nombre: {nombre}\nCorreo: {correo}\nCelular: {celular}\n\n{mensaje}"
            from_email = correo  # You can set a fixed sender email here if needed
            
            # Send the email
            send_mail(subject, message, from_email, ['salazarsergio1082@gmail.com'])
            
            # Return a success response
            return Response({'message': 'Correo Enviado con Exito'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Handle any errors and return an error response
            error_message = str(e)
            return Response({'message': error_message}, status=status.HTTP_400_BAD_REQUEST)
