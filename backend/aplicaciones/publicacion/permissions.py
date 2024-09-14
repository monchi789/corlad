from rest_framework.permissions import BasePermission


class PublicacionPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('publicacion.view_publicacion')
        if view.action == 'create':
            return request.user.has_perm('publicacion.add_publicacion')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('publicacion.change_publicacion')
        if view.action == 'destroy':
            return request.user.has_perm('publicacion.delete_publicacion')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)

