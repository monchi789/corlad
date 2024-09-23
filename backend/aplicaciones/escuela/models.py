from django.db import models
from functions.validators import validar_espacio
from django.db import models

# Create your models here.
class Escuela(models.Model):
    nombre_escuela = models.CharField(max_length=100, blank=False, null=False, unique=True, validators=[validar_espacio], default='')

    def __str__(self) -> str:
        return self.nombre_escuela
