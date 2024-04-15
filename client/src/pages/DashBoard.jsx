import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNotes from "../components/modals/notes/AddNotes";
import { useGetNotesQuery } from "../redux/api/notesApi";
import { getNotes } from "../redux/slice/notesSlice";
import DeleteNotes from "../components/modals/notes/DeleteNotes";
import View from "../components/modals/notes/View";
import { useGetProjectQuery } from "../redux/api/projectApi";
import { getProject, setSelectedProject } from "../redux/slice/projectSlice";
import { useNavigate } from "react-router-dom";
import MainContainer from "../components/layouts/sidebar/MainContainer";
import "./DashBoard.css";
import Icon from "../components/ui/Icon";
import SelectInput from "../components/ui/SelectInput";
import DatePicker from 'react-datepicker';
import AddProject from "../components/modals/projects/AddProject";

const Dashboard = () => {
  const [noteId, setNoteId] = useState(null);
  const [noteHead, setNoteHead] = useState(null);
  const [noteMsg, setNoteMsg] = useState(null);
  const [addNoteFlag, setAddNoteFlag] = useState(false);
  const [deleteNoteFlag, setDeleteNoteFlag] = useState(false);
  const [viewNoteFlag, setViewNoteFlag] = useState(false);
  const [addProjectFlag, setAddProjectFlag] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tag, setTag] = useState([]);

  const { data: fetchedData, isLoading } = useGetNotesQuery();
  const { data: projectData } = useGetProjectQuery();

  const { notes } = useSelector((state) => state.notes);
  const { project } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tags = [
    { label: "Software", value: "Software" },
    { label: "Website", value: "Website" },
    { label: "Mobile", value: "Mobile" },
    { label: "Others", value: "Others" },
  ];

  useEffect(() => {
    if (fetchedData) {
      dispatch(getNotes(fetchedData.data));
    }
  }, [dispatch, fetchedData]);

  useEffect(() => {
    if (projectData) {
      dispatch(getProject(projectData.data));
    }
  }, [dispatch, projectData]);

  const sortedNotes = [...notes];
  sortedNotes.sort(
    (a, b) => new Date(a.created_date) - new Date(b.created_date)
  );

  const handleTags = (e) => {
    if (!tag.includes(e.value)) setTag((prevTag) => [...prevTag, e.value]);
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };

  const filteredProjects = project.filter((proj) => {
    const isIncludedInTags =
      tag.length === 0 || tag.every((tg) => proj.tags.includes(tg));
    const isIncludedInSearch = proj.sctProjectName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return isIncludedInTags && isIncludedInSearch;
  });

  const groupedMessages = {};
  sortedNotes.forEach((message) => {
    const date = new Date(message.created_date).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNote = () => {
    setAddNoteFlag(true);
  };

  const handleDelete = (id, head) => {
    setDeleteNoteFlag(true);
    setViewNoteFlag(false);
    setNoteId(id);
    setNoteHead(head);
  };

  const handleDeleteNotesCancel = () => {
    setNoteId(null);
    setNoteHead(null);
    setDeleteNoteFlag(false);
    setViewNoteFlag(false);
  };

  const handleViewNote = (id, head, msg) => {
    setNoteId(id);
    setNoteHead(head);
    setNoteMsg(msg);
    setViewNoteFlag(true);
  };

  const handleViewNotesCancel = () => {
    setNoteId(null);
    setNoteHead(null);
    setNoteMsg(null);
    setViewNoteFlag(false);
    setDeleteNoteFlag(false);
  };

  const handleOnDelete = () => {
    setNoteMsg(null);
    setViewNoteFlag(false);
    setDeleteNoteFlag(true);
  };

  const handleProjectClick = (id) => {
    dispatch(setSelectedProject(id));
    navigate("/sections");
  };


  return (
    <MainContainer pageName={`Hi`}>
      {/*{/* <div
        style={{
          color: "black",
          border: "2px solid black",
          margin: "5px",
          padding: "10px",
        }}
      >
        <h1
          style={{ color: "black", padding: "10px" }}
          onClick={() => navigate("projects")}
        >
          Projects
        </h1>
        {project.map((proj) => (
          <>
            <h2
              style={{
                color: "black",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              {proj.sctProjectName}
            </h2>
          </>
        ))}
      </div>

      <div
        style={{
          color: "black",
          border: "2px solid black",
          margin: "5px",
          padding: "10px",
        }}
      >
        <h1 style={{ color: "black", padding: "10px" }}>Notes</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          Object.keys(groupedMessages).map((date) => (
            <>
              <div key={date}>
                <p style={{ color: "gray" }}>{date}</p>
                <>
                  {groupedMessages[date].map((message) => (
                    <>
                      <div
                        style={{ border: "1px solid gray" }}
                        onClick={() =>
                          handleViewNote(
                            message._id,
                            message.heading,
                            message.msg
                          )
                        }
                      >
                        <h2 style={{ color: "black" ,  paddingLeft: "10px"}}>{message.heading}</h2>
                        <p style={{ color: "black",  paddingLeft: "10px" }}>{message.msg}</p>
                        <button
                          onClick={() =>
                            handleDelete(message._id, message.heading)
                          }
                          style={{ color: "black", border: "2px solid black", marginLeft:"10px" }}
                        >
                          delete
                        </button>
                      </div>
                      <br />
                    </>
                  ))}
                </>
              </div>
              <hr />
            </>
          ))
        )}
        <button
          onClick={handleAddNote}
          style={{ color: "black", border: "2px solid black" }}
        >
          Add Notes
        </button>
        {addNoteFlag && <AddNotes onCancel={() => setAddNoteFlag(false)} />}
        {deleteNoteFlag && (
          <DeleteNotes
            id={noteId}
            head={noteHead}
            onCancel={handleDeleteNotesCancel}
          />
        )}
        {viewNoteFlag && !deleteNoteFlag && (
          <View
            id={noteId}
            head={noteHead}
            msg={noteMsg}
            onCancel={handleViewNotesCancel}
            onDelete={handleOnDelete}
          />
        )}
      </div> */}

      <div className="dashboard-container">
        <div className="dashboard-upper-grid">
          <div className="dashboard-item">
            <div className="notification">
              <div className="project-header">
                <span className="title">
                  Notification
                </span>
                <div className="header-right">
                  <SelectInput
                    className="tags"
                    placeholder="Type"
                  />
                  <div className="date-box" style={{ padding: "1rem", margin: "1rem" }}>
                    <DatePicker
                      customInput={
                        <div className="date-picker">
                          <input
                            type="text"
                            className="date-input"
                            placeholder="Day dd/mm/yyyy"
                          />
                          <Icon
                            name="date-picker-outline"
                            size="2rem"
                          />
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="notification-container">
                <div className="notification-item" style={{ backgroundColor: "#DCEAE3", border: "2px solid #AACBBA" }}>
                  <div className="left-content">
                    <Icon name="log-outline" size="24px" />
                    <span className="ml-3">
                      <span style={{ fontWeight: "700" }}>Rakshith</span> has logged in
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
                <div className="notification-item" style={{ backgroundColor: "#FBEFDA", border: "2px solid #F3CF96" }}>
                  <div className="left-content">
                    <Icon name="add-outline" size="24px" />
                    <span className="ml-3">
                      <span style={{ fontWeight: "700" }}>Rakshith</span> added a task in <span style={{ fontWeight: "700" }}>Bookbetter (Development)</span>
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
                <div className="notification-item" style={{ backgroundColor: "#FBEFDA", border: "2px solid #F3CF96" }}>
                  <div className="left-content">
                    <Icon name="progress-outline" size="24px" />
                    <span className="ml-3">
                      <span style={{ fontWeight: "700" }}>Rakshith</span> updated progress in <span style={{ fontWeight: "700" }}>Bookbetter (Development)</span>
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
                <div className="notification-item" style={{ backgroundColor: "#FBEFDA", border: "2px solid #F3CF96" }}>
                  <div className="left-content">
                    <Icon name="edit-outline" size="24px" />
                    <span className="ml-3">
                      <span style={{ fontWeight: "700" }}>Joel </span>edited a task in <span style={{ fontWeight: "700" }}>JT application (Updates)</span>
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
                <div className="notification-item" style={{ backgroundColor: "#F9E3DD", border: "2px solid #EDB1A1" }}>
                  <div className="left-content">
                    <Icon name="delete-outline" size="24px" />
                    <span className="ml-3">
                      <span style={{ fontWeight: "700" }}>Rolin </span>deleted a task
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
                <div className="notification-item" style={{ backgroundColor: "#F9E3DD", border: "2px solid #EDB1A1" }}>
                  <div className="left-content">
                    <Icon name="due-outline" size="24px" />
                    <span className="ml-3">
                      Task is due in
                      <span style={{ fontWeight: "700" }}>JT application(Updates) </span>
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
                <div className="notification-item" style={{ backgroundColor: "#F9E3DD", border: "2px solid #EDB1A1" }}>
                  <div className="left-content">
                    <Icon name="critical-note-outline" size="24px" />
                    <span className="ml-3">
                      <span style={{ fontWeight: "700" }}>Rakshith </span>added a critical note in <span style={{ fontWeight: "700" }}>JT application (Updates)</span>
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
                <div className="notification-item" style={{ backgroundColor: "#DCEAE3", border: "2px solid #AACBBA" }}>
                  <div className="left-content">
                    <Icon name="task-outline" size="24px" />
                    <span className="ml-3">
                      Task in 
                      <span style={{ fontWeight: "700" }}>JT application (Updates) </span> 
                    </span>
                  </div>
                  <span>8:00am </span>
                </div>
              </div>
            </div>
          </div>
          {/* PROJECT */}
          <div className="dashboard-item">
            <div className="projects">
              <div className="project-header">
                <span className="title" onClick={() => navigate("projects")}>
                  Project
                </span>
                <div className="header-right">
                  <div className="search-bar">
                    <input
                      id="keyword"
                      name="keyword"
                      type="text"
                      placeholder="Search"
                      onChange={handleSearch}
                      autoComplete="new-off"
                    />
                    <Icon title="Search" name="search-icon" size="2rem" />
                  </div>
                  <SelectInput
                    className="tags"
                    placeholder="Tags"
                    onChange={handleTags}
                    options={tags}
                  />
                  {user.userGroupName !== "Software" && (
                    <Icon
                      className="icon"
                      name="add-outline"
                      onClick={() => setAddProjectFlag(true)}
                      size="3rem"
                    />
                  )}
                </div>
              </div>
              <div className="selected-tag">
                {tag.map((tg, index) => (
                  <div key={index} className="tag-container">
                    <Icon
                      name="close"
                      size="2rem"
                      onClick={() => handleRemoveTag(tg)}
                    />
                    <p style={{ color: "black" }}>{tg}</p>
                  </div>
                ))}
              </div>
              <div className="project-body-container">
                {filteredProjects.map((proj) => (
                  <div
                    className="project-items"
                    onClick={() => handleProjectClick(proj._id)}
                  >
                    <div className="project-item-header">
                      <div className="left-content">
                        <Icon name="project-outline" size="3rem" />
                        <span
                          className="item-title ml-2"
                          style={{ color: "black" }}
                        >
                          {proj.sctProjectName}
                        </span>
                      </div>
                      <div className="notify">1</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "black",
                        margin: "0 1rem",
                      }}
                    >
                      <span style={{ color: "black" }}>
                        Tasks pending:
                        <span
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: "3px",
                          }}
                        >
                          {proj.pendingTasks}
                        </span>
                      </span>
                      <span style={{ color: "black" }}>
                        Tasks in progress:
                        <span
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: "3px",
                          }}
                        >
                          {proj.inProgressTasks}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-lower-grid">
          <div className="dashboard-item">
            <div className="projects">
              <div className="add-project-header">
                <span className="dashboard-contenttitle"></span>
              </div>
            </div>
          </div>

          {/* NOTES */}

          <div className="dashboard-item">
            <div className="notes">
              <div className="notes-header">
                <span className="title">Notes</span>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="header-right">
                    <div className="search-bar">
                      <input
                        id="keyword"
                        name="keyword"
                        type="text"
                        placeholder="Search"
                        autoComplete="new-off"
                      />
                      <Icon title="Search" name="search-icon" size="2rem" />
                    </div>
                    <Icon
                      className="icon"
                      name="add-notes"
                      size="3rem"
                      onClick={handleAddNote}
                    />
                    {addNoteFlag && (
                      <AddNotes onCancel={() => setAddNoteFlag(false)} />
                    )}
                  </div>
                )}
              </div>
              <div className="notes-body-container">
                {Object.keys(groupedMessages).map((date) =>
                  groupedMessages[date].map((message) => (
                    <div className="notes-item" key={message._id}>
                      <div className="notes-item-header">
                        <div className="left-content">
                          <Icon name="notes-outline" size="3rem" />
                          <div className="item-content">
                            <span
                              className="item-title ml-2"
                              style={{ color: "black" }}
                            >
                              {message.heading}
                            </span>
                          </div>
                        </div>
                        <div className="notes-header-right">
                          <Icon
                            title="Delete"
                            name="delete-outline"
                            size="3rem"
                            onClick={() =>
                              handleDelete(message._id, message.heading)
                            }
                          />
                          <Icon
                            name="open-outline"
                            size="3rem"
                            onClick={() =>
                              handleViewNote(
                                message._id,
                                message.heading,
                                message.msg
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="note-content">{message.msg}</div>
                    </div>
                  ))
                )}
                {deleteNoteFlag && (
                  <DeleteNotes
                    id={noteId}
                    head={noteHead}
                    onCancel={handleDeleteNotesCancel}
                  />
                )}
                {viewNoteFlag && !deleteNoteFlag && (
                  <View
                    id={noteId}
                    head={noteHead}
                    msg={noteMsg}
                    onCancel={handleViewNotesCancel}
                    onDelete={handleOnDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {addProjectFlag && (
        <AddProject onCancel={() => setAddProjectFlag(false)} />
      )}
    </MainContainer>
  );
};

export default Dashboard;
