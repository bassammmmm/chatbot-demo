from django.db import models
from api.common.base_models import BaseModel
from api.models.conversation_models import Conversation

class Message(BaseModel):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    message_text = models.TextField()
    is_bot = models.BooleanField()