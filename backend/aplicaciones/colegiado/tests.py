from django.test import TestCase
from django.utils import timezone
from .models import Escuela, Especialidad, Colegiado, HistorialEducativo

# Pruebas unitarias para el modelo Escuela
class EscuelaTestCase(TestCase):
    def setUp(self):
        # Crea una instancia de Escuela con nombre 'Administracion' para las pruebas
        Escuela.objects.create(nombre_escuela='Administracion')

    def test_escuela_nombre(self):
        '''Prueba que el nombre de la Escuela sea correcto'''
        # Obtiene la instancia de Escuela creada en setUp y verifica su nombre
        administracion = Escuela.objects.get(nombre_escuela='Administracion')
        self.assertEqual(administracion.nombre_escuela, 'Administracion')


# Pruebas unitarias para el modelo Especialidad
class EspecialidadTestCase(TestCase):
    def setUp(self):
        # Crea una Escuela 'Administracion' y dos Especialidades asociadas
        escuela = Escuela.objects.create(nombre_escuela='Administracion')
        Especialidad.objects.create(nombre_especialidad='Publica', id_escuela=escuela)
        Especialidad.objects.create(nombre_especialidad='Privada', id_escuela=escuela)

    def test_especialidad_publica(self):
        '''Prueba que la Especialidad 'Publica' tenga el nombre correcto y esté asociada a la Escuela correcta'''
        publica = Especialidad.objects.get(nombre_especialidad='Publica')
        self.assertEqual(publica.nombre_especialidad, 'Publica')
        self.assertEqual(publica.id_escuela.nombre_escuela, 'Administracion')

    def test_especialidad_privada(self):
        '''Prueba que la Especialidad 'Privada' tenga el nombre correcto y esté asociada a la Escuela correcta'''
        privada = Especialidad.objects.get(nombre_especialidad='Privada')
        self.assertEqual(privada.nombre_especialidad, 'Privada')
        self.assertEqual(privada.id_escuela.nombre_escuela, 'Administracion')


# Pruebas unitarias para el modelo Colegiado
class ColegiadoTestCase(TestCase):
    def setUp(self):
        # Crea un Colegiado con datos específicos para las pruebas
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
        '''Prueba que los datos del Colegiado sean correctos'''
        juan = Colegiado.objects.get(nombre='Juan')
        self.assertEqual(juan.nombre, 'Juan')
        self.assertEqual(juan.dni_colegiado, '12345678')


# Pruebas unitarias para el modelo HistorialEducativo
class HistorialEducativoTestCase(TestCase):
    def setUp(self):
        # Crea un Colegiado, una Escuela, una Especialidad y un HistorialEducativo para las pruebas
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
        '''Prueba que los datos del Historial Educativo sean correctos'''
        historial = HistorialEducativo.objects.get(universidad='Universidad Nacional')
        self.assertEqual(historial.universidad, 'Universidad Nacional')
        self.assertEqual(historial.id_colegiado.nombre, 'Juan')
        self.assertEqual(historial.id_especialidad.nombre_especialidad, 'Publica')
