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
import { setSectionDueColor } from "../util";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [addTaskFlag, setAddTaskFlag] = useState(false);
  const [viewTaskFlag, setViewTaskFlag] = useState(false);
  const [task, setTask] = useState(null);
  const [section, setSection] = useState(null);

  const { selectedSection: sec1 } = useSelector((state) => state.section);
  const { selectedProjectName} = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const navigate=useNavigate();
  
  const sec = typeof sec1 === 'string' ? JSON.parse(sec1) : sec1;
  console.log("selectedSection", sec);

  useGetTaskQuery(sec._id);
  const [getSelectedTask, { data: recivedTask }] = useGetSelectedTaskMutation();

  // useEffect(() => {
  //   setViewTaskFlag(true);
  // }, [recivedTask]);

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
    // <>
    //   <div>
    //     <h1 style={{ color: "black" }}>{sec.sectionName}</h1>
    //     <p style={{ color: "black" }}>progress:{sec.progress}</p>
    //     <p style={{ color: "black" }}>
    //       Created By:{" "}
    //       {sec.createdBy._id === user._id ? "You" : sec.createdBy.userName}
    //     </p>
    //     <p style={{ color: "black" }}>Start Date:{formatDate(sec.startDate)}</p>
    //     <p style={{ color: "black" }}>Due Date:{formatDate(sec.dueDate)}</p>
    //   </div>

    //   <button style={{ color: "black" }} onClick={() => setAddTaskFlag(true)}>
    //     add task
    //   </button>

    //   <div style={{ clear: "both" }}>
    //     <div style={{ color: "black", float: "left", width: "25%" }}>
    //       <h1 style={{ color: "black" }}>Todo</h1>
    //       {todoTasks.map((todoTask) => (
    //         <div style={{ border: "1px solid black" }} onClick={()=>handleViewClick(todoTask)}>
    //           <h2 style={{ color: "black" }}>{todoTask.taskName}</h2>
    //           <p style={{ color: "black" }}>
    //             Created By:{" "}
    //             {todoTask.createdBy._id === user._id
    //               ? "You"
    //               : todoTask.createdBy.userName}
    //           </p>
    //           <p style={{ color: "black" }}>
    //             dueDate:{formatDate(todoTask.dueDate)}
    //           </p>
    //           <p style={{ color: "black" }}>priority:{todoTask.priority}</p>
    //           {!(user.userGroupName == "Software") && (
    //             <p style={{ color: "black" }}>
    //               assingned to:{todoTask.assignedTo.userName}
    //             </p>
    //           )}
    //         </div>
    //       ))}
    //     </div>

    //     <div style={{ color: "black", float: "left", width: "25%" }}>
    //       <h1 style={{ color: "black" }}>In progress</h1>
    //       {inProgressTasks.map((inpg) => (
    //         <div style={{ border: "1px solid black" }} onClick={()=>handleViewClick(inpg)}>
    //           <h2 style={{ color: "black" }}>{inpg.taskName}</h2>
    //           <p style={{ color: "black" }}>
    //             Created By:{" "}
    //             {inpg.createdBy._id === user._id
    //               ? "You"
    //               : inpg.createdBy.userName}
    //           </p>
    //           <p style={{ color: "black" }}>
    //             dueDate:{formatDate(inpg.dueDate)}
    //           </p>
    //           <p style={{ color: "black" }}>priority:{inpg.priority}</p>
    //           {!(user.userGroupName == "Software") && (
    //             <p style={{ color: "black" }}>
    //               assingned to:{inpg.assignedTo.userName}
    //             </p>
    //           )}
    //         </div>
    //       ))}
    //     </div>

    //     <div style={{ color: "black", float: "left", width: "25%" }}>
    //       <h1 style={{ color: "black" }}>completed</h1>
    //       {completedTasks.map((comp) => (
    //         <div style={{ border: "1px solid black" }} onClick={()=>handleViewClick(comp)}>
    //           <h2 style={{ color: "black" }}>{comp.taskName}</h2>
    //           <p style={{ color: "black" }}>
    //             Created By:{" "}
    //             {comp.createdBy._id === user._id
    //               ? "You"
    //               : comp.createdBy.userName}
    //           </p>
    //           <p style={{ color: "black" }}>
    //             dueDate:{formatDate(comp.dueDate)}
    //           </p>
    //           <p style={{ color: "black" }}>priority:{comp.priority}</p>
    //           {!(user.userGroupName == "Software") && (
    //             <p style={{ color: "black" }}>
    //               assingned to:{comp.assignedTo.userName}
    //             </p>
    //           )}
    //         </div>
    //       ))}
    //     </div>

    //     <div style={{ color: "black", float: "left", width: "25%" }}>
    //       <h1 style={{ color: "black" }}>others</h1>
    //       {othersTasks.map((oth) => (
    //         <div style={{ border: "1px solid black" }} onClick={()=>handleViewClick(oth)}>
    //           <h2 style={{ color: "black" }}>{oth.taskName}</h2>
    //           <p style={{ color: "black" }}>
    //             Created By:{" "}
    //             {oth.createdBy._id === user._id
    //               ? "You"
    //               : oth.createdBy.userName}
    //           </p>
    //           <p style={{ color: "black" }}>
    //             dueDate:{formatDate(oth.dueDate)}
    //           </p>
    //           <p style={{ color: "black" }}>priority:{oth.priority}</p>
    //           {!(user.userGroupName == "Software") && (
    //             <p style={{ color: "black" }}>
    //               assingned to:{oth.assignedTo.userName}
    //             </p>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   {addTaskFlag && <AddTask onCancel={() => setAddTaskFlag(false)} />}
    //   {viewTaskFlag && <ViewTask onCancel={() => setViewTaskFlag(false)} task={task} section={section}/>}
    // </>
    <MainContainer
      pageName={selectedProjectName}
      onGoBack={() => navigate("/sections")}
    >
      <div className="view-all-task-container">
        {/* <div className="project-back">
          <Icon name="arrow-outline" size="24px" />
          <span
            style={{
              color: "black",
              marginLeft: "5px",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            project name{" "}
          </span>
        </div> */}
        {/* <div
          className="section-item-top"
          style={{
            backgroundColor: sec.dueDate > new Date() ? "#FF4848" : "#3D405B",
            borderColor: sec.dueDate > new Date() ? "#FF4848" : "#3D405B",
          }}
        > */}
        <div className="section-item-top" style={{ backgroundColor:setSectionDueColor(sec.dueDate,sec.progress,sec.totalTask)}}>
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
                    // backgroundColor: getPriorityColor(todoTask.priority),
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
                    // borderColor: getPriorityColor(todoTask.priority),
                  }}
                >
                  <span
                    className="ml-2"
                    style={{ fontSize: "16px", color: "black" }}
                  >
                    {todoTask.taskName}
                  </span>
                  <span>{todoTask.progress}%</span>
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
                    // backgroundColor: getPriorityColor(inpg.priority),
                    // backgroundColor: sec.overdueTasks === 0 ? `#FF4848` :getPriorityColor(inpg.priority),
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
                    // borderColor: getPriorityColor(inpg.priority),
                  }}
                >
                  <span
                    className="ml-2"
                    style={{ fontSize: "16px", color: "black" }}
                  >
                    {inpg.taskName}
                  </span>
                  <span>{inpg.progress}%</span>
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
                    // backgroundColor: getPriorityColor(comp.priority),
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
                    // borderColor: getPriorityColor(comp.priority),
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
                    // backgroundColor: getPriorityColor(oth.priority),
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
                    // borderColor: getPriorityColor(oth.priority),
                  }}
                >
                  <span
                    className="ml-2"
                    style={{ fontSize: "16px", color: "black" }}
                  >
                    {oth.taskName}
                  </span>
                  <span>{oth.progress}%</span>
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
