from rest_framework.permissions import BasePermission


class EspecialidadPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('especialidad.view_especialidad')
        if view.action == 'create':
            return request.user.has_perm('especialidad.add_especialidad')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('especialidad.change_especialidad')
        if view.action == 'destroy':
            return request.user.has_perm('especialidad.delete_especialidad')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
