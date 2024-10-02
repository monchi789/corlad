from django.db import models
from functions.validators import validar_espacio

# Modelo Categoria
class Categoria(models.Model):
    nombre_categoria = models.CharField(max_length=250, unique=True, blank=False, null=False, validators=[validar_espacio])

    def __str__(self) -> str:
        return self.nombre_categoria
