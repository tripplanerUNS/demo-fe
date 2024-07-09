import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import "./transportmodal.css";

const TransportModal = ({ isOpen, onRequestClose, transportId }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Transport Modal"
      className="transport-modal"
      overlayClassName="transport-modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>
        <FaTimes />
      </button>
      <div className="transport-modal-content">
        <h2>Transport Details for ID: {transportId}</h2>
        {/* Add your transport details content here */}
      </div>
    </Modal>
  );
};

export default TransportModal;