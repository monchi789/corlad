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

    SEXO = {
        'Masculino': 'M',
        'Femenimo': 'F',
        'Otro': 'O'
    }

    ESTADO_CIVIL = {
        'Casado': 'CASADO',
        'Soltero': 'SOLTERO'
    }

    nombre = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_paterno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    apellido_materno = models.CharField(max_length=100, blank=False, null=False, validators=[validar_espacio], default='')
    celular = models.CharField(max_length=9, blank=False, null=False, validators=[validar_numero, validar_espacio], default='')
    correo = models.EmailField(blank=False, null=False, validators=[EmailValidator], default='')
    estado = models.BooleanField(blank=False, null=False, default=False)
    foto_colegiado = models.ImageField(upload_to='foto_colegiados/', null=False, blank=False, default='')
    dni_colegiado = models.CharField(max_length=8, blank=False, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    numero_colegiatura = models.CharField(max_length=250, blank=False, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    numero_regulacion = models.CharField(max_length=250, blank=False, null=False, unique=True, validators=[validar_numero, validar_espacio], default='')
    fecha_colegiatura = models.DateField(null=False, blank=False, default=timezone.now)
    sexo_colegiado = models.CharField(choices=SEXO, null=False, blank=False, default=SEXO['Otro'])
    fecha_nacimiento = models.DateField(null=False, blank=False, default=timezone.now)
    estado_civil = models.CharField(null=False, blank=False, default=ESTADO_CIVIL['Soltero'])
    direccion = models.CharField(max_length=300, blank=False, null=False, default='')

    def __str__(self) -> str:
        return f'{self.nombre} - {self.apellido_paterno} - {self.numero_colegiatura} - {self.numero_regulacion} - {self.dni_colegiado}'


class HistorialEducativo(models.Model):
    universidad = models.CharField(max_length=250, blank=False, null=False, validators=[validar_espacio], default='')
    denominacion_bachiller = models.CharField(max_length=250, null=False, validators=[validar_espacio], default='')
    fecha_bachiller = models.DateField(null=False, blank=False, default=timezone.now)
    denominacion_titulo = models.CharField(max_length=250, null=False, blank=False, validators=[validar_espacio], default='')
    titulo_fecha = models.DateField(null=False, blank=False, default=timezone.now)
    id_colegiado = models.ForeignKey(Colegiado, on_delete=models.CASCADE, default=0)
    id_especialidad = models.ForeignKey(Especialidad, on_delete=models.CASCADE, default=0)

    def __str__(self) -> str:
        return f'{self.id_colegiado.nombre} - {self.id_colegiado.numero_colegiatura} - {self.id_colegiado.dni_colegiado} - {self.universidad} - {self.id_especialidad.id_escuela.nombre_escuela} - {self.id_especialidad.nombre_especialidad}'
