from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Categoria, Publicacion
from django.utils import timezone

# Create your tests here.
class CategoriaTestCase(TestCase):
    '''Setup inicial para CategoriaTestCase'''
    def setUp(self):
        ''' Configura una categoría inicial para las pruebas '''
        self.categoria = Categoria.objects.create(nombre_categoria='Noticias')

    def test_categoria_nombre(self):
        '''Categoria tiene el nombre correcto'''
        self.assertEqual(self.categoria.nombre_categoria, 'Noticias')

    def test_categoria_str(self):
        '''__str__ de Categoria funciona correctamente'''
        self.assertEqual(str(self.categoria), 'Noticias')

    def test_categoria_nombre_unico(self):
        '''Categoria no puede tener nombres duplicados'''
        ''' Intenta crear una categoría con un nombre duplicado y verifica que se lance un ValidationError '''
        with self.assertRaises(ValidationError):
            categoria_duplicada = Categoria(nombre_categoria='Noticias')
            categoria_duplicada.full_clean()  # Verifica las validaciones
            categoria_duplicada.save()


class PublicacionTestCase(TestCase):
    '''Setup inicial para PublicacionTestCase'''
    def setUp(self):
        ''' Configura una categoría y una publicación inicial para las pruebas '''
        self.categoria = Categoria.objects.create(nombre_categoria='Noticias')
        self.publicacion = Publicacion.objects.create(
            titulo='Nueva Publicacion',
            contenido='Contenido de la publicacion',
            fecha_publicacion=timezone.now().date(),
            imagen_publicacion='ruta/a/la/imagen.jpg',
            documento=None,
            id_categoria=self.categoria
        )

    def test_publicacion_titulo(self):
        '''Publicacion tiene el titulo correcto'''
        self.assertEqual(self.publicacion.titulo, 'Nueva Publicacion')

    def test_publicacion_contenido(self):
        '''Publicacion tiene el contenido correcto'''
        self.assertEqual(self.publicacion.contenido, 'Contenido de la publicacion')

    def test_publicacion_fecha_publicacion(self):
        '''Publicacion tiene la fecha de publicacion correcta'''
        self.assertEqual(self.publicacion.fecha_publicacion, timezone.now().date())

    def test_publicacion_imagen(self):
        '''Publicacion tiene la ruta de imagen correcta'''
        self.assertEqual(self.publicacion.imagen_publicacion, 'ruta/a/la/imagen.jpg')

    def test_publicacion_documento(self):
        '''Publicacion permite campo documento nulo'''
        self.assertIsNone(self.publicacion.documento.name)

    def test_publicacion_categoria(self):
        '''Publicacion tiene la categoria correcta'''
        self.assertEqual(self.publicacion.id_categoria.nombre_categoria, 'Noticias')

    def test_publicacion_str(self):
        '''__str__ de Publicacion funciona correctamente'''
        self.assertEqual(str(self.publicacion), f'Nueva Publicacion - {timezone.now().date()} - Noticias')

    def test_publicacion_documento_extension_invalida(self):
        '''Publicacion no permite documentos con extensiones inválidas'''
        ''' Intenta crear una publicación con un documento de extensión no permitida y verifica que se lance un ValidationError '''
        with self.assertRaises(ValidationError):
            publicacion_con_documento_invalido = Publicacion(
                titulo='Publicacion con documento inválido',
                contenido='Contenido de la publicacion',
                fecha_publicacion=timezone.now().date(),
                imagen_publicacion='ruta/a/la/imagen.jpg',
                documento='documento_invalido.txt',  # Extensión no permitida
                id_categoria=self.categoria
            )
            publicacion_con_documento_invalido.full_clean()  # Verifica las validaciones
            publicacion_con_documento_invalido.save()

    def test_publicacion_documento_extension_valida(self):
        '''Publicacion permite documentos con extensiones válidas'''
        publicacion_con_documento_valido = Publicacion.objects.create(
            titulo='Publicacion con documento válido',
            contenido='Contenido de la publicacion',
            fecha_publicacion=timezone.now().date(),
            imagen_publicacion='ruta/a/la/imagen.jpg',
            documento='documento_valido.pdf',  # Extensión permitida
            id_categoria=self.categoria
        )
        ''' Verifica que la publicación con documento válido se haya creado correctamente '''
        self.assertEqual(publicacion_con_documento_valido.documento, 'documento_valido.pdf')
