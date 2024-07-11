from django.test import TestCase
from django.utils import timezone
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from .models import Colegiado, EstadoCuenta, MetodoPago, Pago, TipoPago

# Create your tests here.
class EstadoCuentaTestCase(TestCase):
    def setUp(self):
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
        self.tipo_pago = TipoPago.objects.create(nombre_tipo_pago='MATRICULA')
        self.metodo_pago = MetodoPago.objects.create(nombre_metodo_pago='EFECTIVO')
        self.pago = Pago.objects.create(monto_pago=100.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago, id_metodo_pago=self.metodo_pago)
        # Verificar si ya existe un EstadoCuenta para este colegiado antes de crear uno nuevo
        if not EstadoCuenta.objects.filter(id_colegiado=self.colegiado).exists():
            self.estado_cuenta = EstadoCuenta.objects.create(id_colegiado=self.colegiado)
        else:
            self.estado_cuenta = EstadoCuenta.objects.get(id_colegiado=self.colegiado)

    def test_estado_cuenta_actualizar_saldo(self):
        self.estado_cuenta.actualizar_saldo()
        self.assertEqual(self.estado_cuenta.saldo, 100.0)
        self.assertEqual(self.estado_cuenta.fecha_actualizacion.date(), timezone.now().date())

    def test_estado_cuenta_str(self):
        self.assertEqual(str(self.estado_cuenta), '100.0 - Juan')

class MetodoPagoTestCase(TestCase):
    def setUp(self):
        self.metodo_pago = MetodoPago.objects.create(nombre_metodo_pago='EFECTIVO')

    def test_metodo_pago_str(self):
        self.assertEqual(str(self.metodo_pago), 'EFECTIVO')

class TipoPagoTestCase(TestCase):
    def setUp(self):
        self.tipo_pago = TipoPago.objects.create(nombre_tipo_pago='MATRICULA')

    def test_tipo_pago_str(self):
        self.assertEqual(str(self.tipo_pago), 'MATRICULA')

class PagoTestCase(TestCase):
    def setUp(self):
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
        self.tipo_pago_matricula = TipoPago.objects.create(nombre_tipo_pago='MATRICULA')
        self.tipo_pago_mensualidad = TipoPago.objects.create(nombre_tipo_pago='MENSUALIDAD')
        self.metodo_pago = MetodoPago.objects.create(nombre_metodo_pago='EFECTIVO')
        self.pago_matricula = Pago.objects.create(monto_pago=100.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_matricula, id_metodo_pago=self.metodo_pago)
        # Verificar si ya existe un EstadoCuenta para este colegiado antes de crear uno nuevo
        if not EstadoCuenta.objects.filter(id_colegiado=self.colegiado).exists():
            self.estado_cuenta = EstadoCuenta.objects.create(id_colegiado=self.colegiado)
        else:
            self.estado_cuenta = EstadoCuenta.objects.get(id_colegiado=self.colegiado)

    def test_pago_clean(self):
        with self.assertRaises(ValidationError):
            Pago.objects.create(monto_pago=100.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_matricula, id_metodo_pago=self.metodo_pago)

    def test_pago_save(self):
        pago_mensualidad = Pago(monto_pago=50.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_mensualidad, id_metodo_pago=self.metodo_pago)
        pago_mensualidad.save()
        self.assertEqual(Pago.objects.count(), 2)

    def test_pago_str(self):
        self.assertEqual(str(self.pago_matricula), '100.0 - Juan - EFECTIVO - MATRICULA')

    def test_actualizar_estado_cuenta_post_save(self):
        pago_mensualidad = Pago.objects.create(monto_pago=50.0, id_colegiado=self.colegiado, id_tipo_pago=self.tipo_pago_mensualidad, id_metodo_pago=self.metodo_pago)
        estado_cuenta = EstadoCuenta.objects.get(id_colegiado=self.colegiado)
        self.assertEqual(estado_cuenta.saldo, 150.0)
