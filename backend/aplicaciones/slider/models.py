from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError

class Slider(models.Model):
    imagen_1 = models.ImageField(upload_to='slider/', blank=True, null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_2 = models.ImageField(upload_to='slider/', blank=True, null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_3 = models.ImageField(upload_to='slider/', blank=True, null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_4 = models.ImageField(upload_to='slider/', blank=True, null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    estado_slider = models.BooleanField(blank=True, null=False, default=False)
    
    def clean(self):
        # Validación personalizada: Limitar el número máximo de Sliders a 5
        if not self.pk and Slider.objects.count() >= 5:
            raise ValidationError('No se puede crear más de 5 Sliders')

    def save(self, *args, **kwargs):
        self.full_clean()  # Ejecuta las validaciones personalizadas antes de guardar
        if self.estado_slider:
            # Si se activa este Slider, desactiva todos los demás
            Slider.objects.filter(estado_slider=True).update(estado_slider=False)
        super(Slider, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return 'Slider Activo' if self.estado_slider else 'Slider No activo'
