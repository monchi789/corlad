from rest_framework.permissions import BasePermission

class DeudasPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('deudas.view_deudas')
        if view.action == 'create':
            return request.user.has_perm('deudas.add_deudas')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('deudas.change_deudas')
        if view.action == 'destroy':
            return request.user.has_perm('deudas.delete_deudas')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
