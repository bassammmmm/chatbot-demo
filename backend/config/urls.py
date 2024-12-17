from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings

from django.conf.urls.static import static
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

import api.urls

schema_view = get_schema_view(
    openapi.Info(
        title="Chat App Demo API",
        default_version='v1',
        description="API documentation for Chat App demo",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api.urls)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
