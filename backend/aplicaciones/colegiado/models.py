from django.db import models
from django.core.validators import EmailValidator
from functions.validators import validar_numero, validar_espacio
from django.utils import timezone
from dateutil.relativedelta import relativedelta


class Colegiado(models.Model):

    SEXO = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]

    ESTADO_CIVIL = [
        ('CASADO', 'Casado'),
        ('SOLTERO', 'Soltero'),
        ('OTRO', 'Otro'),
    ]

    ESTADO_ACTIVO = [
        ('FALLECIDO', 'Fallecido'),
        ('TRASLADADO', 'Trasladado'),
        ('ACTIVO', 'Activo'),
        ('NO_ACTIVO', 'No activo')
    ]

    nombre = models.CharField(max_length=100, blank=True, null=False, validators=[validar_espacio], default='')
    apellido_paterno = models.CharField(max_length=100, blank=True, null=False, validators=[validar_espacio], default='')
    apellido_materno = models.CharField(max_length=100, blank=True, null=False, validators=[validar_espacio], default='')
    celular = models.CharField(max_length=9, blank=True, null=True, validators=[validar_numero, validar_espacio], default='')
    correo = models.EmailField(blank=True, null=True, validators=[EmailValidator], default='')
    foto_colegiado = models.ImageField(upload_to='foto_colegiados/', null=False, blank=True, default='')
    dni_colegiado = models.CharField(max_length=8, blank=True, null=True, validators=[validar_numero, validar_espacio], default='')
    numero_colegiatura = models.CharField(max_length=250, blank=True, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    numero_colegiatura_anterior = models.CharField(max_length=250, blank=True, null=True, validators=[validar_numero])
    fecha_colegiatura = models.DateField(null=False, blank=True, default=timezone.now)
    sexo_colegiado = models.CharField(max_length=9, choices=SEXO, null=False, blank=True, default='O')
    fecha_nacimiento = models.DateField(null=False, blank=True, default=timezone.now)
    estado_civil = models.CharField(max_length=20, null=False, blank=True, choices=ESTADO_CIVIL, default='SOLTERO')
    direccion = models.CharField(max_length=300, blank=True, null=False, default='')
    estado_activo = models.CharField(max_length=11, blank=False, null=True, choices=ESTADO_ACTIVO, default='ACTIVO')

    def __str__(self) -> str:
        return f'{self.nombre} - {self.apellido_paterno} - {self.numero_colegiatura} - {self.dni_colegiado} - {self.estado_activo}'
