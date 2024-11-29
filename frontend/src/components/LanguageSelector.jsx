import React from 'react';

function LanguageSelector({ selectedLang, onLanguageChange }) {
  const languages = ['English', 'Bambara', 'Arab', 'French'];

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button 
          key={lang}
          className={`language-button ${selectedLang === lang ? 'selected' : ''}`}
          onClick={() => onLanguageChange(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;