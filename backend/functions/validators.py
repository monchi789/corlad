from django.core.exceptions import ValidationError

# Validadores
def validar_espacio(valor):
    if valor.strip() == '':
        raise ValidationError('El campo no puede estar vacio o tener solo espacios vacios.')


def validar_numero(valor):
    if not valor.isdigit():
        raise ValidationError('El campo solo debe contener numeros')
