from rest_framework.permissions import BasePermission


class EscuelaPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('escuela.view_escuela')
        if view.action == 'create':
            return request.user.has_perm('escuela.add_escuela')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('escuela.change_escuela')
        if view.action == 'destroy':
            return request.user.has_perm('escuela.delete_escuela')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)