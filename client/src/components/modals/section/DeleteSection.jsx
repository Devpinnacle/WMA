import React from "react";
import ModalContainer from "../ModalContainer";
import { useDeleteSectionMutation } from "../../../redux/api/sectionApi";
import Icon from "../../ui/Icon";
import "./DeleteSection.css"

const DeleteSection = ({ id, head, onCancel }) => {
  const [deleteSection] = useDeleteSectionMutation();

  const handleDeleteSection = () => {
    const fromData = {
      id: id,
    };
    deleteSection(fromData);
    onCancel();
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        {/* <div className="confirm-modal-header" style={{ color: "black" }}>
          Delete Section
        </div>
        <p style={{ color: "black" }}>
          Are you sure you want to delete "{head}" notes?
        </p>
        <button
          style={{ color: "black", padding: "5px" }}
          onClick={handleDeleteSection}
        >
          delete
        </button>
        <button style={{ color: "black", padding: "5px" }} onClick={onCancel}>
          Cancel
        </button> */}
        <div className="delete-section-header">
          <div className='title-container'>
            <Icon
              name="delete-outline"
              size="6rem" />
            <span className='delete-title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>Delete section</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onCancel}
          />
        </div>
        <div className="del-content">Are you sure you want to delete <span>"{head}"</span> section?</div>
        <div className="del-can-btn">
          <button
            className="btn-outline" 
            onClick={onCancel}>
            Cancel
          </button>
          <button 
          className="btn-del"
          onClick={handleDeleteSection}>
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

export default DeleteSection;
