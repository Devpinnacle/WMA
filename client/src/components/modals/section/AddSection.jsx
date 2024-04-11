import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../redux/slice/userSlice";
import Alert from "../../ui/Alert";
import { useSaveSectionMutation } from "../../../redux/api/sectionApi";
import Icon from "../../ui/Icon";
import "./AddSection.css"

const AddSection = ({ onCancel }) => {
  const [sectionData, setSectionData] = useState({
    name: null,
    start: null,
    due: null,
  });
  const [alertFlage, setAlertFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [saveSection] = useSaveSectionMutation();

  const { selectedProject: projectId } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setSectionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveSection = () => {
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
    saveSection(fromData);
    onCancel();
  };

  const handleOnExit = () => {
    setErrorMsg(null);
    setAlertFlag(false);
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        {/* <h1 style={{ color: "black" }}>Add Section</h1>
        <input
          type="text"
          name="name"
          onChange={inputHandler}
          placeholder="section name"
          style={{ color: "black", margin: "5px" }}
        />
        <input
          type="date"
          name="start"
          onChange={inputHandler}
          placeholder="start date"
          style={{ color: "black", margin: "5px" }}
        />
        <input
          type="date"
          name="due"
          onChange={inputHandler}
          placeholder="due date"
          style={{ color: "black", margin: "5px" }}
        />
        <button style={{ color: "black" }} onClick={handleSaveSection}>
          save
        </button> */}
        <div className="add-section-header">
          <div className='title-container'>
            <Icon
              className="notes-icon"
              name="notes-outline"
              size="6rem" />
            <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>Add Section</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onCancel}
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
            <label htmlFor='section' style={{ color: "black", fontWeight: "bold" }}>Due date : </label>
            <input
              type="date"
              name="due"
              onChange={inputHandler}
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
