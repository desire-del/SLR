import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Traduction Langage des Signes. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="/about" className="footer-link">À propos</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
