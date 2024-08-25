from django.contrib import admin
from .models import Colegiado, Escuela, Especialidad, HistorialEducativo, EstadoColegiatura

# Register your models here.
admin.site.register(Especialidad)
admin.site.register(Escuela)
admin.site.register(Colegiado)
admin.site.register(HistorialEducativo)
admin.site.register(EstadoColegiatura)
