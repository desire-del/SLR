import React from 'react';

function TranslationBox({ translation = "The translation will be displayed here !!!!" }) {
  return (
    <div className="translation-box">
      <p className="translation-text">{translation}</p>
      <div className="sign-icons">
        {/* Future implementation for sign language icons */}
      </div>
    </div>
  );
}

export default TranslationBox;