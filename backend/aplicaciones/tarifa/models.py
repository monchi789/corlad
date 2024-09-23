from django.db import models
from functions.validators import validar_espacio
from django.core.validators import MinValueValidator

# Create your models here.
class Tarifa(models.Model):
    nombre_tarifa = models.CharField(max_length=250, blank=False, null=False, validators=[validar_espacio])
    descripcion_tarifa = models.TextField(blank=True, null=True)
    precio_tarifa = models.FloatField(validators=[MinValueValidator(0)])
    es_mensualidad = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.nombre_tarifa} - {self.precio_tarifa}'
