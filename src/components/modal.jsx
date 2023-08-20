import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, message }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <p className="modal-message">{message}</p><br/>
        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;