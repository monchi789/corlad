from django.db import models
from functions.validators import validar_espacio, validar_numero
from ..colegiado.models import Colegiado
from django.utils import timezone
from django.core.validators import MinValueValidator

# Create your models here.
class Deudas(models.Model):
    codigo_deuda = models.CharField(max_length=20, null=True, blank=True, validators=[validar_numero], default='')
    fecha_deuda = models.DateField(default=timezone.now)
    motivo_deuda = models.TextField(max_length=250, null=True, blank=True, validators=[validar_espacio], default='')
    monto_deuda = models.FloatField(validators=[MinValueValidator(0)])
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.fecha_deuda} - {self.id_colegiado.nombre}'
