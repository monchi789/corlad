from rest_framework.permissions import BasePermission


class ColegiadoPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('colegiado.view_colegiado')
        if view.action == 'create':
            return request.user.has_perm('colegiado.add_colegiado')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('colegiado.change_colegiado')
        if view.action == 'destroy':
            return request.user.has_perm('colegiado.delete_colegiado')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)

