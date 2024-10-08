from django.db import models
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError


# Create your models here.
class PopUp(models.Model):
    imagen = models.ImageField(upload_to='popup/', blank=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'webp', 'png'])])
    estado_popup = models.BooleanField(blank=True, null=False, default=False)

    def clean(self):
        # Validación personalizada: Limitar el número máximo de PopUps a 5
        if not self.pk and PopUp.objects.count() >= 5:
            raise ValidationError('No se puede crear más de 5 PopUp.')

    def save(self, *args, **kwargs):
        self.full_clean()  # Ejecuta las validaciones personalizadas antes de guardar
        if self.estado_popup:
            # Si se activa este PopUp, desactiva todos los demás
            PopUp.objects.filter(estado_popup=True).update(estado_popup=False)
        super(PopUp, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return 'PopUp Activo' if self.estado_popup else 'PopUp No Activo'
