from ..colegiado.models import Colegiado
from functions.validators import validar_numero, validar_espacio
from ..metodo_pago.models import MetodoPago
from ..historial_educativo.models import HistorialEducativo
from ..estado_colegiatura.models import EstadoColegiatura
from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from django.core.exceptions import ValidationError
from datetime import timedelta


# Modelo para los pagos realizados por los colegiados
class Pago(models.Model):
    monto_pago = models.FloatField(default=0.00, validators=[MinValueValidator(0)])
    fecha_pago = models.DateField(null=False, blank=False, default=timezone.now)
    numero_operacion = models.CharField(null=True, blank=True, default='', validators=[validar_numero])
    meses = models.CharField(max_length=3, null=False, blank=False, default='', validators=[validar_numero])
    observacion = models.CharField(max_length=255, null=True, blank=True, default='', validators=[validar_espacio])
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE)
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
    
    def actualizar_estado_colegiatura(self):
        historial = HistorialEducativo.objects.filter(id_colegiado=self.id_colegiado).first()
        if historial and historial.id_estado_colegiatura:
            estado = historial.id_estado_colegiatura
            fecha_actual = timezone.now().date()
            
            if estado.fecha_final < fecha_actual:
                estado.estado_colegiatura = False
                print(f"Estado de colegiatura cambiado a NO ACTIVO para colegiado {self.id_colegiado.id}")
            elif estado.fecha_inicio <= fecha_actual <= estado.fecha_final:
                estado.estado_colegiatura = True
                print(f"Estado de colegiatura actualizado a ACTIVO para colegiado {self.id_colegiado.id}")
            
            estado.save()
            historial.save()
        else:
            print("No se encontró historial o estado de colegiatura para actualizar.")


    def save(self, *args, **kwargs):
        self.clean()
        super(Pago, self).save(*args, **kwargs)

        historial, created = HistorialEducativo.objects.get_or_create(id_colegiado=self.id_colegiado)
        estado = historial.id_estado_colegiatura

        if estado:
            nueva_fecha_final = max(estado.fecha_final, self.fecha_pago) + timedelta(days=30 * int(self.meses))
            estado.fecha_final = nueva_fecha_final
        else:
            nueva_fecha_final = self.fecha_pago + timedelta(days=30 * int(self.meses))
            estado = EstadoColegiatura.objects.create(
                fecha_inicio=self.fecha_pago,
                fecha_final=nueva_fecha_final,
                estado_colegiatura=True
            )

        estado.save()

        historial.id_estado_colegiatura = estado
        historial.save()


    def __str__(self):
        return f'{self.monto_pago} - {self.id_colegiado.nombre} - {self.id_metodo_pago.nombre_metodo_pago}'
