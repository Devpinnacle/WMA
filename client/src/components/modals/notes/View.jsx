import React from "react";
import ModalContainer from "../ModalContainer";
import "./ViewNote.css"
import Icon from "../../ui/Icon";

const View = ({ id, head, msg, onCancel, onDelete }) => {

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        <div className="view-note-header">
          <div className='title-container'>
            <Icon
              className="notes-icon"
              name="notes-outline"
              size="6rem" />
            <span className='view-title'>Notes</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onCancel}
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
          <div className="body-content">
            {msg}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default View;