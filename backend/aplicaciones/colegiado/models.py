from django.db import models
from django.core.validators import EmailValidator
from functions.validators import validar_numero, validar_espacio
from django.utils import timezone


# Create your models here.
class Escuela(models.Model):
    nombre_escuela = models.CharField(max_length=100, blank=False, null=False, unique=True, validators=[validar_espacio], default='')

    def __str__(self) -> str:
        return self.nombre_escuela


class Especialidad(models.Model):
    nombre_especialidad = models.CharField(max_length=100, blank=False, null=False, unique=True, validators=[validar_espacio], default='')
    id_escuela = models.ForeignKey(Escuela, on_delete=models.CASCADE, null=False, blank=False, default=1)

    def __str__(self) -> str:
        return f'{self.nombre_especialidad} - {self.id_escuela.nombre_escuela}'


class Colegiado(models.Model):

    SEXO =[
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]

    ESTADO_CIVIL = [
        ('CASADO', 'Casado'),
        ('SOLTERO', 'Soltero')
    ]

    nombre = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_paterno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_materno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    celular = models.CharField(max_length=9, blank=False, null=False, validators=[validar_numero, validar_espacio], default='')
    correo = models.EmailField(blank=False, null=False, validators=[EmailValidator], default='')
    foto_colegiado = models.ImageField(upload_to='foto_colegiados/', null=False, blank=True, default='')
    dni_colegiado = models.CharField(max_length=8, blank=False, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    numero_colegiatura = models.CharField(max_length=250, blank=False, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    fecha_colegiatura = models.DateField(null=False, blank=False, default=timezone.now)
    sexo_colegiado = models.CharField(max_length=9, choices=SEXO, null=False, blank=False, default='O')
    fecha_nacimiento = models.DateField(null=False, blank=False, default=timezone.now)
    estado_civil = models.CharField(max_length=7, null=False, blank=False, choices=ESTADO_CIVIL, default='SOLTERO')
    direccion = models.CharField(max_length=300, blank=False, null=False, default='')

    def __str__(self) -> str:
        return f'{self.nombre} - {self.apellido_paterno} - {self.numero_colegiatura} - {self.dni_colegiado}'


class EstadoColegiatura(models.Model):
    fecha_inicio = models.DateField(null=False, blank=False, default=timezone.now)
    fecha_final = models.DateField(null=False, blank=False, default=timezone.now)
    estado_colegiatura = models.BooleanField(null=False, blank=False, default=False)


class HistorialEducativo(models.Model):
    universidad = models.CharField(max_length=250, blank=False, null=False, validators=[validar_espacio], default='')
    denominacion_bachiller = models.CharField(max_length=250, null=False, validators=[validar_espacio], default='')
    fecha_bachiller = models.DateField(null=False, blank=False, default=timezone.now)
    denominacion_titulo = models.CharField(max_length=250, null=False, blank=False, validators=[validar_espacio], default='')
    titulo_fecha = models.DateField(null=False, blank=False, default=timezone.now)
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE, default=0)
    id_estado_colegiatura = models.OneToOneField(EstadoColegiatura, on_delete=models.CASCADE, blank=True, null=True)
    id_especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE, default=0)

    def __str__(self) -> str:
        return f'{self.id_colegiado.nombre} - {self.id_colegiado.numero_colegiatura} - {self.id_colegiado.dni_colegiado} - {self.universidad} - {self.id_especialidad.id_escuela.nombre_escuela} - {self.id_especialidad.nombre_especialidad}'
