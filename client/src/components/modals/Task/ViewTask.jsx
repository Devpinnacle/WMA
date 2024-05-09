import React, { useEffect, useState } from "react";
import ModalContainer from "../ModalContainer";
import { useSelector, useDispatch } from "react-redux";
import "./ViewTask.css";
import {
  dashedFormatDate,
  formatDate,
  minutesToHoursAndMinutes,
} from "../../../Helper/helper";
import SelectInput from "../../ui/SelectInput";
import DurationWarn from "./DurationWarn";
import {
  useDeleteTaskMutation,
  useGetSelectedTaskMutation,
  useUpdateDailyTaskMutation,
  useUpdateNotesMutation,
  useUpdateTaskStgMutation,
} from "../../../redux/api/taskApi";
import { setAlert } from "../../../redux/slice/userSlice";
import Alert from "../../ui/Alert";
import Icon from "../../ui/Icon";
import SelectDate from "../../ui/SelectDate";
import {
  useNotifiyTaskDeleteMutation,
  useNotifiyTaskEditMutation,
  useNotifiyTaskNotesMutation,
  useNotifiyTaskProgressMutation,
} from "../../../redux/api/notificationApi";
import DeleteTask from "./DeleteTask";
import {
  useGetTaskNotificationQuery,
  useNotifiyAssignDateMutation,
  useNotifiyDueDateMutation,
  useNotifiyPriorityMutation,
  useNotifiyProgressAddMutation,
  useNotifiyStagesMutation,
  useNotifiyStatusMutation,
} from "../../../redux/api/taskNotificationApi";
import io from "socket.io-client";
import { getTaskNotifications } from "../../../redux/slice/taskNotificationSlice";
import { useGetSectionMutation } from "../../../redux/api/sectionApi";
import { dueDateTextColor, setSectionDueColor } from "../../../util";

const ViewTask = ({ onCancel, taskId, section }) => {
  const [getSelectedTask] = useGetSelectedTaskMutation();

  const { user } = useSelector((state) => state.user);
  const { taskNotifications } = useSelector((state) => state.taskNotifications);
  const { selectedTask: task } = useSelector((state) => state.task);
  const { selectedProject } = useSelector((state) => state.project);
  const { selectedSection: sec1 } = useSelector((state) => state.section);
  const sec = typeof sec1 === "string" ? JSON.parse(sec1) : sec1;

  const [updateTaskStg] = useUpdateTaskStgMutation();
  const [updateDailyTask] = useUpdateDailyTaskMutation();
  const [updateNotes] = useUpdateNotesMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [notifiyTaskEdit] = useNotifiyTaskEditMutation();
  const [notifiyTaskProgress] = useNotifiyTaskProgressMutation();
  const [notifiyTaskNotes] = useNotifiyTaskNotesMutation();
  const [notifiyTaskDelete] = useNotifiyTaskDeleteMutation();
  const [notifiyProgressAdd] = useNotifiyProgressAddMutation();
  const [notifiyAssignDate] = useNotifiyAssignDateMutation();
  const [notifiyDueDate] = useNotifiyDueDateMutation();
  const [notifiyStatus] = useNotifiyStatusMutation();
  const [notifiyPriority] = useNotifiyPriorityMutation();
  const [notifiyStages] = useNotifiyStagesMutation();
  const [getSections] = useGetSectionMutation();

  const { data } = useGetTaskNotificationQuery(taskId);

  const [updates, setUpdates] = useState({
    progress: task.progress,
    duration: minutesToHoursAndMinutes(task.duration),
  });
  const [list, setList] = useState({
    priority: task.priority,
    status: task.status,
    stages: task.stage,
  });
  const [date, setDate] = useState({
    startDt: dashedFormatDate(task.assignedDate),
    dueDt: dashedFormatDate(task.dueDate),
  });
  const [notes, setNotes] = useState(task.notes);
  const [editFlag, setEditFlag] = useState(false);
  const [durationFlag, setDurationflag] = useState(false);
  const [funct, setFunct] = useState(null);
  const [alertFlage, setAlertFlag] = useState(false);
  const [deleteFlage, setDeleteFlag] = useState(false);
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

  const dispatch = useDispatch();

  const socket = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    socket.on("taskNotifications", (data) => {
      dispatch(getTaskNotifications(data));
    });
    return () => socket?.off("N");
  }, []);

  const listHandleTags = (e, name) => {
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
      return;
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
    handleSaveTaskStg();
  };

  const handleSaveTaskStg = async () => {
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
      sectionId: section._id,
    };
    await updateTaskStg(fromData);
    getSections(selectedProject);
    if (user.userGroupName === "Software") {
      notifiyTaskEdit({ sectionId: section._id, projectId: section.projectId });
    } else {
      notifiyTaskEdit({
        sectionId: section._id,
        projectId: section.projectId,
        Id: task.assignedTo._id,
      });
    }
    if (startDt.toString() !== dashedFormatDate(task.assignedDate)) {
      notifiyAssignDate({ taskId: task._id, newData: startDt.toString() });
    }
    if (dueDt.toString() !== dashedFormatDate(task.dueDate)) {
      notifiyDueDate({ taskId: task._id, newData: dueDt.toString() });
    }
    if (priority !== task.priority) {
      notifiyPriority({ taskId: task._id, newData: priority });
    }
    if (status !== task.status) {
      notifiyStatus({ taskId: task._id, newData: status });
    }
    if (stages !== task.stage) {
      notifiyStages({ taskId: task._id, newData: stages });
    }
    if (parseInt(updates.progress) !== task.progress) {
      notifiyProgressAdd({
        taskId: task._id,
        newData: updates.progress ? parseInt(updates.progress) : 0,
      });
    }
    getSelectedTask(task._id);
    setEditFlag(false);
    setDurationflag(false);
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
    handleSaveTaskUpd();
  };

  const handleSaveTaskUpd = async () => {
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
      sectionId: section._id,
    };

    await updateDailyTask(fromData);
    getSections(selectedProject);
    if (user.userGroupName === "Software") {
      notifiyTaskProgress({
        sectionId: section._id,
        projectId: section.projectId,
      });
    } else {
      notifiyTaskProgress({
        sectionId: section._id,
        projectId: section.projectId,
        Id: task.assignedTo._id,
      });
    }
    if (task.progress !== updates.progress)
      notifiyProgressAdd({
        taskId: task._id,
        newData: updates.progress ? parseInt(updates.progress) : 0,
      });
    getSelectedTask(task._id);
    setDurationflag(false);
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
    if (task.notes !== notes) {
      updateNotes(fromData);
      if (user.userGroupName === "Software") {
        notifiyTaskNotes({
          sectionId: section._id,
          projectId: section.projectId,
        });
      } else {
        notifiyTaskNotes({
          sectionId: section._id,
          projectId: section.projectId,
          Id: task.assignedTo._id,
        });
      }
    }
  };

  const handleDelete = async () => {
    const fromData = {
      id: task._id,
      secId: task.sectionId._id,
    };
    await deleteTask(fromData);
    getSections(selectedProject);
    if (user.userGroupName === "Software") {
      notifiyTaskDelete({
        sectionId: section._id,
        projectId: section.projectId,
      });
    } else {
      notifiyTaskDelete({
        sectionId: section._id,
        projectId: section.projectId,
        Id: task.assignedTo._id,
      });
    }
    setDeleteFlag(false);
    onCancel();
  };
  const getPriorityColor = (priority, dueDate, status) => {
    if (status !== "Completed") {
      if (new Date().setHours(0, 0, 0, 0) > new Date(dueDate)) {
        return "#FF4848";
      } else {
        switch (priority) {
          case "High":
            return "#EDB1A1";
          case "Low":
            return "#F3CF96";
          case "On Hold":
            return "#B7B7B7";
          default:
            return "#AACBBA";
        }
      }
    } else {
      switch (priority) {
        case "High":
          return "#EDB1A1";
        case "Low":
          return "#F3CF96";
        case "On Hold":
          return "#B7B7B7";
        default:
          return "#AACBBA";
      }
    }
  };
  const getPriorityBodyColor = (priority) => {
    switch (priority) {
      case "High":
        return "#F9E3DD";
      case "Low":
        return "#FBEFDA";
      case "On Hold":
        return "#FBEFDA";
      default:
        return "#DCEAE3";
    }
  };

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div
        className="modal-container modal-centered user-modal view-task-modal"
        style={{ width: "1287px" }}
      >
        <div className="modal-header">
          <div className="title-container">
            <Icon name="project-outline" size="56px" />
            <span
              className="title"
              style={{ color: "#3D405B", fontWeight: "700", fontSize: "57px" }}
            >
              {task.projectId.sctProjectName}
            </span>
          </div>
          <Icon
            className="close-icon"
            name="close"
            size="56px"
            onClick={onCancel}
          />
        </div>
        <div className="section-item-top"  style={{
            backgroundColor: setSectionDueColor(
              sec.dueDate,
              sec.progress,
              sec.totalTask
            ),
          }}>
          <div className="section-item-top-left">
            <Icon name="section-outline" size="2.5rem" />
            <span
              className="ml-2"
              style={{ fontSize: "22px", fontWeight: "400" }}
            >
              {task.sectionId.sectionName}
            </span>
          </div>
          <div
            className="section-item-top-right"
            style={{ fontSize: "22px", fontWeight: "400" }}
          >
            <div className="section-progress">{task.sectionId.progress}%</div>
          </div>
        </div>
        <div
          className="task-container"
          style={{
            backgroundColor: getPriorityBodyColor(task.priority),
            borderColor: getPriorityBodyColor(task.priority),
          }}
        >
          <div
            className="view-task-header"
            style={{
              backgroundColor: getPriorityColor(
                task.priority,
                task.dueDate,
                task.status
              ),
              borderColor: getPriorityColor(
                task.priority,
                task.dueDate,
                task.status
              ),
            }}
          >
            <span
              style={{ color: dueDateTextColor(task.dueDate, task.status) }}
            >
              {task.taskName}
            </span>
            <span style={{ color: dueDateTextColor(task.dueDate, task.status) }}>{task.progress}%</span>
          </div>
          {editFlag ? (
            <>
              <div className="employee-assigned">
                <Icon name="employee-outline" size="24px" />
                <span style={{ color: "black" }}>
                  {user._id === task.createdBy._id
                    ? `You`
                    : task.createdBy.userName}
                </span>
              </div>
              <div className="view-task-body">
                <div className="ta-td-date">
                  <span>TA Date :</span>
                  <div className="date-box m-0">
                    <Icon name="calender-outline" size="24px" />
                    <input
                      type="date"
                      style={{ color: "black" }}
                      value={date.startDt}
                      name="startDt"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="ta-td-date">
                  <span
                    style={{
                      color: date.dueDt > new Date() ? "#FF4848" : "black",
                    }}
                  >
                    TD Date :
                  </span>
                  <div className="date-box m-0">
                    <Icon name="calender-outline" size="24px" />
                    <input
                      type="date"
                      value={date.dueDt}
                      name="dueDt"
                      onChange={inputHandler}
                      style={{
                        color: date.dueDt > new Date() ? "#FF4848" : "black",
                      }}
                    />
                  </div>
                </div>
                <div className="priority-info">
                  <div className="select-box mb-3">
                    <Icon name="priority-outline" size="2rem" />
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
                    <Icon name="status-outline" size="2rem" />
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
                    <Icon name="stage-outline" size="2rem" />
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
                <Icon name="employee-outline" size="24px" />
                <span>
                  {user._id === task.createdBy._id
                    ? `You`
                    : task.createdBy.userName}
                </span>
              </div>
              <div className="ta-td-date">
                <span>TA Date :</span>
                <Icon name="calender-outline" size="24px" />
                <span>{formatDate(task.assignedDate)}</span>
              </div>
              <div className="ta-td-date">
                <span>TD Date :</span>
                <Icon name="calender-outline" size="24px" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
              <div className="priority-info">
                <Icon name="priority-outline" size="24px" />
                <span>{task.priority}</span>
              </div>
              <div className="status-info">
                <Icon name="status-outline" size="24px" />
                <span>{task.status}</span>
              </div>
              <div className="stage-info">
                <Icon name="stage-outline" size="24px" />
                <span>{task.stage}</span>
              </div>
              <div className="del-edit-btn">
                {(user._id === task.createdBy._id ||
                  user.userGroupName !== "Software") && (
                  <div className="del-btn">
                    <Icon
                      name="delete-outline"
                      size="24px"
                      onClick={() => setDeleteFlag(true)}
                    />
                  </div>
                )}
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
            <Icon name="progress-outline" size="2rem" />
            <label
              htmlFor="progress"
              style={{ color: "black", fontWeight: "bold", margin: "1rem" }}
            >
              Progress :
            </label>
            <input
              type="number"
              id="progress"
              style={{ color: "black" }}
              value={updates.progress}
              name="progress"
              onChange={handleInputChange}
            />
            <span
              style={{ color: "black", fontWeight: "bold", margin: "1rem" }}
            >
              %
            </span>
          </div>
          <div className="progress-duration">
            <Icon name="duration-outline" size="2rem" />
            <label
              htmlFor="duration"
              style={{ color: "black", fontWeight: "bold", margin: "1rem" }}
            >
              Duration :
            </label>

            <input
              type="time"
              name="duration"
              value={updates.duration}
              style={{ color: "black" }}
              onChange={handleInputChange}
            />

            <span
              style={{ color: "black", fontWeight: "bold", margin: "1rem" }}
            >
              hrs
            </span>
            <div style={{ padding: "1rem" }}>
              <Icon
                name="checkmark-outline"
                size="2rem"
                onClick={handleDailyUpdate}
              />
            </div>
          </div>
        </div>
        <div className="task-note-container">
          <div className="task-note">
            <Icon name="task-note-outline" size="2rem" />
            <span
              style={{
                color: "black",
                fontSize: "22px",
                marginLeft: "8px",
                fontWeight: "500",
              }}
            >
              Notes
            </span>
          </div>
        </div>
        <input
          type="text"
          name="notes"
          id="task-note"
          className="note"
          value={notes}
          placeholder="Add Instruction"
          onChange={(e) => setNotes(e.target.value)}
          style={{ color: "black" }}
        />
        <div className="save-button">
          <button className="btn-outline" onClick={handleNotes}>
            <Icon name="save-outline" size="2rem" />
            Save
          </button>
        </div>
        <div className="updates-container">
          <div className="update-header">
            <Icon name="info-outline" size="24px" />
            <span>Updates</span>
          </div>
          <div className="update-body">
            {taskNotifications?.map((notification) => (
              <div className="update-content">
                <span>
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginLeft: "8px",
                    }}
                  >
                    {notification.userId.userName}{" "}
                  </span>
                  <span style={{ color: "black" }}>{notification.action}</span>
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginLeft: "8px",
                    }}
                  >
                    {notification.newData}
                  </span>
                </span>
                <div className="date-time">
                  <span
                    style={{ color: "black" }}
                  >{`${notification.date}  ${notification.time}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {durationFlag && (
        <DurationWarn head={task.taskName} yes={funct} no={handleNo} />
      )}
      {alertFlage && (
        <Alert type={"error"} msg={errorMsg} onExit={handleOnExit} />
      )}
      {deleteFlage && (
        <DeleteTask
          onCancel={() => setDeleteFlag(false)}
          onDelete={handleDelete}
        />
      )}
    </ModalContainer>
  );
};

export default ViewTask;
