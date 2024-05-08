import React, { useEffect, useState } from "react";
import ModalContainer from "../ModalContainer";
import { useDeleteSectionMutation, useGetSectionMutation } from "../../../redux/api/sectionApi";
import Icon from "../../ui/Icon";
import "./DeleteSection.css"
import { useNotifiySectionDeleteMutation } from "../../../redux/api/notificationApi";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../redux/slice/userSlice";
import Alert from "../../ui/Alert";

const DeleteSection = ({ sec, onCancel }) => {
  const [deleteSection] = useDeleteSectionMutation();
  const [notifiySectionDelete,{error,data}]=useNotifiySectionDeleteMutation();
  const [getSections]=useGetSectionMutation();

  const { selectedProject } = useSelector((state) => state.project);

  const [alertFlag,setAlertFlag]=useState(false)

  useEffect(()=>{
    if (error){
      console.log(error)
      setAlertFlag(true)
    }
  },[error, data])

  const handleDeleteSection = async() => {
    const fromData = {
      id: sec._id,
    };
    await deleteSection(fromData);
    notifiySectionDelete({projectId:sec.projectId,sectionId:sec._id})
    getSections(selectedProject);
    onCancel();
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal delete-section-modal">
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
            color="black"
            onClick={onCancel}
          />
        </div>
        <div className="del-content">Are you sure you want to delete <span>"{sec.sectionName}"</span> section?</div>
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
      {alertFlag&&<Alert type={"error"} msg={error} onExit={()=>setAlertFlag(false)}/>}
    </ModalContainer>
  );
};

export default DeleteSection;
