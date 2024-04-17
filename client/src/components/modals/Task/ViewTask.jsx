import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import { useSelector, useDispatch } from "react-redux";
// import "./AddTask.css";
import "./ViewTask.css"
import {
  dashedFormatDate,
  formatDate,
  minutesToHoursAndMinutes,
} from "../../../Helper/helper";
import SelectInput from "../../ui/SelectInput";
import DurationWarn from "./DurationWarn";
import {
  useDeleteTaskMutation,
  useUpdateDailyTaskMutation,
  useUpdateNotesMutation,
  useUpdateTaskStgMutation,
} from "../../../redux/api/taskApi";
import { setAlert } from "../../../redux/slice/userSlice";
import Alert from "../../ui/Alert";
import Icon from "../../ui/Icon";
import SelectDate from "../../ui/SelectDate";

const ViewTask = ({ onCancel, task, section }) => {
  console.log("task...", task);

  const [updateTaskStg] = useUpdateTaskStgMutation();
  const [updateDailyTask] = useUpdateDailyTaskMutation();
  const [updateNotes] = useUpdateNotesMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [updates, setUpdates] = useState({
    progress: task.progress,
    duration: minutesToHoursAndMinutes(task.duration),
  });
  const [list, setList] = useState({
    priority: task.priority,
    status: task.status,
    stages: task.stage,
  });
  console.log("prior", list.priority);
  const [date, setDate] = useState({
    startDt: dashedFormatDate(task.assignedDate),
    dueDt: dashedFormatDate(task.dueDate),
  });
  console.log("date", date.startDt);
  const [notes, setNotes] = useState(task.notes);
  const [editFlag, setEditFlag] = useState(false);
  const [durationFlag, setDurationflag] = useState(false);
  const [funct, setFunct] = useState(null);
  const [alertFlage, setAlertFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const listHandleTags = (e, name) => {
    console.log("list", list);
    setList((prevState) => ({
      ...prevState,
      [name]: e.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdates({ ...updates, [name]: value });
  };

  const inputHandler = (e) => {
    setDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateTask = () => {
    const { startDt, dueDt } = date;
    const { stages, status, priority } = list;
    const startDate = section.startDate.substring(0, 10);
    const dueDate = section.dueDate.substring(0, 10);

    // Convert hours and minutes to numbers
    const [hours, minutes] = updates.duration
      ? updates.duration.split(":")
      : [0, 0];
    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesAsNumber = parseInt(minutes, 10);
    const totalMinutes = hoursInMinutes + minutesAsNumber;

    if (!startDt || !dueDt || !priority || !stages || !status) {
      setAlertFlag(true);
      setErrorMsg("Enter all the necessary Fields");
      dispatch(
        setAlert({ type: "error", msg: "Enter all the necessary Fields" })
      );
      return;
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

    if (
      !(parseInt(updates.progress) >= 0 && parseInt(updates.progress) <= 100)
    ) {
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
    console.log("section start due", startDate, dueDate);
    console.log("task start due", startDt, dueDt);

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

    if (parseInt(updates.progress) === 100 && status !== "Completed") {
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
    if (
      (totalMinutes === 0 && parseInt(updates.progress) !== 0) ||
      (status === "Completed" && totalMinutes === 0)
    ) {
      setDurationflag(true);
      setFunct(handleSaveTaskStg);
    } else {
      handleSaveTaskStg();
    }
  };

  const handleSaveTaskStg = () => {
    const { startDt, dueDt } = date;
    const { stages, status, priority } = list;

    // Convert hours and minutes to numbers
    const [hours, minutes] = updates.duration
      ? updates.duration.split(":")
      : [0, 0];
    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesAsNumber = parseInt(minutes, 10);
    const totalMinutes = hoursInMinutes + minutesAsNumber;

    const fromData = {
      taskid: task._id,
      startDate: startDt,
      dueDate: dueDt,
      priority: priority,
      status: status,
      stage: stages,
      progress: updates.progress ? parseInt(updates.progress) : 0,
      duration: totalMinutes,
      notes: notes,
      sectionId: section._id
    };
    updateTaskStg(fromData);
    setEditFlag(false);
  };

  const handleDailyUpdate = () => {
    // Convert hours and minutes to numbers
    const [hours, minutes] = updates.duration
      ? updates.duration.split(":")
      : [0, 0];
    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesAsNumber = parseInt(minutes, 10);
    const totalMinutes = hoursInMinutes + minutesAsNumber;

    if (
      !(parseInt(updates.progress) >= 0 && parseInt(updates.progress) <= 100)
    ) {
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

    if (parseInt(updates.progress) !== 100 && list.status === "Completed") {
      setAlertFlag(true);
      setErrorMsg("Please change the status first");
      dispatch(
        setAlert({
          type: "error",
          msg: "Please change the status first",
        })
      );
      return;
    }

    if (totalMinutes === 0 && parseInt(updates.progress) !== 0) {
      setDurationflag(true);
      setFunct(handleSaveTaskUpd);
    } else {
      handleSaveTaskUpd();
    }
  };

  const handleSaveTaskUpd = () => {
    // Convert hours and minutes to numbers
    const [hours, minutes] = updates.duration
      ? updates.duration.split(":")
      : [0, 0];
    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesAsNumber = parseInt(minutes, 10);
    const totalMinutes = hoursInMinutes + minutesAsNumber;

    const fromData = {
      id: task._id,
      progress: updates.progress ? parseInt(updates.progress) : 0,
      duration: totalMinutes,
      sectionId: section._id
    };

    updateDailyTask(fromData);
  };

  const handleNo = () => {
    setDurationflag(false);
    setFunct(null);
  };

  const handleOnExit = () => {
    setErrorMsg(null);
    setAlertFlag(false);
  };

  const handleNotes = () => {
    const fromData = {
      id: task._id,
      notes: notes,
    };
    updateNotes(fromData);
  };

  const handleDelete = () => {
    const fromData = {
      id: task._id,
      secId: task.sectionId._id
    };
    deleteTask(fromData);
    onCancel();
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="modal-container modal-centered user-modal view-task-modal" style={{ width: "1287px" }}>
        {/* <h1 style={{ color: "black" }}>{task.projectId.sctProjectName}</h1>
        <div className="progress-container">
          <h2 style={{ width: "100%", background: "black", flexGrow: 1 }}>
            {task.sectionId.sectionName}
            {task.sectionId.progress}%
          </h2>
        </div>
        <div style={{ marginTop: "20px", background: "rgb(255, 255, 102)" }}>
          <h3 style={{ background: "orange" }}>
            {task.taskName}
            {task.progress}%
          </h3>
          <p style={{ color: "black" }}>
            createdBy:
            <b style={{ color: "black" }}>
              {user._id === task.createdBy._id
                ? `You`
                : task.createdBy.userName}
            </b>
            {editFlag ? (
              <>
                {` `}Ta Date:
                <input
                  type="date"
                  style={{ color: "black" }}
                  value={date.startDt}
                  name="startDt"
                  onChange={inputHandler}
                />
                {` `}Td Date:
                <input
                  type="date"
                  style={{ color: "black" }}
                  value={date.dueDt}
                  name="dueDt"
                  onChange={inputHandler}
                />
                {` `}priority:
                <SelectInput
                  placeholder="Priority"
                  onChange={(e) => listHandleTags(e, "priority")}
                  isSearchable={false}
                  options={priorityTags}
                  value={{ label: list.priority, value: list.priority }}
                />
                {` `}status:
                <SelectInput
                  placeholder="Status"
                  onChange={(e) => listHandleTags(e, "status")}
                  isSearchable={false}
                  options={statusTags}
                  value={{ label: list.status, value: list.status }}
                />
                {` `}stages:
                <SelectInput
                  placeholder="Stages"
                  onChange={(e) => listHandleTags(e, "stages")}
                  isSearchable={false}
                  options={stagesTags}
                  value={{ label: list.stages, value: list.stages }}
                />
                <button style={{ color: "black" }} onClick={handleUpdateTask}>
                  save
                </button>
              </>
            ) : (
              <>
                {` `}Ta Date:
                <b style={{ color: "black" }}>
                  {formatDate(task.assignedDate)}
                </b>
                {` `}Td Date:
                <b style={{ color: "black" }}>{formatDate(task.dueDate)}</b>
                {` `}priority:<b style={{ color: "black" }}>{task.priority}</b>
                {` `}status:<b style={{ color: "black" }}>{task.status}</b>
                {` `}stages:<b style={{ color: "black" }}>{task.stage}</b>
                {` `}
                {user._id === task.createdBy._id&&<button style={{ color: "black" }} onClick={handleDelete}>
                  delete
                </button>}
                {` `}
                <button
                  style={{ color: "black" }}
                  onClick={() => setEditFlag(true)}
                >
                  edit
                </button>
              </>
            )}
          </p>
        </div>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <h3 style={{ color: "black" }}>
            Progress:
            <input
              type="number"
              name="progress"
              value={updates.progress}
              style={{ color: "black" }}
              onChange={handleInputChange}
            />
            %
          </h3>

          <h3 style={{ color: "black" }}>
            Duration:
            <input
              type="time"
              name="duration"
              value={updates.duration}
              style={{ color: "black" }}
              onChange={handleInputChange}
            />
            Hrs
          </h3>
          <button style={{ color: "black" }} onClick={handleDailyUpdate}>
            save
          </button>
        </div>
        <h1 style={{ color: "black" }}>Notes</h1>
        <input
          type="textarea"
          style={{ color: "black" }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button style={{ color: "black" }} onClick={handleNotes}>
          save
        </button> */}

        <div className="modal-header">
          <div className='title-container'>
            <Icon
              name="project-outline"
              size="56px" />
            <span className='title' style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}>{task.projectId.sctProjectName}</span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="56px"
            onClick={onCancel}
          />
        </div>
        <div className="section-item-top">
          <div className="section-item-top-left">
            <Icon name="section-outline" size="2.5rem" />
            <span className="ml-2" style={{ fontSize: "22px", fontWeight: "400" }}>
              {task.sectionId.sectionName}
            </span>
          </div>
          <div className="section-item-top-right" style={{ fontSize: "22px", fontWeight: "400" }} >
            <div className="section-progress">{task.sectionId.progress}%</div>
          </div>
        </div>
        <div className="task-container">
          <div className="view-task-header">
            <span>{task.taskName}</span>
            <span>
              {task.progress}%

            </span>
          </div>
          {editFlag ? (
            <>
              <div className="employee-assigned">
                <Icon
                  name="employee-outline"
                  size="24px"
                />
                <span style={{ color: "black" }}>
                  {user._id === task.createdBy._id
                    ? `You`
                    : task.createdBy.userName}</span>
              </div>
              <div className="view-task-body">
                <div className="ta-td-date">
                  <span>TA Date :</span>
                  <div className="date-box m-0">
                    <Icon
                      name="calender-outline"
                      size="24px"
                    />
                    <input
                      type="date"
                      style={{ color: "black" }}
                      value={date.startDt}
                      name="startDt"
                      onChange={inputHandler}
                    />
                  </div>
                  {/* <span>{formatDate(task.assignedDate)}</span> */}
                </div>
                <div className="ta-td-date">
                  <span>TD Date :</span>
                  <div className="date-box m-0">
                    <Icon
                      name="calender-outline"
                      size="24px"
                    />
                    <input
                      type="date"
                      style={{ color: "black" }}
                      value={date.dueDt}
                      name="dueDt"
                      onChange={inputHandler}
                    />
                  </div>
                  {/* <span>{formatDate(task.dueDate)}</span> */}
                </div>
                <div className="priority-info">
                  <div className="select-box mb-3" >
                    <Icon
                      name="priority-outline"
                      size="2rem"
                    />
                    <SelectInput
                      placeholder="Priority"
                      onChange={(e) => listHandleTags(e, "priority")}
                      isSearchable={false}
                      options={priorityTags}
                      noBorder={true}
                      value={{ label: list.priority, value: list.priority }}
                    />
                  </div>
                </div>
                <div className="status-info">
                  <div className="select-box mb-3">
                    <Icon
                      name="status-outline"
                      size="2rem"
                    />
                    <SelectInput
                      placeholder="Status"
                      onChange={(e) => listHandleTags(e, "status")}
                      isSearchable={false}
                      options={statusTags}
                      noBorder={true}
                      value={{ label: list.status, value: list.status }}
                    />

                  </div>
                </div>
                <div className="stage-info">
                  <div className="select-box mb-3">
                    <Icon
                      name="stage-outline"
                      size="2rem"
                    />
                    <SelectInput
                      placeholder="Stages"
                      onChange={(e) => listHandleTags(e, "stages")}
                      isSearchable={false}
                      options={stagesTags}
                      noBorder={true}
                      value={{ label: list.stages, value: list.stages }}
                    />
                  </div>
                </div>
                <Icon
                  name="checkmark-outline"
                  size="24px"
                  onClick={handleUpdateTask}
                />
              </div>
            </>
          ) : (
            <div className="view-task-body">
              <div className="employee-info">
                <Icon
                  name="employee-outline"
                  size="24px"
                />
                <span>
                  {user._id === task.createdBy._id
                    ? `You`
                    : task.createdBy.userName}</span>
              </div>
              <div className="ta-td-date">
                <span>TA Date :</span>
                <Icon
                  name="calender-outline"
                  size="24px"
                />
                <span>{formatDate(task.assignedDate)}</span>
              </div>
              <div className="ta-td-date">
                <span>TD Date :</span>
                <Icon
                  name="calender-outline"
                  size="24px"
                />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              <div className="priority-info">
                <Icon
                  name="priority-outline"
                  size="24px"
                />
                <span>{task.priority}</span>
              </div>
              <div className="status-info">
                <Icon
                  name="status-outline"
                  size="24px"
                />
                <span>{task.status}</span>
              </div>
              <div className="stage-info">
                <Icon
                  name="stage-outline"
                  size="24px"
                />
                <span>{task.stage}</span>
              </div>
              <div className="del-edit-btn">
                <div className="del-btn">
                  <Icon
                    name="delete-outline"
                    size="24px"
                  />
                </div>
                <Icon
                  name="edit-outline"
                  size="24px"
                  onClick={() => setEditFlag(true)}
                />
              </div>
            </div>
          )}
        </div>


        <div className="progress-duration-details">
          <div className="progress-duration">
            <Icon name="progress-outline"
              size="2rem" />
            <label htmlFor='progress' style={{ color: "black", fontWeight: "bold", margin: "1rem" }}>Progress :</label>
            <input
              type="number"
              id="progress"
              style={{ color: "black" }}
              name="progress"
              onChange={inputHandler}
            />
            <span style={{ color: "black", fontWeight: "bold", margin: "1rem" }}>%</span>
          </div>
          <div className="progress-duration">
            <Icon name="duration-outline"
              size="2rem"
            />
            <label htmlFor='duration' style={{ color: "black", fontWeight: "bold", margin: "1rem" }}>Duration :</label>
            <input
              type="time"
              style={{ color: "black", }}
              name="time"
              id="duration"
              placeholder="aa"
              onChange={inputHandler}
            />
            <span style={{ color: "black", fontWeight: "bold", margin: "1rem" }}>hrs</span>
            <div style={{ padding: "1rem" }}>
              <Icon name="checkmark-outline"
                size="2rem"
                onClick={handleNotes}
              />
            </div>
          </div>
        </div>
        <div className="task-note-container">
          <div className="task-note">
            <Icon
              name="task-note-outline"
              size="2rem"
            />
            <span style={{ color: "black", fontSize: "22px", marginLeft: "8px", fontWeight: "500" }}>Notes</span>
          </div>

        </div>
        <input
          type="text"
          name="notes"
          id="task-note"
          className="note"
          placeholder="Add Instruction"
          onChange={inputHandler}
          style={{color:"black"}}
        />
        <div className='save-button'>
          {user._id === task.createdBy._id &&
            <button className="btn-outline" onClick={handleDelete}>
              <Icon
                name="save-outline"
                size="2rem"
              />
              Save
            </button>
          }
        </div>
        <div className="updates-container">
          <div className="update-header">
            <Icon
              name="info-outline"
              size="24px"
            />
            <span>Updates</span>
          </div>
          <div className="update-body">
            <div className="update-content">
              <span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>Rakshith </span>
                <span style={{ color: "black" }}>updated the progress to</span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>20%</span>
              </span>
              <div className="date-time">
                <span style={{ color: "black" }}>dd-mm-yyyy hh:mm am</span>
              </div>
            </div>

            <div className="update-content">
              <span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>Sathya </span>
                <span style={{ color: "black" }}>edited the due date to</span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>dd-mm-yyyy</span>
              </span>
              <div className="date-time">
                <span style={{ color: "black" }}>dd-mm-yyyy hh:mm am</span>
              </div>
            </div>
            <div className="update-content">
              <span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>Sathya </span>
                <span style={{ color: "black" }}>edited the priority to</span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>low</span>
              </span>
              <div className="date-time">
                <span style={{ color: "black" }}>dd-mm-yyyy hh:mm am</span>
              </div>
            </div>
            <div className="update-content">
              <span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>Sathya </span>
                <span style={{ color: "black" }}>edited the priority to</span>
                <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", marginLeft: "8px" }}>low</span>
              </span>
              <div className="date-time">
                <span style={{ color: "black" }}>dd-mm-yyyy hh:mm am</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {durationFlag && (
        <DurationWarn head={task.taskName} yes={funct} no={handleNo} />
      )}
      {alertFlage && (
        <Alert type={"error"} msg={errorMsg} onExit={handleOnExit} />
      )}

    </ModalContainer>
  );
};

export default ViewTask;
