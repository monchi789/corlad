from django.contrib import admin
from .models import EstadoCuenta, Pago, MetodoPago, TipoPago


# Register your models here.
admin.site.register(EstadoCuenta)
admin.site.register(Pago)
admin.site.register(MetodoPago)
admin.site.register(TipoPago)
