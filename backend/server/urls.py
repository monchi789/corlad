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
from rest_framework_simplejwt.views import TokenRefreshView
from aplicaciones.emails.views import EmailAPIView
from helpers.token import CustomTokenObtainPairView


schema_view = get_schema_view(
    openapi.Info(
        title="CORLAD API",
        default_version='v1',
        description="API para gestionar colegiados"
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('categoria/', include('aplicaciones.categoria.urls')),
    path('colegiado/', include('aplicaciones.colegiado.urls')),
    path('escuela/', include('aplicaciones.escuela.urls')),
    path('especialidad/', include('aplicaciones.especialidad.urls')),
    path('historial-educativo/', include('aplicaciones.historial_educativo.urls')),
    path('metodo_pago/', include('aplicaciones.metodo_pago.urls')),
    path('pago/', include('aplicaciones.pago.urls')),
    path('pop-up/', include('aplicaciones.pop_up.urls')),
    path('publicacion/', include('aplicaciones.publicacion.urls')),
    path('slider/', include('aplicaciones.slider.urls')),
    path('tarifa/', include('aplicaciones.tarifa.urls')),
    path('deudas/', include('aplicaciones.deudas.urls')),
    path('enviar-email/', EmailAPIView.as_view(), name='send-email'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]

# Servir imagenes staticas
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
