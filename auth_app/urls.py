from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


todo_list = views.TodoViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

todo_detail = views.TodoViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    path('todos/', todo_list, name='todo-list'),
    path('todos/<int:pk>/', todo_detail, name='todo-detail')
]
