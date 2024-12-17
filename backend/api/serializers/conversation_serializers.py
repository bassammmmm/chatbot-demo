from rest_framework import serializers
from api.models.conversation_models import Conversation
from api.serializers.message_serializer import MessageSerializer

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Conversation
        fields = '__all__'