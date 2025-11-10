import React from 'react';
import './ResultModal.css';

const ResultModal = ({ onClose, imageSrc, title, message }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>

        <img src={imageSrc} alt="결과" className="modal-image" />

        <h2 className="modal-title">{title}</h2>
        
        <p className="modal-message">{message}</p>

      </div>
    </div>
  );
};

export default ResultModal;