from ..colegiado.models import Colegiado
from functions.validators import validar_numero, validar_espacio
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from django.db import transaction
from ..metodo_pago.models import MetodoPago
from ..tarifa.models import Tarifa
from django.db import models
from django.utils import timezone
from datetime import timedelta
from ..historial_educativo.models import HistorialEducativo
from dateutil.relativedelta import relativedelta


class Pago(models.Model):
    MESES_CHOICES = [
        ('01', 'Enero'),
        ('02', 'Febrero'),
        ('03', 'Marzo'),
        ('04', 'Abril'),
        ('05', 'Mayo'),
        ('06', 'Junio'),
        ('07', 'Julio'),
        ('08', 'Agosto'),
        ('09', 'Septiembre'),
        ('10', 'Octubre'),
        ('11', 'Noviembre'),
        ('12', 'Diciembre'),
    ]

    fecha_pago = models.DateField(default=timezone.now, editable=False)
    numero_operacion = models.CharField(null=True, blank=True, default='', validators=[validar_numero])
    observacion = models.CharField(max_length=255, null=True, blank=True, default='', validators=[validar_espacio])
    id_metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.CASCADE, default=0)
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE)
    tarifas = models.ManyToManyField(Tarifa, blank=True)
    
    monto_total = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0)
    meses_pagados = ArrayField(
        models.CharField(max_length=2, choices=MESES_CHOICES),
        blank=True,
        null=True,
    )

    def calcular_monto_total(self):
        monto_tarifas = sum(tarifa.precio_tarifa for tarifa in self.tarifas.all() if not tarifa.es_mensualidad)
        tarifa_mensual = self.tarifas.filter(es_mensualidad=True).first()

        if tarifa_mensual:
            monto_mensualidades = tarifa_mensual.precio_tarifa * len(self.meses_pagados or [])
        else:
            monto_mensualidades = 0

        return monto_tarifas + monto_mensualidades
    
    def es_pago_mensualidad(self):
        return self.tarifas.filter(es_mensualidad=True).exists()

    def actualizar_estado_colegiado(self):
        colegiado = self.id_colegiado
        hoy = timezone.now()  # Obtener la fecha y hora actual como datetime

        if self.es_pago_mensualidad() and self.meses_pagados:
            ultimo_mes = max(int(mes) for mes in self.meses_pagados)
            fecha_ultimo_pago = self.fecha_pago.replace(day=1, month=ultimo_mes)
            fecha_vencimiento = fecha_ultimo_pago + relativedelta(months=1)

            # Realiza la comparación
            colegiado.estado_activo = hoy < fecha_vencimiento
        else:
            colegiado.estado_activo = False

        colegiado.save(update_fields=['estado_activo'])


    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if self.es_pago_mensualidad():
            self.actualizar_estado_colegiado()

    def __str__(self):
        meses = ', '.join(dict(self.MESES_CHOICES)[mes] for mes in (self.meses_pagados or []))
        return f'Pago de {self.id_colegiado.nombre} - Meses: {meses} - Total: {self.monto_total}'

@receiver(m2m_changed, sender=Pago.tarifas.through)
def tarifas_changed(sender, instance, action, **kwargs):
    if action in ['post_add', 'post_remove', 'post_clear']:
        instance.monto_total = instance.calcular_monto_total()
        instance.save(update_fields=['monto_total'])
        if instance.es_pago_mensualidad():
            instance.actualizar_estado_colegiado()

@receiver(post_save, sender=Pago)
def actualizar_estado_colegiado_signal(sender, instance, created, **kwargs):
    if instance.es_pago_mensualidad():
        instance.actualizar_estado_colegiado()
