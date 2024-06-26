import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../redux/slice/userSlice";
import Alert from "../../ui/Alert";
import { useGetSectionMutation, useSaveSectionMutation } from "../../../redux/api/sectionApi";
import Icon from "../../ui/Icon";
import "./AddSection.css"
import { useNotifiySectionAddMutation } from "../../../redux/api/notificationApi";

const AddSection = ({ onCancel }) => {
  const [sectionData, setSectionData] = useState({
    name: null,
    start: null,
    due: null,
  });
  const [alertFlage, setAlertFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [saveSection] = useSaveSectionMutation();
  const [notifiySectionAdd]=useNotifiySectionAddMutation();
  const [getSections]=useGetSectionMutation();

  const { selectedProject: projectId } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setSectionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveSection = async() => {
    const { name, start, due } = sectionData;

    if (!name || !start || !due) {
      setAlertFlag(true);
      setErrorMsg("Enter all the Fields");
      dispatch(setAlert({ type: "error", msg: "Enter all the Fields" }));
      return;
    }

    if (start > due) {
      setAlertFlag(true);
      setErrorMsg("Due date must be greater than start Date");
      dispatch(
        setAlert({
          type: "error",
          msg: "Due date must be greater than start Date",
        })
      );
      return;
    }

    const fromData = {
      sectionName: name,
      projectId: projectId,
      startDate: start,
      dueDate: due,
    };
    await saveSection(fromData);
    getSections(projectId );
    notifiySectionAdd({projectId:projectId})
    onCancel();
  };

  const handleOnExit = () => {
    setErrorMsg(null);
    setAlertFlag(false);
  };
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal add-section-modal">
        <div className="add-section-header">
          <div className='title-container'>
            <Icon
              className="notes-icon"
              name="section-outline"
              size="6rem" 
              noCursor={true}
              />
            <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>Add Section</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onCancel}
            title="Close"
          />
        </div>
        <div className='section-input'>
          <div>
            <label htmlFor='section' style={{ color: "black", fontWeight: "bold" }}>Section :</label>
            <input
              type="text"
              name="name"
              onChange={inputHandler}
            />
          </div>
          <div>
            <label htmlFor='section' style={{ color: "black", fontWeight: "bold" }}>Addition date : </label>
            <input
              type="date"
              name="start"
              onChange={inputHandler}
              min={currentDate}
            />
          </div>
 
          <div>
            <label htmlFor='section' style={{ color: "black", fontWeight: "bold" }}>Due date : </label>
            <input
              type="date"
              name="due"
              onChange={inputHandler}
              min={sectionData.start}
            />
          </div>
          <div className='save-button'>
            <button className="btn-outline" onClick={handleSaveSection}>
              <Icon
                name="save-outline"
                size="2rem"
              />
              Save
            </button>
          </div>
        </div>
      </div>
      {alertFlage && (
        <Alert type={"error"} msg={errorMsg} onExit={handleOnExit} />
      )}
    </ModalContainer>
  );
};

export default AddSection;
