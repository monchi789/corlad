from rest_framework.permissions import BasePermission


class MetodoPagoPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('metodo_pago.view_metodopago')
        if view.action == 'create':
            return request.user.has_perm('metodo_pago.add_metodopago')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('metodo_pago.change_metodopago')
        if view.action == 'destroy':
            return request.user.has_perm('metodo_pago.delete_metodopago')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
