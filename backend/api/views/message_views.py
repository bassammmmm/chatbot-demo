from rest_framework.viewsets import ModelViewSet
from api.models.message_models import Message
from api.serializers.message_serializer import MessageSerializer

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer