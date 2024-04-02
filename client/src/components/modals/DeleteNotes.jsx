import React from "react";
import ModalContainer from "./ModalContainer";
import { useDeleteNotesMutation } from "../../redux/api/notesApi";

const DeleteNotes = ({ id, head, onCancel }) => {
  const [deleteNotes] = useDeleteNotesMutation();
  const handleDeleteNote = () => {
    const fromData = {
      id: id,
    };
    deleteNotes(fromData);
    onCancel();
  };
  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        <div className="confirm-modal-header" style={{ color: "black" }}>
          Delete Notes
        </div>
        <p style={{ color: "black" }}>
          Are you sure you want to delete "{head}" notes?
        </p>
        <button
          style={{ color: "black", padding: "5px" }}
          onClick={handleDeleteNote}
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

export default DeleteNotes;
