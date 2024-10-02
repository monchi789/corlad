from rest_framework.permissions import BasePermission


class TarifaPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('tarifa.view_tarifa')
        if view.action == 'create':
            return request.user.has_perm('tarifa.add_tarifa')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('tarifa.change_tarifa')
        if view.action == 'destroy':
            return request.user.has_perm('tarifa.delete_tarifa')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
