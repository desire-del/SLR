import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import LanguageSelector from '../LanguageSelector';
import VideoPlayer from '../VideoPlayer';
import TranslationBox from '../TranslationBox';


function SignToTextPage(){

    const [selectedLang, setSelectedLang] = useState('English');
    const [webcamActive, setWebcamActive] = useState(false);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [sending, setSending] = useState(false);
    const [translation, setTranslation] = useState(null);

    // Webcam and Video Upload Handling
    const startWebcam = async () => {
        try {
        // Clear uploaded video if exists
        if (uploadedVideo) {
            setUploadedVideo(null);
        }

        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
            } 
        });
        
        setWebcamActive(true);
        return stream;
        } catch (err) {
        console.error("Webcam access error:", err);
        setWebcamActive(false);
        return null;
        }
    };

    const stopWebcam = () => {
        setWebcamActive(false);
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
        stopWebcam();
        const fileURL = URL.createObjectURL(file);
        setUploadedVideo(fileURL);
        }
    };

    // Frame Sending Logic
    const sendFrameToBackend = useCallback(async () => {
        if (!sending) {
        const videoElement = document.querySelector('video');
        const canvas = document.createElement('canvas');
        
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        
        const dataURL = canvas.toDataURL('image/jpeg');

        setSending(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/video-frame/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                image: dataURL, 
                language: selectedLang 
            }),
            });
            
            const data = await response.json();
            setTranslation(data.translation);
        } catch (error) {
            console.error("Error sending video frame:", error);
        } finally {
            setSending(false);
        }
        }
    }, [sending, selectedLang]);
    return (
        <div className="app-container">
            <LanguageSelector 
                selectedLang={selectedLang}
                onLanguageChange={setSelectedLang}
            />

            <main className="main-content">
                <VideoPlayer 
                webcamActive={webcamActive}
                uploadedVideo={uploadedVideo}
                onWebcamToggle={() => webcamActive ? stopWebcam() : startWebcam()}
                onVideoUpload={handleVideoUpload}
                sendFrameToBackend={sendFrameToBackend}
                />
                
                <TranslationBox translation={translation} />
            </main>
        </div>
    );
}
export default SignToTextPage;