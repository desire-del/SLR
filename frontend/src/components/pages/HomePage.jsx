import React, { useState, useEffect } from 'react';
import '../css/Home.css';

// Importez vos images ici (remplacez par vos propres chemins d'image)
import image1 from '../../assets/Images/image1.jpg';
import image2 from '../../assets/Images/image2.jpg';


const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="home-page">
      <div className="image-slider">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        
        <div className="slider-dots">
          {images.map((_, index) => (
            <span 
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="home-content">
        <h1>Bienvenue sur Notre Site</h1>
        <p>Découvrez nos dernières actualités et nos offres exceptionnelles</p>
        <button className="cta-button">Commencer</button>
      </div>
    </div>
  );
};

export default HomePage;