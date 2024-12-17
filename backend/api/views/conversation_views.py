from rest_framework.viewsets import ModelViewSet
from api.models.conversation_models import Conversation
from api.serializers.conversation_serializers import ConversationSerializer

class ConversationViewSet(ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer