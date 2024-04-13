import React, { useEffect, useState } from "react";
import ModalContainer from "../ModalContainer";
import SelectInput from "../../ui/SelectInput";
import { useGetSwUsersQuery } from "../../../redux/api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../../redux/slice/userSlice";
import "./AddTask.css";
import Alert from "../../ui/Alert";
import Icon from "../../ui/Icon";
import { useAddTaskMutation } from "../../../redux/api/taskApi";

const AddTask = ({ onCancel }) => {
  const { user, swUsers } = useSelector((state) => state.user);
  const { selectedSection: sec } = useSelector((state) => state.section);
  const dispatch = useDispatch();

  const [tag, setTag] = useState([]);
  const [alertFlage, setAlertFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [taskData, setTaskData] = useState({
    name: "",
    startDt: "",
    dueDt: "",
    notes: "",
    progress: null,
    time: null,
  });
  const [list, setList] = useState({
    priority: "",
    status: "",
    stages: "",
  });

  if (!(user.userGroupName == "Software")) useGetSwUsersQuery();
  const [addTask] = useAddTaskMutation();

  const tags = swUsers.map((user) => ({
    label: user.userName,
    value: user._id,
  }));

  const priorityTags = [
    { label: "High", value: "High" },
    { label: "Normal", value: "Normal" },
    { label: "Low", value: "Low" },
  ];
  const statusTags = [
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
    { label: "On Hold", value: "On Hold" },
    { label: "To Do", value: "To Do" },
  ];
  const stagesTags = [
    { label: "Analysis", value: "Analysis" },
    { label: "Development", value: "Development" },
    { label: "Verification", value: "Verification" },
    { label: "Amendment", value: "Amendment" },
    { label: "Testing", value: "Testing" },
    { label: "Re Testing", value: "Re Testing" },
  ];

  const handleTags = (e) => {
    if (!tag.some((t) => t.value === e.value)) {
      setTag((prevTag) => [...prevTag, { label: e.label, value: e.value }]);
    }
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg.value !== item.value));
  };

  const inputHandler = (e) => {

    setTaskData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const listHandleTags = (e, name) => {
    setList((prevState) => ({
      ...prevState,
      [name]: e.value,
    }));
  };

  const handleSave = () => {
    const { name, startDt, dueDt, progress, notes, time } = taskData;
    const { stages, status, priority } = list;
    const startDate = sec.startDate.substring(0, 10);
    const dueDate = sec.dueDate.substring(0, 10);
    const progressInt = progress ? parseInt(progress) : 0;
    let assignee = [];

    // Convert hours and minutes to numbers
    const [hours, minutes] = time ? time.split(":") : [0, 0];
    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesAsNumber = parseInt(minutes, 10);
    const totalMinutes = hoursInMinutes + minutesAsNumber;

    if (!name || !startDt || !dueDt || !priority || !stages || !status) {
      setAlertFlag(true);
      setErrorMsg("Enter all the necessary Fields");
      dispatch(
        setAlert({ type: "error", msg: "Enter all the necessary Fields" })
      );
      return;
    }

    if (!(user.userGroupName == "Software")) {
      if (tag.length === 0) {
        setAlertFlag(true);
        setErrorMsg("You have to assign the task to someone");
        dispatch(
          setAlert({
            type: "error",
            msg: "You have to assign the task to someone",
          })
        );
      } else {
        assignee = tag.map((tg) => tg.value);
      }
    } else {
      assignee.push(user._id);
    }

    if (startDt > dueDt) {
      setAlertFlag(true);
      setErrorMsg("Due date must be greater than start Date");
      dispatch(
        setAlert({
          type: "error",
          msg: "Due date must be greater than start Date",
        })
      );
    }

    if (startDt < startDate || dueDt > dueDate) {
      setAlertFlag(true);
      setErrorMsg(
        "Task start date and due date must be inside the range of Section's start date and due date"
      );
      dispatch(
        setAlert({
          type: "error",
          msg: "Task start date and due date must be inside the range of Section's start date and due date",
        })
      );
      return;
    }

    if (!(progressInt >= 0 && progressInt <= 100)) {
      setAlertFlag(true);
      setErrorMsg("Progress Should be in range of 0 to 100");
      dispatch(
        setAlert({
          type: "error",
          msg: "Progress Should be in range of 0 to 100",
        })
      );
      return;
    }

    if (
      (progressInt === 100 && status !== "Completed") ||
      (progressInt !== 100 && status === "Completed")
    ) {
      setAlertFlag(true);
      setErrorMsg("Progress and status is not matching");
      dispatch(
        setAlert({
          type: "error",
          msg: "Progress and status is not matching",
        })
      );
      return;
    }

    const fromData = {
      taskName: name,
      startDate: startDt,
      dueDate: dueDt,
      priority: priority,
      status: status,
      stage: stages,
      progress: progressInt,
      duration: totalMinutes,
      notes: notes,
      assignedTo: assignee,
      sectionId: sec._id,
      projectId: sec.projectId,
    };
    addTask(fromData);
    onCancel();
  };

  const handleOnExit = () => {
    setErrorMsg(null);
    setAlertFlag(false);
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal">
        {/* <h1 style={{ color: "black" }}>Add Task</h1>
        <input
          type="text"
          style={{ color: "black" }}
          name="name"
          onChange={inputHandler}
          value={taskData.name}
        />
        {!(user.userGroupName == "Software") && (
          <>
            <SelectInput
              placeholder="Tags"
              onChange={handleTags}
              isSearchable={false}
              options={tags}
            />
            <div className="selected-tag">
              {tag.map((tg, index) => (
                <div key={index} className="tag-container">
                  <p style={{ color: "black" }}>
                    {tg.label}
                    <button onClick={() => handleRemoveTag(tg)}>c</button>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        <input
          type="date"
          style={{ color: "black" }}
          placeholder=""
          
          name="startDt"
          onChange={inputHandler}
          value={taskData.startDt}
        />
        <input
          type="date"
          style={{ color: "black" }}
          placeholder="enddate"
          name="dueDt"
          onChange={inputHandler}
          value={taskData.dueDt}
        />
        <SelectInput
          placeholder="Priority"
          onChange={(e) => listHandleTags(e, "priority")}
          isSearchable={false}
          options={priorityTags}
        />
        <SelectInput
          placeholder="Status"
          onChange={(e) => listHandleTags(e, "status")}
          isSearchable={false}
          options={statusTags}
        />
        <SelectInput
          placeholder="Stages"
          onChange={(e) => listHandleTags(e, "stages")}
          isSearchable={false}
          options={stagesTags}
        />
        <input
          type="number"
          style={{ color: "black" }}
          placeholder="progress"
          name="progress"
          value={taskData.progress}
          onChange={inputHandler}
        />
        <input
          type="time"
          style={{ color: "black" }}
          placeholder="duration"
          name="time"
          onChange={inputHandler}
        />
        <input
          type="text"
          style={{ color: "black" }}
          placeholder="notes"
          name="notes"
          value={taskData.notes}
          onChange={inputHandler}
        />
        <button style={{ color: "black" }} onClick={handleSave}>
          save
        </button>
        <button style={{ color: "black" }} onClick={onCancel}>
          cancel
        </button> */}
        <div className="modal-header">
          <div className='title-container'>
            <Icon
              name="task-outline"
              size="6rem" />
            <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>Add task</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="6rem"
            onClick={onCancel}
          />
        </div>
        <div className="section-item-top">
          <div className="section-item-top-left">
            <Icon name="section-outline" size="2.5rem" />
            <span className="ml-2" style={{ fontSize: "16px" }}>
              Section name
            </span>
          </div>
        </div>
        <div style={{ padding: "1rem" }}>
          <label htmlFor='task' style={{ color: "black", fontWeight: "bold", marginRight: "8rem" }}>Task :</label>
          <input
            type="text"
            name="name"
            onChange={inputHandler}
            style={{ width: "25rem" }}
          />
        </div>
        <div className="assignee-details">
          <div className="select-box">
            <Icon
              name="employee-outline"
            />
            <SelectInput
              placeholder="Assignee"
              onChange={handleTags}
              isSearchable={false}
              options={tags}
            />
          </div>
          <div className="tag-container">

          </div>
        </div>
        <div className="task-details-input">
          <div className="date-box">
            <Icon
              name="calender-outline"
              size="2rem"
            />
            <input
              type="date"
            />
          </div>
        </div>
      </div>
      {/* {alertFlage && (
        <Alert type={"error"} msg={errorMsg} onExit={handleOnExit} />
      )} */}
    </ModalContainer>
  );
};

export default AddTask;
