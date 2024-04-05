import React from "react";
import ModalContainer from "../ModalContainer";
import { useDeleteNotesMutation } from "../../../redux/api/notesApi";
import Icon from "../../ui/Icon";
import "./DeleteNote.css"

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
        <div className="delete-note-header">
          <div className='title-container'>
            <Icon
              name="delete-outline"
              size="6rem" />
            <span className='delete-title'>Delete notes</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onCancel}
          />
        </div>
        <div className="del-content">Are you sure you want to delete <span>"{head}"</span> notes?</div>
        <div className="del-can-btn">
          <button
            className="btn-outline" 
            onClick={onCancel}>
            Cancel
          </button>
          <button 
          className="btn-del"
          onClick={handleDeleteNote}>
            <Icon
              name="delete-outline"
              size="2rem"
            />
            Delete
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeleteNotes;
