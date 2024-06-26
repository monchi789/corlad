"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings


schema_view = get_schema_view(
    openapi.Info(
        title="CORLAD API",
        default_version='v1',
        description="API para gestionar colegiados",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@colegiados.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('gestion-colegiados/', include('aplicaciones.colegiado.urls')),
    path('gestion-pagos/', include('aplicaciones.pago.urls')),
    path('gestion-publicaciones/', include('aplicaciones.publicacion.urls')),
    path('gestion-contenidos/', include('aplicaciones.contenido.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

# Servir imagenes staticas
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
