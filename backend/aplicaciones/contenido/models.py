from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError


# Create your models here.
class PopUp(models.Model):
    imagen = models.ImageField(upload_to='popup/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    estado_popup = models.BooleanField(blank=True, null=False, default=False)

    def clean(self):
        # Limitamos hasta un máximo de 5 popups
        if not self.pk and PopUp.objects.count() >= 5:
            raise ValidationError('No se puede crear más de 5 PopUp.')

    def save(self, *args, **kwargs):
        self.full_clean()  # Ejecuta las validaciones personalizadas
        if self.estado_popup:
            PopUp.objects.filter(estado_popup=True).update(estado_popup=False)
        super(PopUp, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return 'PopUp Activo' if self.estado_popup else 'PopUp No Activo'


class Slider(models.Model):
    imagen_1 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_2 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_3 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_4 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    estado_slider = models.BooleanField(blank=True, null=False, default=False)

    def clean(self):
        # Limitamos hasta un maximo de 5 sliders
        if not self.pk and Slider.objects.count() >= 5:
            raise ValidationError('No se puede crear mas de 5 Sliders')

    def save(self, *args, **kwargs):
        self.full_clean() 
        if self.estado_slider:
            Slider.objects.filter(estado_slider=True).update(estado_slider=False)    
        super(Slider, self).save(*args, **kwargs)

    def __str__(self) -> str:
        if self.estado_slider:
            return 'Slider Activo'
        else:
            return 'Slider No activo'
        
