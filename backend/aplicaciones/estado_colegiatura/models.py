from django.db import models
from django.core.validators import EmailValidator
from functions.validators import validar_numero, validar_espacio
from django.utils import timezone
from django.db.models.signals import pre_save
from django.dispatch import receiver


class EstadoColegiatura(models.Model):
    fecha_inicio = models.DateField(null=False, blank=False, default=timezone.now)
    fecha_final = models.DateField(null=False, blank=False, default=timezone.now)
    estado_colegiatura = models.BooleanField(null=False, blank=False, default=False)

    def save(self, *args, **kwargs):
        self.verificar_estado()
        super().save(*args, **kwargs)

    def actualizar_estado(self):
        self.verificar_estado()
        self.save()

    def verificar_estado(self):
        """Verificar si la colegiatura esta activa en base a la fecha actual"""
        hoy = timezone.now().date()
        if self.fecha_inicio <= hoy <= self.fecha_final:
            self.estado_colegiatura = True
        else:
            self.estado_colegiatura = False
        return self.estado_colegiatura

    def __str__(self) -> str:

        estado = ''

        if self.estado_colegiatura:
            estado = 'Activo'
        else:
            estado = 'No Activo'

        return f'Fecha Inicio: {self.fecha_inicio} - Fecha Final: {self.fecha_final} - Estado: {estado}'
    
@receiver(pre_save, sender=EstadoColegiatura)
def actualizar_estado_colegiatura(sender, instance, **kwargs):
    if instance.fecha_final < timezone.now().date():
        instance.estado_colegiatura = False

