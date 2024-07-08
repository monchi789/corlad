from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Categoria, Publicacion
from .serializers import CategoriaSerializer, PublicacionSerializer

# Create your views here.
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

    def list(self, request, *args, **kwargs):
        categorias = self.get_queryset()
        serializer = self.get_serializer(categorias, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer

    def list(self, request, *args, **kwargs):
        publicaciones = self.get_queryset()
        serializer = self.get_serializer(publicaciones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
