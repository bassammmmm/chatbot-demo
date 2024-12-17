from django.db import models
from api.common.base_models import BaseModel

class Conversation(BaseModel):
    title = models.CharField(max_length=200, blank=True, null=True)

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new and not self.title:
            self.title = f"Conversation {self.pk}"
            self.save()