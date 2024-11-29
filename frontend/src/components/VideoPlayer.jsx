import React, { useRef, useEffect } from 'react';

function VideoPlayer({ 
  webcamActive, 
  uploadedVideo, 
  onWebcamToggle, 
  onVideoUpload, 
  sendFrameToBackend 
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (webcamActive || uploadedVideo) {
      const interval = setInterval(sendFrameToBackend, 1000);
      return () => clearInterval(interval);
    }
  }, [webcamActive, uploadedVideo, sendFrameToBackend]);

  return (
    <div className={`video-container ${webcamActive || uploadedVideo ? 'active' : ''}`}>
      {(!webcamActive && !uploadedVideo) && (
        <div className="video-overlay">
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
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls={!webcamActive}
        className={`webcam-video ${webcamActive ? 'mirror' : ''}`}
        src={uploadedVideo}
        srcObject={videoRef.current?.srcObject}
      />
      {!webcamActive && !uploadedVideo && (
        <div className="loading-message">
          Chargement de l'estimation de la pose...
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default VideoPlayer;