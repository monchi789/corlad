from django.db import models
from django.core.validators import EmailValidator
from functions.validators import validar_numero, validar_espacio


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
    nombre = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_paterno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_materno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    celular = models.CharField(max_length=9, blank=False, null=False, validators=[validar_numero], default='')
    universidad = models.CharField(max_length=250, blank=False, null=False, validators=[validar_espacio], default='')
    correo = models.EmailField(blank=False, null=False, validators=[EmailValidator], default='')
    estado = models.BooleanField(blank=False, null=False, default=False)
    dni_colegiado = models.CharField(max_length=8, blank=False, null=False, validators=[validar_numero], default='')
    numero_colegiatura = models.CharField(max_length=250, blank=False, null=False, validators=[validar_numero], default='')
    foto_colegiado = models.ImageField(upload_to='foto_colegiados/', null=False, blank=False, default='')
    id_especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE, null=False, blank=False, default=1)

    def __str__(self) -> str:
        return f'{self.nombre} - {self.apellido_paterno} - {self.numero_colegiatura} - {self.id_especialidad.nombre_especialidad} - {self.id_especialidad.id_escuela.nombre_escuela}'
