from django.db import models
from functions.validators import validar_espacio
from django.core.validators import FileExtensionValidator


# Create your models here.
class Categoria(models.Model):
    nombre_categoria = models.CharField(max_length=250, unique=True, blank=False, null=False, validators=[validar_espacio])

    def __str__(self) -> str:
        return self.nombre_categoria


class Publicacion(models.Model):
    titulo = models.CharField(max_length=250, blank=True, null=False, validators=[validar_espacio])
    contenido = models.TextField(blank=True, null=False, default='')
    fecha_publicacion = models.DateField()
    imagen_publicacion = models.ImageField(upload_to='publicaciones/', blank=True, null=False)
    documento = models.FileField(upload_to='documentos/', validators=[FileExtensionValidator(allowed_extensions=['pdf'])],  default='default_value_for_documento')
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, default=1)

    def __str__(self) -> str:
        return f'{self.titulo} - {self.fecha_publicacion} - {self.id_categoria.nombre_categoria}'
