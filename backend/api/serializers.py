from rest_framework import serializers
from .models import VideoTranslation

class VideoTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoTranslation
        fields = ['video', 'translated_text']
