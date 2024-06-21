from django.contrib import admin
from .models import Colegiado, Escuela, Especialidad

# Register your models here.
admin.site.register(Especialidad)
admin.site.register(Escuela)
admin.site.register(Colegiado)
