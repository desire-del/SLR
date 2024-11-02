from django.urls import path
from .views import receive_frame

urlpatterns = [
    path('api/video-frame/', receive_frame, name='receive_frame'),
]
