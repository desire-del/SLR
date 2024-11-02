# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import base64
from io import BytesIO
from PIL import Image

@api_view(['POST'])
def receive_frame(request):
    try:
        # Get the image data and language from the request
        image_data = request.data.get('image')
        language = request.data.get('language')

        # Check if image_data is provided
        if not image_data:
            return Response({'error': 'No image data provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # Decode the base64 image
        image_data = image_data.split(',')[1]  # Remove the metadata part
        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes))

        # You can save the image or process it as needed
        # For example, save to a file
        #image.save(f"received_image.jpg")
        print(f"IMAGE RECEIVED :{image}")
        

        return Response({'message': 'Frame received successfully', 'language': language}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
