import React, { useEffect, useState } from "react";
import AddTask from "../components/modals/Task/AddTask";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetSelectedTaskMutation,
  useGetTaskQuery,
} from "../redux/api/taskApi";
import ViewTask from "../components/modals/Task/ViewTask";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import "./Task.css";
import Icon from "../components/ui/Icon";
import { resetTaskNotifications } from "../redux/slice/taskNotificationSlice";
import { taskNotificationApi } from "../redux/api/taskNotificationApi";
import { dueDateTextColor, setSectionDueColor } from "../util";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [addTaskFlag, setAddTaskFlag] = useState(false);
  const [viewTaskFlag, setViewTaskFlag] = useState(false);
  const [task, setTask] = useState(null);
  const [section, setSection] = useState(null);

  const { selectedSection: sec1 } = useSelector((state) => state.section);
  const { selectedProjectName } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sec = typeof sec1 === "string" ? JSON.parse(sec1) : sec1;

  useGetTaskQuery(sec._id);
  const [getSelectedTask, { data: recivedTask }] = useGetSelectedTaskMutation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [task];
    } else {
      acc[task.status].push(task);
    }
    return acc;
  }, {});

  const inProgressTasks = groupedTasks["In Progress"] || [];
  const todoTasks = groupedTasks["To Do"] || [];
  const completedTasks = groupedTasks["Completed"] || [];
  const othersTasks = tasks.filter(
    (task) => !["In Progress", "To Do", "Completed"].includes(task.status)
  );

  const handleViewClick = async (task) => {
    setSection(sec);
    setTask(task);
    await getSelectedTask(task);
    setViewTaskFlag(true);
  };

  const handleCancelViewTask = () => {
    setViewTaskFlag(false);
    dispatch(resetTaskNotifications());
    dispatch(taskNotificationApi.util.resetApiState());
  };

  const getPriorityColor = (priority, dueDate, status) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    if (status !== "Completed") {
      if (today > due) {
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
    <MainContainer
      pageName={selectedProjectName}
      onGoBack={() => navigate("/sections")}
    >
      <div className="view-all-task-container">
        <div
          className="section-item-top"
          style={{
            backgroundColor: setSectionDueColor(
              sec.dueDate,
              sec.progress,
              sec.totalTask
            ),
          }}
        >
          <div className="section-item-top-left">
            <Icon name="section-outline" size="2.5rem" />
            <span
              className="ml-2"
              style={{ fontSize: "22px", fontWeight: "400" }}
            >
              {sec.sectionName}
            </span>
          </div>
          <div className="section-item-top-right">
            <div
              className="section-progress"
              style={{ fontSize: "22px", fontWeight: "400" }}
            >
              {sec.progress}%
            </div>
          </div>
        </div>
        <div className="section-details-container">
          <div className="section-details-left">
            <span
              style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
            >
              Addition date:
              <span
                style={{
                  fontWeight: "700",
                  color: "black",
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {formatDate(sec.startDate)}
              </span>
            </span>
            <span
              style={{
                color: sec.dueDate > new Date() ? "#FF4848" : "black",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Due date:
              <span
                style={{
                  fontWeight: "700",
                  color: sec.dueDate > new Date() ? "#FF4848" : "black",
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {formatDate(sec.dueDate)}
              </span>
            </span>
            <span
              style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
            >
              Completed tasks:
              <span
                style={{
                  fontWeight: "700",
                  color: "black",
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {sec.completedTasks}
              </span>
            </span>
            {user.userGroupName === "Software" && (
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
              >
                Tasks in progress:
                <span
                  style={{
                    fontWeight: "700",
                    color: "black",
                    fontSize: "16px",
                  }}
                  className="ml-2"
                >
                  {sec.inProgressTasks}
                </span>
              </span>
            )}
            <span
              style={{
                color: sec.overdueTasks === 0 ? `black` : `#FF4848`,
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Tasks due:
              <span
                style={{
                  fontWeight: "700",
                  color: sec.overdueTasks === 0 ? `black` : `#FF4848`,
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {sec.overdueTasks}
              </span>
            </span>
          </div>
          <div className="section-details-right">
            <span
              style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
            >
              Addition by:
              <span
                style={{
                  fontWeight: "700",
                  color: "black",
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {sec.createdBy._id === user._id
                  ? "You"
                  : sec.createdBy.userName}
              </span>
            </span>
            <span
              style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
            >
              {user.userGroupName === "Software"
                ? `Task assigned to you:`
                : `Total task:`}
              <span
                style={{
                  fontWeight: "700",
                  color: "black",
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {sec.assigned}
              </span>
            </span>
            <span
              style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
            >
              Pending tasks:
              <span
                style={{
                  fontWeight: "700",
                  color: "black",
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {sec.pendingTasks}
              </span>
            </span>
            <span
              style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
            >
              Tasks on hold:
              <span
                style={{
                  fontWeight: "700",
                  color: "black",
                  fontSize: "16px",
                }}
                className="ml-2"
              >
                {sec.onHoldTasks}
              </span>
            </span>
            {user.userGroupName === "Software" && (
              <span
                style={{ color: "black", fontSize: "16px", fontWeight: "400" }}
              >
                Your total progress:
                <span
                  style={{
                    fontWeight: "700",
                    color: "black",
                    fontSize: "16px",
                  }}
                  className="ml-2"
                >
                  {sec.totalProgress}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="btn-right">
          <button className="btn-outline" onClick={() => setAddTaskFlag(true)}>
            <Icon name="add-outline" size="2rem" />
            Add Task
          </button>
        </div>
        <div className="task-grid">
          <div className="task">
            <div className="stages-heading">
              <span>To Do</span>
            </div>
            {todoTasks.map((todoTask) => (
              <div
                className="stage-task"
                onClick={() => handleViewClick(todoTask._id)}
                style={{
                  backgroundColor: getPriorityBodyColor(todoTask.priority),
                  borderColor: getPriorityBodyColor(todoTask.priority),
                }}
              >
                <div
                  className="stage-task-header"
                  style={{
                    backgroundColor: getPriorityColor(
                      todoTask.priority,
                      todoTask.dueDate,
                      todoTask.status
                    ),
                    borderColor: getPriorityColor(
                      todoTask.priority,
                      todoTask.dueDate,
                      todoTask.status
                    ),
                  }}
                >
                  <span
                    className="ml-2"
                    style={{
                      fontSize: "16px",
                      color: dueDateTextColor(
                        todoTask.dueDate,
                        todoTask.status
                      ),
                    }}
                  >
                    {todoTask.taskName}
                  </span>
                  <span
                    style={{
                      color: dueDateTextColor(
                        todoTask.dueDate,
                        todoTask.status
                      ),
                    }}
                  >
                    {todoTask.progress}%
                  </span>
                </div>
                <div className="stage-body-grid">
                  <div className="stage-task-body">
                    <Icon name="employee-outline" size="22px" />
                    <span>{todoTask.assignedTo.userName}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="calender-outline" size="22px" />
                    <span
                      style={{
                        color:
                          todoTask.dueDate > new Date() ? "#FF4848" : "black",
                      }}
                    >
                      {formatDate(todoTask.dueDate)}
                    </span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="priority-outline" size="22px" />
                    <span>{todoTask.priority}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="status-outline" size="22px" />
                    <span>{todoTask.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="task">
            <div className="stages-heading">
              <span>In Progress</span>
            </div>
            {inProgressTasks.map((inpg) => (
              <div
                className="stage-task"
                onClick={() => handleViewClick(inpg._id)}
                style={{
                  backgroundColor: getPriorityBodyColor(inpg.priority),
                  borderColor: getPriorityBodyColor(inpg.priority),
                }}
              >
                <div
                  className="stage-task-header"
                  style={{
                    backgroundColor: getPriorityColor(
                      inpg.priority,
                      inpg.dueDate,
                      inpg.status
                    ),
                    borderColor: getPriorityColor(
                      inpg.priority,
                      inpg.dueDate,
                      inpg.status
                    ),
                  }}
                >
                  <span
                    className="ml-2"
                    style={{
                      fontSize: "16px",
                      color: dueDateTextColor(inpg.dueDate, inpg.status),
                    }}
                  >
                    {inpg.taskName}
                  </span>
                  <span
                    style={{
                      color: dueDateTextColor(inpg.dueDate, inpg.status),
                    }}
                  >
                    {inpg.progress}%
                  </span>
                </div>
                <div className="stage-body-grid">
                  <div className="stage-task-body">
                    <Icon name="employee-outline" size="22px" />
                    <span>{inpg.assignedTo.userName}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="calender-outline" size="22px" />
                    <span
                      style={{
                        color: inpg.dueDate > new Date() ? "#FF4848" : "black",
                      }}
                    >
                      {formatDate(inpg.dueDate)}
                    </span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="priority-outline" size="22px" />
                    <span>{inpg.priority}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="status-outline" size="22px" />
                    <span>{inpg.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="task">
            <div className="stages-heading">
              <span>Completed</span>
            </div>
            {completedTasks.map((comp) => (
              <div
                className="stage-task"
                onClick={() => handleViewClick(comp._id)}
                style={{
                  backgroundColor: getPriorityBodyColor(comp.priority),
                  borderColor: getPriorityBodyColor(comp.priority),
                }}
              >
                <div
                  className="stage-task-header"
                  style={{
                    backgroundColor: getPriorityColor(
                      comp.priority,
                      comp.dueDate,
                      comp.status
                    ),
                    borderColor: getPriorityColor(
                      comp.priority,
                      comp.dueDate,
                      comp.status
                    ),
                  }}
                >
                  <span
                    className="ml-2"
                    style={{ fontSize: "16px", color: "black" }}
                  >
                    {comp.taskName}
                  </span>
                  <span>{comp.progress}%</span>
                </div>
                <div className="stage-body-grid">
                  <div className="stage-task-body">
                    <Icon name="employee-outline" size="22px" />
                    <span>{comp.assignedTo.userName}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="calender-outline" size="22px" />
                    <span
                      style={{
                        color: comp.dueDate > new Date() ? "#FF4848" : "black",
                      }}
                    >
                      {formatDate(comp.dueDate)}
                    </span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="priority-outline" size="22px" />
                    <span>{comp.priority}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="status-outline" size="22px" />
                    <span>{comp.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="task">
            <div className="stages-heading">
              <span>Others</span>
            </div>
            {othersTasks.map((oth) => (
              <div
                className="stage-task"
                onClick={() => handleViewClick(oth._id)}
                style={{
                  backgroundColor: getPriorityBodyColor(oth.priority),
                  borderColor: getPriorityBodyColor(oth.priority),
                }}
              >
                <div
                  className="stage-task-header"
                  style={{
                    backgroundColor: getPriorityColor(
                      oth.priority,
                      oth.dueDate,
                      oth.status
                    ),
                    borderColor: getPriorityColor(
                      oth.priority,
                      oth.dueDate,
                      oth.status
                    ),
                  }}
                >
                  <span
                    className="ml-2"
                    style={{
                      fontSize: "16px",
                      color: dueDateTextColor(oth.dueDate, oth.status),
                    }}
                  >
                    {oth.taskName}
                  </span>
                  <span
                    style={{ color: dueDateTextColor(oth.dueDate, oth.status) }}
                  >
                    {oth.progress}%
                  </span>
                </div>
                <div className="stage-body-grid">
                  <div className="stage-task-body">
                    <Icon name="employee-outline" size="22px" />
                    <span>{oth.assignedTo.userName}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="calender-outline" size="22px" />
                    <span
                      style={{
                        color: oth.dueDate > new Date() ? "#FF4848" : "black",
                      }}
                    >
                      {formatDate(oth.dueDate)}
                    </span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="priority-outline" size="22px" />
                    <span>{oth.priority}</span>
                  </div>
                  <div className="stage-task-body">
                    <Icon name="status-outline" size="22px" />
                    <span>{oth.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {addTaskFlag && <AddTask onCancel={() => setAddTaskFlag(false)} />}
      {viewTaskFlag && (
        <ViewTask
          onCancel={handleCancelViewTask}
          taskId={task}
          section={section}
        />
      )}
    </MainContainer>
  );
};

export default Task;
