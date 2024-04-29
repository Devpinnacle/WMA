import React, { useEffect, useState } from "react";
import Icon from "../../ui/Icon";
import ModalContainer from "../ModalContainer";
import { dashedFormatDate } from "../../../Helper/helper";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../ui/Alert";
import { useAdjustTaskMutation } from "../../../redux/api/taskApi";
import { useEditSectionMutation, useGetSectionMutation } from "../../../redux/api/sectionApi";
import "./EditSection.css";
import { useNotifiySectionEditMutation } from "../../../redux/api/notificationApi";

const EditSection = ({ onCancel, sec }) => {
  const [sectionName, setSectionName] = useState(sec.sectionName);
  const [startDate, setStartDate] = useState(dashedFormatDate(sec.startDate));
  const [dueDate, setDueDate] = useState(dashedFormatDate(sec.dueDate));
  const [initialDistance, setInitialDistance] = useState(0);
  const [alertFlage, setAlertFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [adjustFlag, setAdjustFlag] = useState(true);
  const [madeChange, setMadeChange] = useState(false);
  const [initialDates, setInitialDates] = useState({
    start: sec.startDate,
    due: sec.dueDate,
  });

  const { selectedProject } = useSelector((state) => state.project);

  const [adjustTask] = useAdjustTaskMutation();
  const [editSection] = useEditSectionMutation();
  const [notifiySectionEdit]=useNotifiySectionEditMutation();
  const [getSections]=useGetSectionMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    const initialDistance = new Date(sec.dueDate) - new Date(sec.startDate);
    setInitialDistance(initialDistance);
  }, []);

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;

    // If new start date is greater than initial start date, adjust due date accordingly
    if (new Date(newStartDate) > new Date(startDate)) {
      const newDueDate = new Date(
        new Date(newStartDate).getTime() + initialDistance
      );
      setDueDate(dashedFormatDate(newDueDate));
    }

    if (new Date(initialDates.start) < new Date(newStartDate)) {
      setAdjustFlag(false);
    } else {
      setAdjustFlag(true);
    }

    setStartDate(newStartDate);
  };

  const handleDueDateChange = (e) => {
    const newDueDate = e.target.value;

    // Check if the new due date maintains the initial distance from the start date
    const newDistance = new Date(newDueDate) - new Date(startDate);
    if (newDistance >= initialDistance) {
      setDueDate(newDueDate);
      if (new Date(initialDates.due) > new Date(newDueDate)) {
        setAdjustFlag(false);
      } else {
        setAdjustFlag(true);
      }
    } else {
      // If the new due date would reduce the distance below the initial distance, don't update
      setAlertFlag(true);
      setErrorMsg(
        "Due date cannot be closer than initial distance from start date."
      );
      dispatch(
        setAlert({
          type: "error",
          msg: "Due date cannot be closer than initial distance from start date.",
        })
      );
    }
  };

  const handleOnExit = () => {
    setErrorMsg(null);
    setAlertFlag(false);
  };

  const handleSave = async() => {
    if (!sectionName || !startDate || !dueDate) {
      setAlertFlag(true);
      setErrorMsg("Enter allFields");
      dispatch(setAlert({ type: "error", msg: "Enter allFields" }));
      return;
    }
    const fromData = {
      id: sec._id,
      sectionName: sectionName,
      startDate: startDate,
      dueDate: dueDate,
    };
    await editSection(fromData);
    getSections(selectedProject );
    notifiySectionEdit({sectionId:sec._id,projectId:sec.projectId})
    onCancel();
  };

  const handleAdjust = () => {
    setInitialDates({ start: startDate, due: dueDate });
    setAdjustFlag(true);
    const fromData = {
      sectionId: sec._id,
      movedStartDt: startDate,
      initialStartDt: initialDates.start,
    };
    setMadeChange(true);
    adjustTask(fromData);
  };

  const onExit=()=>{
    if(madeChange){
      setAlertFlag(true);
      setErrorMsg(
        "Please save the Changes before Exiting."
      );
      dispatch(
        setAlert({
          type: "error",
          msg: "Please save the Changes before Exiting.",
        })
      );
    }
    else
    onCancel();
  }

  return (
    <ModalContainer onCancel={onExit} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal edit-section-modal">
        <div className="add-section-header">
          <div className="title-container">
            <Icon className="section-icon" name="notes-outline" size="6rem" />
            <span
              className="title"
              style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}
            >
              Edit Section
            </span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onExit}
          />
        </div>
        <div className="section-input">
          <div>
            <label
              htmlFor="section"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Section:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="section"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Addition date:{" "}
            </label>
            <input
              type="date"
              name="start"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label
              htmlFor="section"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Due date:{" "}
            </label>
            <input
              type="date"
              name="due"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </div>
          <div className="save-button">
            <button className="btn-outline" onClick={handleAdjust}>
              <Icon name="refresh-outline" size="2rem" />
              Adjust all tasks dates
            </button>
            {adjustFlag && (
              <button className="btn-outline" onClick={handleSave}>
                <Icon name="save-outline" size="2rem" />
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      {alertFlage && (
        <Alert type={"error"} msg={errorMsg} onExit={handleOnExit} />
      )}
    </ModalContainer>
  );
};

export default EditSection;
