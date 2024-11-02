import React, { useEffect, useRef } from 'react';
import './VideoStream.css';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Remplacez par l'URL de votre serveur Django

function VideoStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    socket.on('video_stream', (data) => {
      if (videoRef.current) {
        videoRef.current.srcObject = data.stream; // Assurez-vous que le stream est correctement formaté
      }
    });

    return () => {
      socket.off('video_stream');
    };
  }, []);

  return (
    <div className="video-stream-container">
      <div className="video-container">
        <video ref={videoRef} autoPlay className="video" />
      </div>
      <div className="translation-container">
        <h3>Traduction</h3>
        <p className="translation-text">Votre traduction apparaîtra ici.</p>
      </div>
    </div>
  );
}

export default VideoStream;
