from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_app.urls')),
    path('api/register/', include('signup_auth_app.urls'), name='signup_auth_app'),
    path('auth/', include('rest_framework.urls')),

    # react template entry point
    path('', TemplateView.as_view(template_name='index.html')),
    
    # authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
