import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import { useSaveNotesMutation } from "../../../redux/api/notesApi";
import Icon from "../../ui/Icon";
import "./AddNotes.css"

const AddNotes = ({ onCancel }) => {
  const [formData, setFormData] = useState({ head: "", msg: "" });
  const [saveNotes] = useSaveNotesMutation();

  const inputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      saveNotes(formData);
      onCancel();
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        <div className="add-note-header">
          <div className='title-container'>
            <Icon
              className="notes-icon"
              name="notes-outline"
              size="6rem" />
            <span className='title'>Notes</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onCancel}
          />
        </div>
        <form onSubmit={submitHandler}>
          <div className="notes-heading">
            <input
              className="input-heading"
              type="text"
              name="head"
              placeholder="Notes Heading"
              onChange={inputHandler}
            />
          </div>
          <div className="notes-input">
            <textarea
              className="notes-input-box"
              type="texta"
              name="msg"
              onChange={inputHandler}
            />
          </div>
          <div className='save-button'>
            <button className="btn-outline" >
              <Icon
                name="save-outline"
                size="2rem"
              />
              Save
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>

  );
};

export default AddNotes;
