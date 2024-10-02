from rest_framework.permissions import BasePermission


class HistorialEducativoPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('historial_educativo.view_historialeducativo')
        if view.action == 'create':
            return request.user.has_perm('historial_educativo.add_historialeducativo')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('historial_educativo.change_historialeducativo')
        if view.action == 'destroy':
            return request.user.has_perm('historial_educativo.delete_historialeducativo')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
