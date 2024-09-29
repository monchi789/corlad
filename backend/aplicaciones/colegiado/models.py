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
        ('OTRO', 'Otro')
    ]

    nombre = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_paterno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_materno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    celular = models.CharField(max_length=9, blank=False, null=False, validators=[validar_numero, validar_espacio], default='')
    correo = models.EmailField(blank=False, null=False, validators=[EmailValidator], default='')
    foto_colegiado = models.ImageField(upload_to='foto_colegiados/', null=False, blank=True, default='')
    dni_colegiado = models.CharField(max_length=8, blank=False, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    numero_colegiatura = models.CharField(max_length=250, blank=False, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    numero_colegiatura_anterior = models.CharField(max_length=250, blank=True, null=True, validators=[validar_numero])
    fecha_colegiatura = models.DateField(null=False, blank=False, default=timezone.now)
    sexo_colegiado = models.CharField(max_length=9, choices=SEXO, null=False, blank=False, default='O')
    fecha_nacimiento = models.DateField(null=False, blank=False, default=timezone.now)
    estado_civil = models.CharField(max_length=7, null=False, blank=False, choices=ESTADO_CIVIL, default='SOLTERO')
    direccion = models.CharField(max_length=300, blank=False, null=False, default='')
    estado_activo = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.nombre} - {self.apellido_paterno} - {self.numero_colegiatura} - {self.dni_colegiado} - {self.estado_activo}'
