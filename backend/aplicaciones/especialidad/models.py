from django.db import models
from functions.validators import validar_numero, validar_espacio
from escuela.models import Escuela


class Especialidad(models.Model):
    nombre_especialidad = models.CharField(max_length=100, blank=False, null=False, unique=True, validators=[validar_espacio], default='')
    id_escuela = models.ForeignKey(Escuela, on_delete=models.CASCADE, null=False, blank=False, default=1)

    def __str__(self) -> str:
        return f'{self.nombre_especialidad} - {self.id_escuela.nombre_escuela}'
