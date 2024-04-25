import React from "react";

const NotesView = ({ onCancel, head }) => {
  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal delete-task-modal">
        <p style={{color:"black"}}>{head}</p>
      </div>
    </ModalContainer>
  );
};

export default NotesView;
