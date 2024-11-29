import React from 'react';

function Header({ webcamActive, onWebcamToggle, onVideoUpload }) {
  return (
    <header className="header">
      <h1>Sign Language Translator <span className="beta-symbol">α</span></h1>
      <div className="actions">
        <button 
          className={`action-button ${webcamActive ? 'active' : ''}`}
          onClick={onWebcamToggle}
        >
          {webcamActive ? 'Arrêter' : 'Webcam'}
        </button>
        <label className="action-button">
          <input 
            type="file" 
            accept="video/*" 
            style={{ display: 'none' }}
            onChange={onVideoUpload}
          />
          Télécharger
        </label>
      </div>
    </header>
  );
}

export default Header;