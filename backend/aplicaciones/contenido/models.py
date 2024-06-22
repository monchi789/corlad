from django.db import models
from django.core.validators import FileExtensionValidator


# Create your models here.
class PopUp(models.Model):
    imagen = models.ImageField(upload_to='popup/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])


class Slider(models.Model):
    imagen_1 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_2 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_3 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    imagen_4 = models.ImageField(upload_to='slider/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])    
