import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, noClose, children }) => {
  if (!isOpen) return;
  return (
    <div className="modal-overlay" onClick={onclose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
