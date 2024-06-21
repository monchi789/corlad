from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

# Validadores
def validar_numero(valor):
    if not valor.isdigit():
        raise ValidationError('El campo solo debe contener numeros')

# Create your models here.
class Escuela(models.Model):
    nombre_escuela = models.CharField(max_length=100, blank=False, null=False, unique=True, default='')


class Especialidad(models.Model):
    nombre_especialidad = models.CharField(max_length=100, blank=False, null=False, unique=True, default='')
    id_escuela = models.ForeignKey(Escuela, on_delete=models.CASCADE, null=False, blank=False, default=1)


class Colegiado(models.Model):
    nombre = models.CharField(max_length=100, blank=False, null=False, default='')
    apellido_paterno = models.CharField(max_length=100, blank=False, null=False, default='')
    apellido_materno = models.CharField(max_length=100, blank=False, null=False, default='')
    celular = models.CharField(max_length=9, blank=False, null=False, validators=[validar_numero], default='')
    universidad = models.CharField(max_length=250, blank=False, null=False, default='')
    correo = models.EmailField(blank=False, null=False, default='')
    estado = models.BooleanField(blank=False, null=False, default=False)
    dni_colegiado = models.CharField(max_length=8, blank=False, null=False, validators=[validar_numero], default='')
    numero_colegiatura = models.CharField(max_length=250, blank=False, null=False, validators=[validar_numero], default='')
    foto_colegiado = models.ImageField(upload_to='foto_colegiados/', null=False, blank=False)
