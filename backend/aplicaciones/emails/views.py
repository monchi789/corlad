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
           # Adaptar el JSON
            data = JSONParser().parse(request)
            
            # Extrae los campos del mensaje
            asunto = data.get('asunto', '')
            nombre = data.get('nombre', '')
            correo = data.get('correo', '')
            celular = data.get('celular', '')
            mensaje = data.get('mensaje', '')
            
            # Prepara el contenido del email
            subject = f"Mensaje de {nombre}"
            message = f"Nombre: {nombre}\nCorreo: {correo}\nCelular: {celular}\n\n{mensaje}"
            from_email = correo  

            # Envia el email
            send_mail(subject, message, from_email, ['corladcusco043@gmail.com'])
            
            # Retorna un mensaje de confirmacion
            return Response({'message': 'Correo Enviado con Exito'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Previene errores
            error_message = str(e)
            return Response({'message': error_message}, status=status.HTTP_400_BAD_REQUEST)
