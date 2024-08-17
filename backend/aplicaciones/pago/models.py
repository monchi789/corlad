from ..colegiado.models import Colegiado, EstadoColegiatura, HistorialEducativo, Especialidad
from functions.validators import validar_numero, validar_espacio

from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from datetime import timedelta


# Modelo para el estado de cuenta del colegiado
class EstadoCuenta(models.Model):
    saldo = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    fecha_actualizacion = models.DateField(null=False, blank=False, default=timezone.now)
    id_colegiado = models.OneToOneField(Colegiado, on_delete=models.CASCADE, null=False, blank=False)

    def actualizar_saldo(self):
        # Método para actualizar el saldo del estado de cuenta basado en los pagos del colegiado
        pagos = Pago.objects.filter(id_colegiado=self.id_colegiado)
        total_pagos = sum(pago.monto_pago for pago in pagos)
        self.saldo = total_pagos
        self.fecha_actualizacion = timezone.now()
        self.save()

    def __str__(self) -> str:
        return f'{self.saldo} - {self.id_colegiado.nombre}'


# Modelo para los métodos de pago disponibles
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


# Modelo para los tipos de pago disponibles
class TipoPago(models.Model):
    NOMBRE_TIPO_PAGO = [
        ('MATRICULA', 'Matricula'),
        ('MENSUALIDAD', 'Mensualidad'),
        ('EXTRAORDINARIO', 'Extraordinario'),
        ('MULTA', 'Multa')
    ]

    nombre_tipo_pago = models.CharField(max_length=14, null=False, blank=False, unique=True, choices=NOMBRE_TIPO_PAGO, default='EXTRAORDINARIO')

    def __str__(self) -> str:
        return self.nombre_tipo_pago


# Modelo para los pagos realizados por los colegiados
class Pago(models.Model):
    monto_pago = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    fecha_pago = models.DateField(null=False, blank=False, default=timezone.now)
    numero_operacion = models.CharField(null=False, blank=False, default='', validators=[validar_numero])
    meses = models.CharField(max_length=2, null=False, blank=False, default='', validators=[validar_numero])
    observacion = models.CharField(max_length=255, null=False, blank=False, default='', validators=[validar_espacio])
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE)
    id_tipo_pago = models.ForeignKey(TipoPago, on_delete=models.CASCADE, default=0)
    id_metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.CASCADE, default=0)

    def clean(self):
        # Validaciones específicas para pagos de matrícula
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

        historial = HistorialEducativo.objects.get(id_colegiado=self.id_colegiado)
        estado = historial.id_estado_colegiatura
        
        if estado:
            # Si ya existe un estado, extendemos la fecha final
            nueva_fecha_final = max(estado.fecha_final, self.fecha_pago) + timedelta(days=30 * int(self.meses))
            estado.fecha_final = nueva_fecha_final
        else:
            # Si no existe, creamos uno nuevo
            nueva_fecha_final = self.fecha_pago + timedelta(days=30 * int(self.meses))
            estado = EstadoColegiatura.objects.create(
                fecha_inicio=self.fecha_pago,
                fecha_final=nueva_fecha_final,
                estado_colegiatura=True
            )
        
        estado.save()
        
        historial.id_estado_colegiatura = estado
        historial.save()

        # Actualizar el estado de colegiatura
        self.actualizar_estado_colegiatura()

    def actualizar_estado_colegiatura(self):
        historial = HistorialEducativo.objects.filter(id_colegiado=self.id_colegiado).first()
        if historial and historial.id_estado_colegiatura:
            estado = historial.id_estado_colegiatura
            fecha_actual = timezone.now().date()
            
            if estado.fecha_final < fecha_actual:
                estado.estado_colegiatura = False
            elif estado.fecha_inicio <= fecha_actual <= estado.fecha_final:
                estado.estado_colegiatura = True
            
            estado.save()

    def __str__(self):
        return f'{self.monto_pago} - {self.id_colegiado.nombre} - {self.id_metodo_pago.nombre_metodo_pago} - {self.id_tipo_pago.nombre_tipo_pago}'


# Señal para actualizar automáticamente el estado de cuenta después de guardar un pago
@receiver(post_save, sender=Pago)
def actualizar_estado_cuenta(sender, instance, **kwargs):
    estado_cuenta, created = EstadoCuenta.objects.get_or_create(id_colegiado=instance.id_colegiado)
    estado_cuenta.actualizar_saldo()
