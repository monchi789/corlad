from django.db import models

# Create your models here.
class Categoria(models.Model):
    nombre_categoria = models.CharField(max_length=250, unique=True, blank=False, null=False, default='')


class Publicacion(models.Model):
    titulo = models.CharField(max_length=250, blank=False, null=False, default='')
    contenido = models.TextField(blank=False, null=False, default='')
    imagen_publicacion = models.ImageField(blank=False, null=False)
    fecha_publicacion = models.DateField()

    nombre_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, default=1)
