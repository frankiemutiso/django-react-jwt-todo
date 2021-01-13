from .models import Todo
from .serializers import TodoSerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied


class Owner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = (Owner, )

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return Todo.objects.filter(owner=user)

        raise PermissionDenied()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
