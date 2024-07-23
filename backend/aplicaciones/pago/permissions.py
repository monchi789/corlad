from rest_framework.permissions import BasePermission

class EstadoCuentaPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('pago.view_estadocuenta')
        if view.action == 'create':
            return request.user.has_perm('pago.add_estadocuenta')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('pago.change_estadocuenta')
        if view.action == 'destroy':
            return request.user.has_perm('pago.delete_estadocuenta')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)


class MetodoPagoPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('pago.view_metodopago')
        if view.action == 'create':
            return request.user.has_perm('pago.add_metodopago')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('pago.change_metodopago')
        if view.action == 'destroy':
            return request.user.has_perm('pago.delete_metodopago')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)


class TipoPagoPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('pago.view_tipopago')
        if view.action == 'create':
            return request.user.has_perm('pago.add_tipopago')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('pago.change_tipopago')
        if view.action == 'destroy':
            return request.user.has_perm('pago.delete_tipopago')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
    

class PagoPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('pago.view_pago')
        if view.action == 'create':
            return request.user.has_perm('pago.add_pago')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('pago.change_pago')
        if view.action == 'destroy':
            return request.user.has_perm('pago.delete_pago')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
