from rest_framework.permissions import BasePermission

class PopUpPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('contenido.view_popup')
        if view.action == 'create':
            return request.user.has_perm('contenido.add_popup')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('contenido.change_popup')
        if view.action == 'destroy':
            return request.user.has_perm('contenido.delete_popup')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)


class SliderPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('contenido.view_slider')
        if view.action == 'create':
            return request.user.has_perm('contenido.add_slider')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('contenido.change_slider')
        if view.action == 'destroy':
            return request.user.has_perm('contenido.delete_slider')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
