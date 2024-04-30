import React, { useEffect, useState } from "react";
import AddSection from "../components/modals/section/AddSection";
import { useDispatch, useSelector } from "react-redux";
import DeleteSection from "../components/modals/section/DeleteSection";
import { useNavigate } from "react-router-dom";
import { setSelectedSection } from "../redux/slice/sectionSlice";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import "./Section.css";
import AddTask from "../components/modals/Task/AddTask";
import EditSection from "../components/modals/section/EditSection";
import ViewTask from "../components/modals/Task/ViewTask";
import { resetTaskNotifications } from "../redux/slice/taskNotificationSlice";
import { taskNotificationApi } from "../redux/api/taskNotificationApi";
import { useGetSelectedTaskMutation } from "../redux/api/taskApi";
import { useGetSectionMutation } from "../redux/api/sectionApi";

const Section = () => {
  const [addSectionFlag, setAddSectionFlag] = useState(false);
  const [deleteSectionFlag, setDeleteSectionFlag] = useState(false);
  const [addTaskFlag, setAddTaskFlag] = useState(false);
  const [editSectionFlag, setEditSectionFlag] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [taskFlag, setTaskFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionHead, setSectionHead] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [section, setSection] = useState(null);
  const [task, setTask] = useState(null);

  const [getSelectedTask] = useGetSelectedTaskMutation();

  const { selectedProject } = useSelector((state) => state.project);
  const { sections } = useSelector((state) => state.section);
  const { user } = useSelector((state) => state.user);

  const [getSections]=useGetSectionMutation();

  useEffect(()=>{getSections(selectedProject)},[])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredSections = sections.filter((section) =>
    section.sectionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedSections = showCompleted
    ? filteredSections.filter((section) => section.completed)
    : filteredSections.filter((section) => !section.completed);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-GB");
  // };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth()+1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnCancelSection = () => {
    setSection(null)
    setDeleteSectionFlag(false);
  };

  const handleDeleteSection = (sec) => {
    setSection(sec)
    setDeleteSectionFlag(true);
  };

  const handleSectionClick = (id) => {
    dispatch(setSelectedSection(id));
    navigate("/task");
  };

  const handleAddTask = (sec) => {
    dispatch(setSelectedSection(sec));
    setAddTaskFlag(true);
  };

  const handleRemoveAddTask = () => {
    dispatch(setSelectedSection(null));
    setAddTaskFlag(false);
  };

  const handleEditSection = (sec) => {
    setSection(sec);
    setEditSectionFlag(true);
  };

  const handleEditCancel = () => {
    setSection(null);
    setEditSectionFlag(false);
  };

  const handleTaskViewCancel = () => {
    dispatch(resetTaskNotifications())
    dispatch(taskNotificationApi.util.resetApiState())
    setTask(null);
    setSection(null);
    setTaskFlag(false);
  }

  const handleTaskView = async (task, sec) => {
    setTask(task);
    await getSelectedTask(task)
    setSection(sec);
    setTaskFlag(true);
  }
  const getPriorityColor = (priority) => {
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
    //   <>
    //     <input
    //       type="text"
    //       value={searchTerm}
    //       onChange={handleSearch}
    //       style={{ color: "black" }}
    //       placeholder="search for section"
    //     />
    //     <button
    //       style={{ color: "black" }}
    //       onClick={() => setAddSectionFlag(true)}
    //     >
    //       addsection
    //     </button>

    //     {filteredSections.map((sec) => (
    //       <div className="test"
    //         key={sec._id}
    //         style={{ border: "1px solid black", padding: "10px" }}
    //         onClick={()=>handleSectionClick(sec._id)}
    //       >
    //         <h2 style={{ color: "black" }}>{sec.sectionName}</h2>
    //         <p style={{ color: "black" }}>
    //           Start Date: {formatDate(sec.startDate)}
    //         </p>
    //         <p style={{ color: "black" }}>Due Date: {formatDate(sec.dueDate)}</p>
    //         <p style={{ color: "black" }}>
    //           Created By:{" "}
    //           {sec.createdBy._id === user._id ? "You" : sec.createdBy.userName}
    //         </p>
    //         <p style={{ color: "black" }}>{sec.progress}</p>
    //         <button style={{ color: "black" }}>add task</button>
    //         {sec.totalTask===0 ? (
    //           <button
    //             style={{ color: "black" }}
    //             onClick={() => handleDeleteSection(sec._id, sec.sectionName)}
    //           >
    //             delete task
    //           </button>
    //         ) : (
    //           <button style={{ color: "black" }}>View task</button>
    //         )}
    //       </div>
    //     ))}

    //     {addSectionFlag && (
    //       <AddSection
    //         onCancel={() => setAddsectionFlag(false)}
    //         projectId={selectedProject}
    //       />
    //     )}
    //     {deleteSectionFlag && (
    //       <DeleteSection
    //         id={sectionId}
    //         head={sectionHead}
    //         onCancel={handleOnCancelSection}
    //       />
    //     )}
    //   </>
    // );
    <MainContainer pageName="Project name-desc">
      {/* <div className="project-name" style={{ fontWeight: "600", fontSize: "20px" }}>project name</div> */}
      <div className="section-top" >
        <div className="search-box">
          <input
            id="keyword"
            name="keyword"
            type="text"
            placeholder="Search for Section"
            autoComplete="new-off"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Icon title="Search" name="search-icon" size="2rem" />
        </div>
        <div className="section-top-right">
          <button className="btn-outline" onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Show Sections" : "Show Completed Sections"}
          </button>
          <button
            className="btn-outline"
            onClick={() => setAddSectionFlag(true)}
          >
            <Icon name="add-outline" size="2rem" />
            Add Section
          </button>
        </div>
      </div>
      <div className="section-bottom">
        {displayedSections.map((sec) => (
          <div
            className="section-item"
            key={sec._id}
          // onClick={() => handleSectionClick(sec)}
          >
            <div className="section-item-top" style={{backgroundColor:sec.dueDate? `#3D405B` : `#FF4848`}}>
              <div className="section-item-top-left">
                <Icon name="section-outline" size="2.5rem" />
                <span className="ml-2" style={{ fontSize: "16px",color:"white" }}>
                  {sec.sectionName}
                </span>
              </div>
              <div className="section-item-top-right">
                {/* <div className="notify">1</div> */}
                <div className="section-progress" style={{color:"white"}}>{sec.progress}%</div>
              </div>
            </div>
            <div className="section-details-container">
              <div className="section-details-left">
                <span style={{ color: "black", fontSize: "16px" }}>
                  Addition date:
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "16px",
                    }}
                    className="ml-2"
                  >
                    {formatDate(sec.startDate)}
                  </span>
                </span>
                <span style={{fontSize: "16px",color:sec.dueDate? `black` : `red` }}>
                  Due date:
                  <span
                    style={{
                      fontWeight: "bold",
                      color:sec.dueDate ? `black` : `red`, 
                      fontSize: "16px",
                    }}
                    className="ml-2"
                  >
                    {formatDate(sec.dueDate)}
                  </span>
                </span>
                <span style={{ color: "black", fontSize: "16px" }}>
                  Completed tasks:
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "16px",
                    }}
                    className="ml-2"
                  >
                    {sec.completedTasks}
                  </span>
                </span>
                {user.userGroupName === "Software" && (
                  <span style={{ color: "black", fontSize: "16px" }}>
                    Tasks in progress:
                    <span
                      style={{
                        fontWeight: "bold",
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
                    color: sec.overdueTasks === 0 ? `black` : `red`,
                    fontSize: "16px",
                  }}
                >
                  Tasks due:
                  <span
                    style={{
                      fontWeight: "bold",
                      color: sec.overdueTasks === 0 ? `black` : `red`,
                      fontSize: "16px",
                    }}
                    className="ml-2"
                  >
                    {sec.overdueTasks}
                  </span>
                </span>
              </div>
              <div className="section-details-right">
                <span style={{ color: "black", fontSize: "16px" }}>
                  Addition by:
                  <span
                    style={{
                      fontWeight: "bold",
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
                <span style={{ color: "black", fontSize: "16px" }}>
                  {user.userGroupName === "Software"
                    ? `Task assigned to you:`
                    : `Total task:`}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "16px",
                    }}
                    className="ml-2"
                  >
                    {sec.assigned}
                  </span>
                </span>
                <span style={{ color: "black", fontSize: "16px" }}>
                  Pending tasks:
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "16px",
                    }}
                    className="ml-2"
                  >
                    {sec.pendingTasks}
                  </span>
                </span>
                <span style={{ color: "black", fontSize: "16px" }}>
                  Tasks on hold:
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "16px",
                    }}
                    className="ml-2"
                  >
                    {sec.onHoldTasks}
                  </span>
                </span>
                {user.userGroupName === "Software" && (
                  <span style={{ color: "black", fontSize: "16px" }}>
                    Your total progress:
                    <span
                      style={{
                        fontWeight: "bold",
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
            {user.userGroupName === "Software" && (
              <div className="section-task-container">
                {sec.tasks.map((task) => (
                  <div className="section-task-body" onClick={() => handleTaskView(task._id, sec)}
                  style={{
                    backgroundColor: getPriorityBodyColor(task.priority),
                    borderColor: getPriorityBodyColor(task.priority),
                  }}
                  >
                    <div className="section-task-header"
                      style={{
                        backgroundColor: getPriorityColor(task.priority),
                        borderColor: getPriorityColor(task.priority),
                      }}
                    >
                      <span
                        className="ml-2"
                        style={{ fontSize: "16px", color: "black" }}
                      >
                        {task.taskName}
                      </span>
                      <div className="section-item-top-right">
                        {/* <div className="notify"></div> */}
                        <div
                          className="section-progress"
                          style={{ color: "black" }}
                        >
                          {task.progress}<span style={{ fontSize: "16px", color: "black", marginRight: "8px" }}>%</span>
                        </div>
                      </div>
                    </div>

                    <div className="section-task-details">
                      <div className="task-details">
                        <Icon name="employee-outline" size="2rem" />
                        <span style={{ color: "black" }} className="ml-2">
                          {user._id === task.createdBy._id ? `You` : task.createdBy.userName}
                        </span>
                      </div>
                      <div className="task-details">
                        <Icon name="calender-outline" size="2rem" />
                        <span style={{ color: "black" }} className="ml-2">
                          {formatDate(task.assignedDate)}
                        </span>
                      </div>
                      <div className="task-details">
                        <Icon name="priority-outline" size="2rem" />
                        <span style={{ color: "black" }} className="ml-2">
                          {task.priority}
                        </span>
                      </div>
                      <div className="task-details">
                        <Icon name="status-outline" size="2rem" />
                        <span style={{ color: "black" }} className="ml-2">
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </div>))}
              </div>
            )}

            <div className="section-details-bottom">
              {/* {user.userGroupName!=="Software"&&<button style={{color:"black"}} onClick={()=>handleEditSection(sec)}>edit</button>} */}
              <div className="mt-4">
                {user.userGroupName !== "Software" && (
                  <Icon
                    name="edit-outline"
                    size="2.5rem "
                    onClick={() => handleEditSection(sec)}
                  />
                )}
              </div>
              {sec.totalTask === 0 ? (
                <button
                  className="btn-del"
                  onClick={() => handleDeleteSection(sec)}
                >
                  <Icon name="delete-outline" size="2rem" />
                  Delete section
                </button>
              ) : (
                <button
                  className="btn-outline"
                  onClick={() => handleSectionClick(sec)}
                >
                  <Icon name="task-outline" size="2rem" title="task" />
                  View all task
                </button>
              )}
              <button
                className="btn-outline"
                onClick={() => handleAddTask(sec)}
              >
                <Icon name="add-outline" size="2rem" />
                Add Task
              </button>
            </div>
          </div>
        ))}
        {addSectionFlag && (
          <AddSection
            onCancel={() => setAddSectionFlag(false)}
            projectId={selectedProject}
          />
        )}
        {deleteSectionFlag && (
          <DeleteSection
            sec={section}
            onCancel={handleOnCancelSection}
          />
        )}
        {addTaskFlag && <AddTask onCancel={handleRemoveAddTask} />}
        {editSectionFlag && (
          <EditSection onCancel={handleEditCancel} sec={section} />
        )}
        {taskFlag && <ViewTask onCancel={handleTaskViewCancel} taskId={task} section={section} />}
      </div>
    </MainContainer>
  );
};

export default Section;
