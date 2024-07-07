from django.db import models
from ..colegiado.models import Colegiado
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError


# Create your models here.
class EstadoCuenta(models.Model):
    saldo = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    fecha_actualizacion = models.DateField(null=False, blank=False, default=timezone.now)
    id_colegiado = models.OneToOneField(Colegiado, on_delete=models.CASCADE, null=False, blank=False)

    def actualizar_saldo(self):
        pagos = Pago.objects.filter(id_colegiado=self.id_colegiado)
        total_pagos = sum(pago.monto_pago for pago in pagos)
        self.saldo = total_pagos
        self.fecha_actualizacion = timezone.now()
        self.save()

    def __str__(self) -> str:
        return f'{self.saldo} - {self.id_colegiado.nombre}'
    

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


class TipoPago(models.Model):

    NOMBRE_TIPO_PAGO = [
        ('MATRICULA', 'Matricula'), 
        ('MENSUALIDAD', 'Mensualidad'),
        ('EXTRAORDINARIO', 'Extraordinario'),
        ('MULTA', 'Multa')
    ]

    nombre_tipo_pago = models.CharField(max_length=14, null=False, blank=False, unique=True, choices=NOMBRE_TIPO_PAGO,default='EXTRAORDINARIO')

    def __str__(self) -> str:
        return self.nombre_tipo_pago


class Pago(models.Model):
    monto_pago = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    fecha_pago = models.DateField(null=False, blank=False, default=timezone.now)
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE)
    id_tipo_pago = models.ForeignKey(TipoPago, on_delete=models.CASCADE, default=0)
    id_metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.CASCADE, default=0)

    def clean(self):
        # Validaciones específicas de pagos de matrícula
        if self.id_tipo_pago.nombre_tipo_pago == 'MATRICULA':
            if self.pk is None:
                # Nuevo registro de pago de matrícula
                if Pago.objects.filter(id_colegiado=self.id_colegiado, id_tipo_pago__nombre_tipo_pago='MATRICULA').exists():
                    raise ValidationError('El colegiado ya tiene un pago de matrícula registrado.')
            else:
                # Actualización de pago de matrícula
                existing_matricula = Pago.objects.filter(id_colegiado=self.id_colegiado, id_tipo_pago__nombre_tipo_pago='MATRICULA').exclude(pk=self.pk).first()
                if existing_matricula:
                    raise ValidationError('El colegiado ya tiene un pago de matrícula registrado.')


    def save(self, *args, **kwargs):
        self.clean()
        super(Pago, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f'{self.monto_pago} - {self.id_colegiado.nombre} - {self.id_metodo_pago.nombre_metodo_pago} - {self.id_tipo_pago.nombre_tipo_pago}'


@receiver(post_save, sender=Pago)
def actualizar_estado_cuenta(sender, instance, **kwars):
    estado_cuenta, created = EstadoCuenta.objects.get_or_create(id_colegiado=instance.id_colegiado)
    estado_cuenta.actualizar_saldo()
