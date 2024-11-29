import React from 'react';
import { Link } from 'react-router-dom';

function Header({ webcamActive, onWebcamToggle, onVideoUpload }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Sign Language Translator <span className="beta-symbol">α</span></h1>
        <nav className="header-nav">
          <Link to="/about" className="about-link">About Us</Link>
        </nav>
      </div>
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