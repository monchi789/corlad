from django.test import TestCase
from django.utils import timezone
from django.core.exceptions import ValidationError
from .models import Colegiado, EstadoCuenta, MetodoPago, Pago, TipoPago

# Create your tests here.
class EstadoCuentaTestCase(TestCase):
    def setUp(self):
        # Crear un colegiado para usar en las pruebas
        self.colegiado = Colegiado.objects.create(
            nombre='Juan', 
            apellido_paterno='Perez', 
            apellido_materno='Lopez', 
            celular='123456789',
            correo='juan.perez@example.com',
            dni_colegiado='12345678',
            numero_colegiatura='0001',
            numero_regulacion='0001',
            sexo_colegiado='M',
            fecha_nacimiento='1990-01-01',
            estado_civil='SOLTERO',
            direccion='Av. Siempre Viva 123'
        )

        # Crear tipos de pago y método de pago para usar en las pruebas
        self.tipo_pago = TipoPago.objects.create(nombre_tipo_pago='MATRICULA')
        self.metodo_pago = MetodoPago.objects.create(nombre_metodo_pago='EFECTIVO')

        # Crear un pago para el colegiado
        self.pago = Pago.objects.create(monto_pago=100.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago, id_metodo_pago=self.metodo_pago)

        # Verificar si ya existe un EstadoCuenta para este colegiado antes de crear uno nuevo
        if not EstadoCuenta.objects.filter(id_colegiado=self.colegiado).exists():
            self.estado_cuenta = EstadoCuenta.objects.create(id_colegiado=self.colegiado)
        else:
            self.estado_cuenta = EstadoCuenta.objects.get(id_colegiado=self.colegiado)

    def test_estado_cuenta_actualizar_saldo(self):
        # Prueba que el saldo del estado de cuenta se actualiza correctamente después de un pago
        self.estado_cuenta.actualizar_saldo()
        self.assertEqual(self.estado_cuenta.saldo, 100.0)
        self.assertEqual(self.estado_cuenta.fecha_actualizacion.date(), timezone.now().date())

    def test_estado_cuenta_str(self):
        # Prueba que la representación en cadena del estado de cuenta es la esperada
        self.assertEqual(str(self.estado_cuenta), '100.0 - Juan')

class MetodoPagoTestCase(TestCase):
    def setUp(self):
        # Crear un método de pago para usar en las pruebas
        self.metodo_pago = MetodoPago.objects.create(nombre_metodo_pago='EFECTIVO')

    def test_metodo_pago_str(self):
        # Prueba que la representación en cadena del método de pago es la esperada
        self.assertEqual(str(self.metodo_pago), 'EFECTIVO')

class TipoPagoTestCase(TestCase):
    def setUp(self):
        # Crear un tipo de pago para usar en las pruebas
        self.tipo_pago = TipoPago.objects.create(nombre_tipo_pago='MATRICULA')

    def test_tipo_pago_str(self):
        # Prueba que la representación en cadena del tipo de pago es la esperada
        self.assertEqual(str(self.tipo_pago), 'MATRICULA')

class PagoTestCase(TestCase):
    def setUp(self):
        # Crear un colegiado para usar en las pruebas
        self.colegiado = Colegiado.objects.create(
            nombre='Juan', 
            apellido_paterno='Perez', 
            apellido_materno='Lopez', 
            celular='123456789',
            correo='juan.perez@example.com',
            dni_colegiado='12345678',
            numero_colegiatura='0001',
            numero_regulacion='0001',
            sexo_colegiado='M',
            fecha_nacimiento='1990-01-01',
            estado_civil='SOLTERO',
            direccion='Av. Siempre Viva 123'
        )

        # Crear tipos de pago y método de pago para usar en las pruebas
        self.tipo_pago_matricula = TipoPago.objects.create(nombre_tipo_pago='MATRICULA')
        self.tipo_pago_mensualidad = TipoPago.objects.create(nombre_tipo_pago='MENSUALIDAD')
        self.metodo_pago = MetodoPago.objects.create(nombre_metodo_pago='EFECTIVO')

        # Crear un pago de matrícula para el colegiado
        self.pago_matricula = Pago.objects.create(monto_pago=100.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_matricula, id_metodo_pago=self.metodo_pago)

        # Verificar si ya existe un EstadoCuenta para este colegiado antes de crear uno nuevo
        if not EstadoCuenta.objects.filter(id_colegiado=self.colegiado).exists():
            self.estado_cuenta = EstadoCuenta.objects.create(id_colegiado=self.colegiado)
        else:
            self.estado_cuenta = EstadoCuenta.objects.get(id_colegiado=self.colegiado)

    def test_pago_clean(self):
        # Prueba que se levanta una excepción de validación si intentamos crear un segundo pago de matrícula para el mismo colegiado
        with self.assertRaises(ValidationError):
            Pago.objects.create(monto_pago=100.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_matricula, id_metodo_pago=self.metodo_pago)

    def test_pago_save(self):
        # Prueba que se puede guardar un pago de mensualidad y que se incrementa el contador de pagos
        pago_mensualidad = Pago(monto_pago=50.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_mensualidad, id_metodo_pago=self.metodo_pago)
        pago_mensualidad.save()
        self.assertEqual(Pago.objects.count(), 2)

    def test_pago_str(self):
        # Prueba que la representación en cadena del pago de matrícula es la esperada
        self.assertEqual(str(self.pago_matricula), '100.0 - Juan - EFECTIVO - MATRICULA')

    def test_actualizar_estado_cuenta_post_save(self):
        # Prueba que el estado de cuenta se actualiza correctamente después de guardar un pago de mensualidad
        pago_mensualidad = Pago.objects.create(monto_pago=50.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_mensualidad, id_metodo_pago=self.metodo_pago)
        estado_cuenta = EstadoCuenta.objects.get(id_colegiado=self.colegiado)
        self.assertEqual(estado_cuenta.saldo, 150.0)
