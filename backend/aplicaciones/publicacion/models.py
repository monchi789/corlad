from django.db import models
from functions.validators import validar_espacio
from django.core.validators import FileExtensionValidator
from tinymce.models import HTMLField

# Modelo Categoria
class Categoria(models.Model):
    # Campo para el nombre de la categoría, único y no puede estar en blanco o ser nulo
    nombre_categoria = models.CharField(max_length=250, unique=True, blank=False, null=False, validators=[validar_espacio])

    def __str__(self) -> str:
        # Representación en cadena del objeto, muestra el nombre de la categoría
        return self.nombre_categoria

# Modelo Publicacion
class Publicacion(models.Model):
    # Campo para el título de la publicación, no puede ser nulo y aplica la validación personalizada 'validar_espacio'
    titulo = models.CharField(max_length=250, blank=True, null=False, validators=[validar_espacio])
    # Campo para el contenido de la publicación, utiliza el campo HTML de TinyMCE
    contenido = HTMLField()
    # Campo para la fecha de publicación
    fecha_publicacion = models.DateField()
    # Campo para la imagen de la publicación, se guarda en el directorio 'publicaciones/', puede estar en blanco pero no nulo
    imagen_publicacion = models.ImageField(upload_to='publicaciones/', blank=True, null=False)
    # Campo para un documento adjunto, se guarda en el directorio 'documentos/', puede estar en blanco o nulo, solo permite archivos PDF
    documento = models.FileField(upload_to='documentos/', null=True, blank=True, validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    # Clave foránea para la categoría, referencia al modelo Categoria, eliminación en cascada y valor por defecto de 1
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, default=1)

    def __str__(self) -> str:
        # Representación en cadena del objeto, muestra el título, la fecha de publicación y el nombre de la categoría asociada
        return f'{self.titulo} - {self.fecha_publicacion} - {self.id_categoria.nombre_categoria}'
