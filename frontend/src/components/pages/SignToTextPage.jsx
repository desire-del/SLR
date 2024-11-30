import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import LanguageSelector from '../LanguageSelector';
import VideoPlayer from '../VideoPlayer';
import TranslationBox from '../TranslationBox';

function SignToTextPage() {
    const [webcamActive, setWebcamActive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);  // Si un enregistrement est en cours
    const [videoBlob, setVideoBlob] = useState(null); // Contenu de la vidéo enregistrée
    const [sending, setSending] = useState(false); // Si l'envoi est en cours
    const [selectedLang, setSelectedLang] = useState('English'); // Langue sélectionnée
    const [translation, setTranslation] = useState(null); // Traduction reçue du backend
    const [errorTranslation, setErrorTranslation] = useState(''); // Erreur de traduction

    // Démarrer la webcam
    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            });
            setWebcamActive(true);
        } catch (err) {
            console.error('Erreur webcam:', err);
            setWebcamActive(false);
            setErrorTranslation('Impossible d’accéder à la webcam.'); // Message d'erreur si la webcam ne fonctionne pas
        }
    };

    // Arrêter la webcam
    const stopWebcam = () => setWebcamActive(false);

    // Enregistrer la vidéo
    const handleRecordClick = async () => {
        if (isRecording) {
            setIsRecording(false);
            stopWebcam();
        } else {
            setIsRecording(true);
            setErrorTranslation(''); // Réinitialiser le message d'erreur si l'enregistrement commence
            await startWebcam();
        }
    };

    // Fonction pour traiter les données vidéo
    const handleVideoData = (blob) => {
        setVideoBlob(blob);
    };

    // Envoyer la vidéo au backend
    const handleTranslateClick = async () => {
        if (!videoBlob || sending) return; // Si aucune vidéo n'a été enregistrée ou si l'envoi est déjà en cours

        setSending(true);
        setErrorTranslation(''); // Réinitialiser le message d'erreur avant d'essayer une nouvelle traduction
        try {
            const formData = new FormData();
            formData.append('video', videoBlob);

            const response = await fetch('http://127.0.0.1:8000/api/video-translation/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la traduction');
            }

            const data = await response.json();
            setTranslation(data.translation); // Mise à jour de la traduction
        } catch (error) {
            console.error('Erreur lors de l’envoi de la vidéo:', error);
            setErrorTranslation('Impossible de traduire'); // Message d'erreur en cas d'échec de la traduction
            setTranslation(''); // Réinitialiser la traduction
        } finally {
            setSending(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                {/* Partie gauche - Enregistrement vidéo */}
                <Col lg={6} md={12} className="d-flex flex-column align-items-center mb-4">
                    <div className="card shadow-sm w-100">
                        <div className="card-body d-flex flex-column align-items-center">
                            <div
                                className="position-relative w-100"
                                style={{
                                    height: '480px',
                                    backgroundColor: '#000',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <VideoPlayer
                                    webcamActive={webcamActive}
                                    isRecording={isRecording}
                                    onVideoData={handleVideoData}  // Passer la vidéo au parent
                                />
                            </div>

                            {/* Boutons de contrôle et message de traduction */}
                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <Button
                                    onClick={handleRecordClick}
                                    variant={isRecording ? 'danger' : 'success'}
                                    className="rounded-circle"
                                    style={{ width: '80px', height: '80px' }}
                                >
                                    {isRecording ? 'Stop' : 'Record'}
                                </Button>

                                {/* Bouton de traduction uniquement après l'arrêt de l'enregistrement */}
                                {!isRecording && videoBlob && !sending && (
                                    <Button
                                        onClick={handleTranslateClick}
                                        variant="primary"
                                        className="ms-3"
                                        disabled={sending || !videoBlob}
                                    >
                                        {sending ? 'Traduction en cours...' : 'Traduire'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>

                {/* Partie droite - Langue et Traduction */}
                <Col lg={6} md={12}>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <LanguageSelector
                                selectedLang={selectedLang}
                                setSelectedLang={setSelectedLang}
                            />
                            {/* Affichage de la traduction ou message d'erreur */}
                            <div className="mt-4">
                                <TranslationBox translation={translation || errorTranslation} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SignToTextPage;
