import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import { useSaveNotesMutation } from "../../redux/api/notesApi";

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
        <div className="confirm-modal-header" style={{ color: "black" }}>
          Add Notes
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="head"
            placeholder="Heading"
            style={{ color: "black", padding: "5px" }}
            onChange={inputHandler}
          />
          <input
            type="text"
            name="msg"
            placeholder="Message"
            style={{ color: "black", padding: "5px" }}
            onChange={inputHandler}
          />
          <button style={{ color: "black", padding: "5px" }}>Submit</button>
          <button style={{ color: "black", padding: "5px" }} onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </ModalContainer>
  );
};

export default AddNotes;
