from django.db import models
from ..colegiado.models import Colegiado
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class EstadoCuenta(models.Model):
    saldo = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    fecha_actualizacion = models.DateField(null=False, blank=False, default=timezone.now)
    id_colegiado = models.OneToOneField(Colegiado, on_delete=models.CASCADE, null=False, blank=False)

    #TODO: Corregir que si cuando actualizo el pago y es el mismo, no se sume en el estado de cuenta
    def actualizar_saldo(self, pago):
        if pago != pago:
            self.saldo += pago.monto_pago
            self.fecha_actualizacion = timezone.now()
            self.save()

    def __str__(self) -> str:
        return f'{self.saldo} - {self.id_colegiado.nombre}'

class Pago(models.Model):
    #TODO: PONER FECHAS
    monto_pago = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.monto_pago} - {self.id_colegiado.nombre}'


@receiver(post_save, sender=Pago)
def actualizar_estado_cuenta(sender, instance, **kwars):
    estado_cuenta, created = EstadoCuenta.objects.get_or_create(id_colegiado=instance.id_colegiado)
    estado_cuenta.actualizar_saldo(instance)
