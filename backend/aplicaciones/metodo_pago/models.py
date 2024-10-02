from ..colegiado.models import Colegiado
from functions.validators import validar_numero, validar_espacio

from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from datetime import timedelta


class MetodoPago(models.Model):
    NOMBRE_METODO_PAGO = [
        ('EFECTIVO', 'Efectivo'),
        ('DEPOSITO', 'Deposito'),
        ('YAPE', 'Yape'),
        ('PLIN', 'Plin')
    ]

    nombre_metodo_pago = models.CharField(max_length=8, choices=NOMBRE_METODO_PAGO, null=False, blank=False, unique=True, default='DEPOSITO')

    def __str__(self) -> str:
        return self.nombre_metodo_pago
