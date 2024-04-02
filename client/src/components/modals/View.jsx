import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import DeleteNotes from "./DeleteNotes";

const View = ({ id, head, msg, onCancel,onDelete}) => {

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        <div className="confirm-modal-header" style={{ color: "black" }}>
          Notes
        </div>
        <h2 style={{ color: "black" }}>{head}</h2>
        <p style={{ color: "black" }}>
          {msg}
        </p>
        <button
          style={{ color: "black", padding: "5px" }}
          onClick={onDelete}
        >
          delete
        </button>
        <button style={{ color: "black", padding: "5px" }} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
};

export default View;
