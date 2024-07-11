from django.core.exceptions import ValidationError
from django.test import TestCase
from .models import PopUp, Slider

class PopUpModelTest(TestCase):

    def test_popup_limit(self):
        # Crear 5 popups
        for _ in range(5):
            PopUp.objects.create(estado_popup=False)
        
        # Intentar crear el sexto popup y verificar que levanta ValidationError
        with self.assertRaises(ValidationError):
            PopUp.objects.create(estado_popup=False)

    def test_single_active_popup(self):
        # Create and activate a PopUp
        popup1 = PopUp.objects.create(estado_popup=True)
        # Create and activate another PopUp
        popup2 = PopUp.objects.create(estado_popup=True)
        popup1.refresh_from_db()
        # Assert that the first PopUp is now inactive
        self.assertFalse(popup1.estado_popup)
        self.assertTrue(popup2.estado_popup)

class SliderModelTest(TestCase):

    def test_slider_limit(self):
        # Crear 5 sliders
        for _ in range(5):
            Slider.objects.create(estado_slider=False)
        
        # Intentar crear el sexto slider y verificar que levanta Validation Error
        with self.assertRaises(ValidationError):
            Slider.objects.create(estado_slider=False)

    def test_single_active_slider(self):
        # Create and activate a Slider
        slider1 = Slider.objects.create(estado_slider=True)
        # Create and activate another Slider
        slider2 = Slider.objects.create(estado_slider=True)
        slider1.refresh_from_db()
        # Assert that the first Slider is now inactive
        self.assertFalse(slider1.estado_slider)
        self.assertTrue(slider2.estado_slider)
