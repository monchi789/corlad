from django.db import models
from functions.validators import validar_espacio
from django.core.validators import FileExtensionValidator
from tinymce.models import HTMLField
from ..categoria.models import Categoria


# Modelo Publicacion
class Publicacion(models.Model):
    titulo = models.CharField(max_length=250, blank=True, null=False, validators=[validar_espacio])
    contenido = HTMLField()
    fecha_publicacion = models.DateField()
    imagen_publicacion = models.ImageField(upload_to='publicaciones/', blank=True, null=False)
    documento = models.FileField(upload_to='documentos/', null=True, blank=True, validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, default=1)

    def __str__(self) -> str:
        return f'{self.titulo} - {self.fecha_publicacion} - {self.id_categoria.nombre_categoria}'
