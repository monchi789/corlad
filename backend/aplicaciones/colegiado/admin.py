from django.contrib import admin
from .models import Colegiado, Escuela, Especialidad, HistorialEducativo

# Register your models here.
admin.site.register(Especialidad)
admin.site.register(Escuela)
admin.site.register(Colegiado)
admin.site.register(HistorialEducativo)
