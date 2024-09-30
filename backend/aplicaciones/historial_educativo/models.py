from django.db import models
from functions.validators import  validar_espacio
from django.utils import timezone
from ..colegiado.models import Colegiado
from ..especialidad.models import Especialidad


class HistorialEducativo(models.Model):
    universidad = models.CharField(max_length=250, blank=False, null=False, validators=[validar_espacio], default='')
    denominacion_bachiller = models.CharField(max_length=250, null=False, validators=[validar_espacio], default='')
    fecha_bachiller = models.DateField(null=False, blank=False, default=timezone.now)
    denominacion_titulo = models.CharField(max_length=250, null=False, blank=False, validators=[validar_espacio], default='')
    titulo_fecha = models.DateField(null=False, blank=False, default=timezone.now)
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE, default=0)
    id_especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE, default=0)

    def esta_activo(self):
        """Verifica si el colegiado está activo"""
        return self.id_colegiado.estado_activo()

    def __str__(self) -> str:
        return f'{self.id_colegiado.nombre} - {self.id_colegiado.numero_colegiatura} - {self.id_colegiado.dni_colegiado} - {self.universidad} - {self.id_especialidad.id_escuela.nombre_escuela} - {self.id_especialidad.nombre_especialidad}'
