import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-header">
          <h2>Details</h2>
          <button className="modal-close-icon" onClick={onClose}>
            &times; {/* Close icon */}
          </button>
        </div>
        <div className="modal-content">
          <p><strong>Question:</strong> {content.question}</p>
          <p><strong>Answer:</strong> {content.answer}</p>
        </div>
        {/* Close button at the bottom */}
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
