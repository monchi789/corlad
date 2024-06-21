from django.db import models
from ..colegiado.models import Colegiado

# Create your models here.
class EstadoCuenta(models.Model):
    saldo = models.FloatField()
