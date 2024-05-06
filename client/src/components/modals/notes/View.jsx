import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import "./ViewNote.css"
import Icon from "../../ui/Icon";
import { useUpdateNotesMutation } from "../../../redux/api/notesApi";

const View = ({ id, head, msg, onCancel, onDelete }) => {
  const [message,setMessage]=useState(msg);
  const [updateNotes] = useUpdateNotesMutation();
  console.log(id)
  const onExit=()=>{
    if(msg!==message){
      const fromData={
        Id:id,
        msg:message
      }
      updateNotes(fromData);
      onCancel()
    }
    onCancel()
  }

  return (
    <ModalContainer onCancel={onExit} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal view-note-modal">
        <div className="modal-header">
          <div className='title-container'>
            <Icon
              className="notes-icon"
              name="notes-outline"
              size="6rem" />
            <span className='view-title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>Notes</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onExit}
          />
        </div>
        <div className="view-notes-body">
          <div className="body-header">
            <span style={{ color: "black", fontWeight: "bold", fontSize: "25px" }}>{head}</span>
            <Icon
              name="delete-outline"
              size="3rem"
              onClick={onDelete}
            />
          </div>
          <textarea className="body-content" value={message} onChange={(e)=>setMessage(e.target.value)} />
        </div>
      </div>
    </ModalContainer>
  );
};

export default View;
