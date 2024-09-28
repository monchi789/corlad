from rest_framework.permissions import BasePermission


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
