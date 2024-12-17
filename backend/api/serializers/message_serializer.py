from rest_framework import serializers
from api.models.message_models import Message
from api.models.conversation_models import Conversation

class MessageSerializer(serializers.ModelSerializer):
    conversation_id = serializers.PrimaryKeyRelatedField(
        queryset=Conversation.objects.all(), source='conversation'
    )

    class Meta:
        model = Message
        fields = ['id', 'message_text', 'is_bot', 'created_at', 'updated_at', 'conversation_id']