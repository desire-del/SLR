from django.urls import path
#from .views import receive_frame
from .views import VideoTranslationAPIView

urlpatterns = [
    #path('api/video-frame/', receive_frame, name='receive_frame'),
    path('api/video-translation/', VideoTranslationAPIView.as_view(), name='video-translation'),
]
