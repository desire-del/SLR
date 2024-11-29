import cv2
import os


image_folder = 'chemin/vers/dossier_images'
output_video = 'output_video.avi'

# Obtenir la liste des images et les trier
images = [img for img in os.listdir(image_folder) if img.endswith((".png", ".jpg", ".jpeg"))]
images.sort()  # Tri pour respecter l'ordre

# Lire la première image pour obtenir les dimensions
first_image_path = os.path.join(image_folder, images[0])
frame = cv2.imread(first_image_path)
height, width, layers = frame.shape

# Définir le codec et initialiser l'objet VideoWriter
fourcc = cv2.VideoWriter_fourcc(*'XVID')  # Pour un fichier AVI
fps = 30  # Frames par seconde
video = cv2.VideoWriter(output_video, fourcc, fps, (width, height))

# Ajouter chaque image à la vidéo
for image in images:
    image_path = os.path.join(image_folder, image)
    frame = cv2.imread(image_path)
    video.write(frame)

# Libérer les ressources
video.release()
cv2.destroyAllWindows()

print(f"Vidéo créée avec succès : {output_video}")
