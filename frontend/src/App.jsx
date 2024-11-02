import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedLang, setSelectedLang] = useState('English');
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef(null);

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
        {['English', 'Bambara','Arab', 'Weve', 'French'].map((lang) => (
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