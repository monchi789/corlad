from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from .models import Pago, Tarifa


class PagoAdminForm(forms.ModelForm):
    meses_pagados = forms.MultipleChoiceField(
        choices=Pago.MESES_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    class Meta:
        model = Pago
        fields = '__all__'

    def clean_meses_pagados(self):
        meses = self.cleaned_data.get('meses_pagados')
        if meses:
            return list(meses)  # Convertir a lista para almacenar en ArrayField
        return None

class PagoAdmin(admin.ModelAdmin):
    form = PagoAdminForm
    list_display = ('id_colegiado_nombre', 'fecha_pago', 'monto_total', 'get_meses_pagados')

    def id_colegiado_nombre(self, obj):
        return obj.id_colegiado.nombre  # Cambia 'nombre' por el campo que desees mostrar
    id_colegiado_nombre.short_description = 'Colegiado'

    list_filter = ('id_metodo_pago',)
    search_fields = ('id_colegiado__nombre', 'id_colegiado__numero_colegiatura')

    def get_meses_pagados(self, obj):
        if obj.meses_pagados:
            return ", ".join(dict(obj.MESES_CHOICES)[mes] for mes in obj.meses_pagados)
        return "No hay meses pagados"
    get_meses_pagados.short_description = 'Meses Pagados'

admin.site.register(Pago, PagoAdmin)
