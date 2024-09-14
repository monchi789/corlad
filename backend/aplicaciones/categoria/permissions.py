from rest_framework.permissions import BasePermission


class CategoriaPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('publicacion.view_categoria')
        if view.action == 'create':
            return request.user.has_perm('publicacion.add_categoria')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('publicacion.change_categoria')
        if view.action == 'destroy':
            return request.user.has_perm('publicacion.delete_categoria')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
