from django.db import models
from django.core.validators import FileExtensionValidator


# Create your models here.
class PopUp(models.Model):
    imagen = models.ImageField(upload_to='popup/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    estado_popup = models.BooleanField(blank=True, null=False, default=False)

    def save(self, *args, **kwargs):
        if self.estado_popup:
            PopUp.objects.filter(estado_popup=True).update(estado_popup=False)
        super(PopUp, self).save(*args, **kwargs)

        if self.estado_popup:
            self.estado_popup = True
            super(PopUp, self).save(update_fields=['estado_popup'])

    def __str__(self) -> str:
        if self.estado_popup:
            return 'PopUp Activo'
        else:
            return 'PopUp No Activo'


class Slider(models.Model):
    imagen_1 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_2 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_3 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_4 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    estado_slider = models.BooleanField(blank=True, null=False, default=False)

    def __str__(self) -> str:
        if self.estado_slider:
            return 'Slider Activo'
        else:
            return 'Slider No activo'

    def save(self, *args, **kwargs):
        if self.estado_slider:
            Slider.objects.filter(estado_slider=True).update(estado_slider=False)
        super(Slider, self).save(*args, **kwargs)

        if self.estado_slider:
            self.estado_slider = True
            super(Slider, self).save(update_fields=['estado_slider'])
