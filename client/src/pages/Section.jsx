import React, { useState } from "react";
import AddSection from "../components/modals/section/AddSection";
import { useDispatch, useSelector } from "react-redux";
import { useGetSectionQuery } from "../redux/api/sectionApi";
import DeleteSection from "../components/modals/section/DeleteSection";
import { useNavigate } from "react-router-dom";
import { setSelectedSection } from "../redux/slice/sectionSlice";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import Icon from "../components/ui/Icon";
import "./Section.css";
import AddTask from "../components/modals/Task/AddTask";
import EditSection from "../components/modals/section/EditSection";
import ViewTask from "../components/modals/Task/ViewTask";

const Section = () => {
  const [addSectionFlag, setAddSectionFlag] = useState(false);
  const [deleteSectionFlag, setDeleteSectionFlag] = useState(false);
  const [addTaskFlag, setAddTaskFlag] = useState(false);
  const [editSectionFlag, setEditSectionFlag] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [taskFlag,setTaskFlag]=useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionHead, setSectionHead] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [section, setSection] = useState(null);
  const [task,setTask]=useState(null);

  const { selectedProject } = useSelector((state) => state.project);
  const { sections } = useSelector((state) => state.section);
  const { user } = useSelector((state) => state.user);
  console.log("section", sections[0]);
  useGetSectionQuery(selectedProject);

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
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnCancelSection = () => {
    setSectionHead(null);
    setSectionId(null);
    setDeleteSectionFlag(false);
  };

  const handleDeleteSection = (id, head) => {
    setSectionId(id);
    setSectionHead(head);
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

  const handleTaskViewCancel=()=>{
    setTask(null);
    setSection(null);
    setTaskFlag(false);
  }

  const handleTaskView=(task,sec)=>{
    setTask(task);
    setSection(sec);
    setTaskFlag(true);
  }

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
    <MainContainer pageName="Section">
      <div className="section-top">
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
          <button className="btn-outline" onClick={()=>setShowCompleted(!showCompleted)}>
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
            <div className="section-item-top">
              <div className="section-item-top-left">
                <Icon name="section-outline" size="2.5rem" />
                <span className="ml-2" style={{ fontSize: "16px" }}>
                  {sec.sectionName}
                </span>
              </div>
              <div className="section-item-top-right">
                <div className="notify">1</div>
                <div className="section-progress">{sec.progress}%</div>
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
                <span style={{ color: "black", fontSize: "16px" }}>
                  Due date:
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
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
                {sec.tasks.map((task)=>(
                  <div className="section-task-body" onClick={()=>handleTaskView(task,sec)}>
                  <div className="section-task-header">
                    <span
                      className="ml-2"
                      style={{ fontSize: "16px", color: "black" }}
                    >
                      {task.taskName}
                    </span>
                    <div className="section-item-top-right">
                      <div className="notify"></div>
                      <div
                        className="section-progress"
                        style={{ color: "black" }}
                      >
                        {task.progress}
                      </div>
                    </div>
                  </div>

                  <div className="section-task-details">
                    <div className="task-details">
                      <Icon name="employee-outline" size="2rem" />
                      <span style={{ color: "black" }} className="ml-2">
                        {user._id===task.createdBy._id?`You`:task.createdBy.userName}
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
              {user.userGroupName !== "Software" && (
                <Icon
                  name="edit-outline"
                  size="2.5rem "
                  onClick={() => handleEditSection(sec)}
                />
              )}
              {sec.totalTask === 0 ? (
                <button
                  className="btn-del"
                  onClick={() => handleDeleteSection(sec._id, sec.sectionName)}
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
            id={sectionId}
            head={sectionHead}
            onCancel={handleOnCancelSection}
          />
        )}
        {addTaskFlag && <AddTask onCancel={handleRemoveAddTask} />}
        {editSectionFlag && (
          <EditSection onCancel={handleEditCancel} sec={section} />
        )}
        {taskFlag&&<ViewTask onCancel={handleTaskViewCancel} task={task} section={section}/>}
      </div>
    </MainContainer>
  );
};

export default Section;
