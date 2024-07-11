from django.core.exceptions import ValidationError
from django.test import TestCase
from .models import PopUp, Slider

# Pruebas para el modelo PopUp
class PopUpModelTest(TestCase):

    def test_popup_limit(self):
        # Crear 5 popups
        for _ in range(5):
            PopUp.objects.create(estado_popup=False)
        
        # Intentar crear el sexto popup y verificar que levanta ValidationError
        with self.assertRaises(ValidationError):
            PopUp.objects.create(estado_popup=False)

    def test_single_active_popup(self):
        # Crear y activar un PopUp
        popup1 = PopUp.objects.create(estado_popup=True)
        # Crear y activar otro PopUp
        popup2 = PopUp.objects.create(estado_popup=True)
        popup1.refresh_from_db()
        # Asegurar que el primer PopUp está ahora inactivo
        self.assertFalse(popup1.estado_popup)
        self.assertTrue(popup2.estado_popup)

# Pruebas para el modelo Slider
class SliderModelTest(TestCase):

    def test_slider_limit(self):
        # Crear 5 sliders
        for _ in range(5):
            Slider.objects.create(estado_slider=False)
        
        # Intentar crear el sexto slider y verificar que levanta ValidationError
        with self.assertRaises(ValidationError):
            Slider.objects.create(estado_slider=False)

    def test_single_active_slider(self):
        # Crear y activar un Slider
        slider1 = Slider.objects.create(estado_slider=True)
        # Crear y activar otro Slider
        slider2 = Slider.objects.create(estado_slider=True)
        slider1.refresh_from_db()
        # Asegurar que el primer Slider está ahora inactivo
        self.assertFalse(slider1.estado_slider)
        self.assertTrue(slider2.estado_slider)
