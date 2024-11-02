import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedLang, setSelectedLang] = useState('English');
  const [webcamActive, setWebcamActive] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [sending, setSending] = useState(false);

  // Fonction pour démarrer la webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setWebcamActive(true);
        setUploadedVideo(null); // Désactive la vidéo téléchargée si la webcam est active
      }
    } catch (err) {
      console.error("Erreur d'accès à la webcam:", err);
      setWebcamActive(false);
    }
  };

  // Fonction pour arrêter la webcam
  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setWebcamActive(false);
    }
  };

  // Fonction pour gérer le téléchargement de la vidéo
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUploadedVideo(fileURL);
      setWebcamActive(false); // Arrête la webcam si une vidéo est téléchargée
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Efface le flux de la webcam
        videoRef.current.src = fileURL; // Définit la vidéo téléchargée comme source
      }
    }
  };

  // Fonction pour capturer et envoyer les frames au backend
  const sendFrameToBackend = async () => {
    if (!sending && videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Définir la taille du canvas en fonction de la vidéo
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Dessiner la frame vidéo sur le canvas
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convertir le contenu du canvas en image base64
      const dataURL = canvas.toDataURL('image/jpeg');

      // Envoyer la frame au backend
      setSending(true);
      try {
        await fetch('http://127.0.0.1:8000/api/video-frame/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: dataURL, language: selectedLang }),
        });
      } catch (error) {
        console.error("Erreur lors de l'envoi de la vidéo au serveur:", error);
      } finally {
        setSending(false);
      }
    }
  };

  // Début de l'envoi des frames à intervalles réguliers
  useEffect(() => {
    let frameInterval;
    if (webcamActive || uploadedVideo) {
      frameInterval = setInterval(sendFrameToBackend, 1000); // Envoie une frame toutes les secondes
    }
    return () => clearInterval(frameInterval);
  }, [webcamActive, uploadedVideo]);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Sign Language Translator <span className="beta-symbol">α</span></h1>
        <div className="actions">
          <button 
            className={`action-button ${webcamActive ? 'active' : ''}`}
            onClick={() => webcamActive ? stopWebcam() : startWebcam()}
          >
            {webcamActive ? 'Arrêter' : 'Webcam'}
          </button>
          <label className="action-button">
            <input 
              type="file" 
              accept="video/*" 
              style={{ display: 'none' }}
              onChange={handleVideoUpload}
            />
            Télécharger
          </label>
        </div>
      </header>
      
      <div className="language-selector">
        {['English', 'Bambara', 'Arab', 'E', 'French'].map((lang) => (
          <button 
            key={lang}
            className={`language-button ${selectedLang === lang ? 'selected' : ''}`}
            onClick={() => setSelectedLang(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      <main className="main-content">
        <div className={`video-container ${webcamActive || uploadedVideo ? 'active' : ''}`}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            controls={!webcamActive} // Affiche les contrôles seulement pour la vidéo téléchargée
            className="webcam-video"
          />
          {!webcamActive && !uploadedVideo && (
            <div className="loading-message">
              Chargement de l'estimation de la pose...
            </div>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* Canvas caché pour capturer les frames */}
        <div className="translation-box">
          <p className="translation-text">The translation will be displayed here !!!!</p>
          <div className="sign-icons">
            {/* Les icônes de signes peuvent être ajoutées ici */}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Envoyer des commentaires</p>
      </footer>
    </div>
  );
}

export default App;
