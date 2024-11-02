import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedLang, setSelectedLang] = useState('English');
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [sending, setSending] = useState(false);

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
      }
    } catch (err) {
      console.error("Erreur d'accès à la webcam:", err);
      setWebcamActive(false);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setWebcamActive(false);
    }
  };

  // Capture and send video frames to backend
  const sendFrameToBackend = async () => {
    if (!sending && videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas size equal to the video
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Draw the video frame on the canvas
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a base64 image
      const dataURL = canvas.toDataURL('image/jpeg');

      // Send the frame to the backend
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

  // Start sending frames at regular intervals
  useEffect(() => {
    let frameInterval;
    if (webcamActive) {
      frameInterval = setInterval(sendFrameToBackend, 1000); // Send frame every second
    }
    return () => clearInterval(frameInterval);
  }, [webcamActive]);

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
          <button className="action-button">Télécharger</button>
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
        <div className={`video-container ${webcamActive ? 'active' : ''}`}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="webcam-video"
          />
          {!webcamActive && (
            <div className="loading-message">
              Chargement de l'estimation de la pose...
            </div>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* Hidden canvas for capturing frames */}
        <div className="translation-box">
          <p className="translation-text">The translation will be paste here !!!!</p>
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
