import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-content">
          <h2>Details</h2>
          <p>{content.question}</p>
          <p>{content.answer}</p>
        </div>
        {/* Close button at the bottom left */}
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
