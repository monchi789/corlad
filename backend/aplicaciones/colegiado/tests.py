from django.test import TestCase
from django.utils import timezone
from .models import Escuela, Especialidad, Colegiado, HistorialEducativo

class EscuelaTestCase(TestCase):
    def setUp(self):
        Escuela.objects.create(nombre_escuela='Administracion')

    def test_escuela_nombre(self):
        '''Escuela tiene el nombre correcto'''
        administracion = Escuela.objects.get(nombre_escuela='Administracion')
        self.assertEqual(administracion.nombre_escuela, 'Administracion')


class EspecialidadTestCase(TestCase):
    def setUp(self):
        escuela = Escuela.objects.create(nombre_escuela='Administracion')
        Especialidad.objects.create(nombre_especialidad='Publica', id_escuela=escuela)
        Especialidad.objects.create(nombre_especialidad='Privada', id_escuela=escuela)

    def test_especialidad_publica(self):
        '''Especialidad Publica tiene el nombre correcto y está asociada a la escuela correcta'''
        publica = Especialidad.objects.get(nombre_especialidad='Publica')
        self.assertEqual(publica.nombre_especialidad, 'Publica')
        self.assertEqual(publica.id_escuela.nombre_escuela, 'Administracion')

    def test_especialidad_privada(self):
        '''Especialidad Privada tiene el nombre correcto y está asociada a la escuela correcta'''
        privada = Especialidad.objects.get(nombre_especialidad='Privada')
        self.assertEqual(privada.nombre_especialidad, 'Privada')
        self.assertEqual(privada.id_escuela.nombre_escuela, 'Administracion')


class ColegiadoTestCase(TestCase):
    def setUp(self):
        Colegiado.objects.create(
            nombre='Juan',
            apellido_paterno='Pérez',
            apellido_materno='González',
            celular='987654321',
            correo='juan.perez@example.com',
            estado=True,
            dni_colegiado='12345678',
            numero_colegiatura='0001',
            numero_regulacion='A001',
            fecha_colegiatura=timezone.now(),
            sexo_colegiado='M',
            fecha_nacimiento=timezone.now(),
            estado_civil='SOLTERO',
            direccion='Calle Falsa 123'
        )

    def test_colegiado_nombre(self):
        '''Colegiado tiene los datos correctos'''
        juan = Colegiado.objects.get(nombre='Juan')
        self.assertEqual(juan.nombre, 'Juan')
        self.assertEqual(juan.dni_colegiado, '12345678')


class HistorialEducativoTestCase(TestCase):
    def setUp(self):
        colegiado = Colegiado.objects.create(
            nombre='Juan',
            apellido_paterno='Pérez',
            apellido_materno='González',
            celular='987654321',
            correo='juan.perez@example.com',
            estado=True,
            dni_colegiado='12345678',
            numero_colegiatura='0001',
            numero_regulacion='A001',
            fecha_colegiatura=timezone.now(),
            sexo_colegiado='M',
            fecha_nacimiento=timezone.now(),
            estado_civil='SOLTERO',
            direccion='Calle Falsa 123'
        )
        escuela = Escuela.objects.create(nombre_escuela='Administracion')
        especialidad = Especialidad.objects.create(nombre_especialidad='Publica', id_escuela=escuela)
        HistorialEducativo.objects.create(
            universidad='Universidad Nacional',
            denominacion_bachiller='Bachiller en Ciencias',
            fecha_bachiller=timezone.now(),
            denominacion_titulo='Ingeniero',
            titulo_fecha=timezone.now(),
            id_colegiado=colegiado,
            id_especialidad=especialidad
        )

    def test_historial_educativo(self):
        '''Historial Educativo tiene los datos correctos'''
        historial = HistorialEducativo.objects.get(universidad='Universidad Nacional')
        self.assertEqual(historial.universidad, 'Universidad Nacional')
        self.assertEqual(historial.id_colegiado.nombre, 'Juan')
        self.assertEqual(historial.id_especialidad.nombre_especialidad, 'Publica')
