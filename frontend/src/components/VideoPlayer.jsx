import React, { useEffect, useRef } from 'react';

function VideoPlayer({ webcamActive, isRecording, onVideoData }) {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chunks = useRef([]);

    useEffect(() => {
        if (webcamActive && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;

                    // Initialisation de l'enregistreur
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorderRef.current = mediaRecorder;

                    mediaRecorder.ondataavailable = (event) => {
                        chunks.current.push(event.data);
                    };

                    mediaRecorder.onstop = () => {
                        const blob = new Blob(chunks.current, { type: 'video/webm' });
                        onVideoData(blob); // Passer la vidéo au parent
                    };

                    if (isRecording) {
                        mediaRecorder.start();
                    } else {
                        mediaRecorder.stop();
                    }
                })
                .catch(err => console.error('Erreur webcam dans VideoPlayer:', err));
        }

        // Nettoyage si la webcam est désactivée
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [webcamActive, isRecording, onVideoData]);

    return (
        <video ref={videoRef} autoPlay muted width="100%" height="100%" />
    );
}

export default VideoPlayer;
