import React, { useState } from "react";
import AddTask from "../components/modals/Task/AddTask";
import { useSelector, useDispatch } from "react-redux";
import { useGetTaskQuery } from "../redux/api/taskApi";

const Task = () => {
  const [addTaskFlag, setAddTaskFlag] = useState(false);

  const { selectedSection: sec } = useSelector((state) => state.section);
  const { user } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);

  useGetTaskQuery(sec._id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
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

  return (
    <>
      <div>
        <h1 style={{ color: "black" }}>{sec.sectionName}</h1>
        <p style={{ color: "black" }}>progress:{sec.progress}</p>
        <p style={{ color: "black" }}>
          Created By:{" "}
          {sec.createdBy._id === user._id ? "You" : sec.createdBy.userName}
        </p>
        <p style={{ color: "black" }}>Start Date:{formatDate(sec.startDate)}</p>
        <p style={{ color: "black" }}>Due Date:{formatDate(sec.dueDate)}</p>
      </div>

      <button style={{ color: "black" }} onClick={() => setAddTaskFlag(true)}>
        add task
      </button>

      <div style={{ clear: "both" }}>
        <div style={{ color: "black", float: "left", width: "25%" }}>
          <h1 style={{ color: "black" }}>Todo</h1>
          {todoTasks.map((todoTask) => (
            <div style={{ border: "1px solid black" }}>
              <h2 style={{ color: "black" }}>{todoTask.taskName}</h2>
              <p style={{ color: "black" }}>
                Created By:{" "}
                {todoTask.createdBy._id === user._id
                  ? "You"
                  : todoTask.createdBy.userName}
              </p>
              <p style={{ color: "black" }}>
                dueDate:{formatDate(todoTask.dueDate)}
              </p>
              <p style={{ color: "black" }}>priority:{todoTask.priority}</p>
              {!(user.userGroupName == "Software") && (
                <p style={{ color: "black" }}>assingned to:{todoTask.assignedTo.userName}</p>
              )}
            </div>
          ))}
        </div>

        <div style={{ color: "black", float: "left", width: "25%" }}>
          <h1 style={{ color: "black" }}>In progress</h1>
          {inProgressTasks.map((inpg) => (
            <div style={{ border: "1px solid black" }}>
              <h2 style={{ color: "black" }}>{inpg.taskName}</h2>
              <p style={{ color: "black" }}>
                Created By:{" "}
                {inpg.createdBy._id === user._id
                  ? "You"
                  : inpg.createdBy.userName}
              </p>
              <p style={{ color: "black" }}>
                dueDate:{formatDate(inpg.dueDate)}
              </p>
              <p style={{ color: "black" }}>priority:{inpg.priority}</p>
              {!(user.userGroupName == "Software") && (
                <p style={{ color: "black" }}>assingned to:{inpg.assignedTo.userName}</p>
              )}
            </div>
          ))}
        </div>

        <div style={{ color: "black", float: "left", width: "25%" }}>
          <h1 style={{ color: "black" }}>completed</h1>
          {completedTasks.map((comp) => (
            <div style={{ border: "1px solid black" }}>
              <h2 style={{ color: "black" }}>{comp.taskName}</h2>
              <p style={{ color: "black" }}>
                Created By:{" "}
                {comp.createdBy._id === user._id
                  ? "You"
                  : comp.createdBy.userName}
              </p>
              <p style={{ color: "black" }}>
                dueDate:{formatDate(comp.dueDate)}
              </p>
              <p style={{ color: "black" }}>priority:{comp.priority}</p>
              {!(user.userGroupName == "Software") && (
                <p style={{ color: "black" }}>assingned to:{comp.assignedTo.userName}</p>
              )}
            </div>
          ))}
        </div>

        <div style={{ color: "black", float: "left", width: "25%" }}>
          <h1 style={{ color: "black" }}>others</h1>
          {othersTasks.map((oth) => (
            <div style={{ border: "1px solid black" }}>
              <h2 style={{ color: "black" }}>{oth.taskName}</h2>
              <p style={{ color: "black" }}>
                Created By:{" "}
                {oth.createdBy._id === user._id
                  ? "You"
                  : oth.createdBy.userName}
              </p>
              <p style={{ color: "black" }}>
                dueDate:{formatDate(oth.dueDate)}
              </p>
              <p style={{ color: "black" }}>priority:{oth.priority}</p>
              {!(user.userGroupName == "Software") && (
                <p style={{ color: "black" }}>assingned to:{oth.assignedTo.userName}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {addTaskFlag && <AddTask onCancel={() => setAddTaskFlag(false)} />}
    </>
  );
};

export default Task;
