from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.conversation_views import ConversationViewSet
from api.views.message_views import MessageViewSet

router = DefaultRouter()
router.register(r'conversations', ConversationViewSet, basename='conversation')
router.register(r'messages', MessageViewSet, basename='message')

urlpatterns = [
    path('', include(router.urls)),
]