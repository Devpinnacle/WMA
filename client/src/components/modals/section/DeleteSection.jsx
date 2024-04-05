import React from "react";
import ModalContainer from "../ModalContainer";
import { useDeleteSectionMutation } from "../../../redux/api/sectionApi";

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
        <div className="confirm-modal-header" style={{ color: "black" }}>
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
        </button>
      </div>
    </ModalContainer>
  );
};

export default DeleteSection;
