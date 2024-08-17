from celery import shared_task
from django.utils import timezone
from .models import EstadoColegiatura

@shared_task
def actualizar_estados_colegiatura():
    estados_vencidos = EstadoColegiatura.objects.filter(
        fecha_final__lt=timezone.now().date(),
        estado_colegiatura=True
    )
    estados_vencidos.update(estado_colegiatura=False)
