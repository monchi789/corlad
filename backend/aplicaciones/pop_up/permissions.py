from rest_framework.permissions import BasePermission

class PopUpPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.has_perm('pop_up.view_popup')
        if view.action == 'create':
            return request.user.has_perm('pop_up.add_popup')
        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('pop_up.change_popup')
        if view.action == 'destroy':
            return request.user.has_perm('pop_up.delete_popup')
        return False
    
    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)
