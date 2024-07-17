from rest_framework.permissions import BasePermission

class EscuelaPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('colegiado.view_escuela')
        if view.action == 'create':
            return request.user.has_perm('colegiado.add_escuela')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('colegiado.change_escuela')
        if view.action == 'destroy':
            return request.user.has_perm('colegiado.delete_escuela')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)

class EspecialidadPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('colegiado.view_especialidad')
        if view.action == 'create':
            return request.user.has_perm('colegiado.add_especialidad')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('colegiado.change_especialidad')
        if view.action == 'destroy':
            return request.user.has_perm('colegiado.delete_especialidad')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)

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

class HistorialEducativoPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('colegiado.view_historialeducativo')
        if view.action == 'create':
            return request.user.has_perm('colegiado.add_historialeducativo')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('colegiado.change_historialeducativo')
        if view.action == 'destroy':
            return request.user.has_perm('colegiado.delete_historialeducativo')
        return False

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
