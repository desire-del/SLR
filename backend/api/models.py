from django.db import models

class VideoTranslation(models.Model):
    video = models.FileField(upload_to='videos/')
    translated_text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Translation for {self.language} - {self.created_at}'
