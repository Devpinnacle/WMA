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
import DatePicker from "react-datepicker";
import AddProject from "../components/modals/projects/AddProject";
import io from "socket.io-client";
import { getNotifications } from "../redux/slice/notificationSlice";
import { useGetNotificationQuery } from "../redux/api/notificationApi";

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
  const [notificationTag, setNotificationTag] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: fetchedData, isLoading } = useGetNotesQuery();
  const { data: projectData } = useGetProjectQuery();
  const { data: nofify } = useGetNotificationQuery();

  const { notes } = useSelector((state) => state.notes);
  const { project } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notifications);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tags = [
    { label: "Software", value: "Software" },
    { label: "Website", value: "Website" },
    { label: "Mobile", value: "Mobile" },
    { label: "Others", value: "Others" },
  ];

  const notificationTags = [
    { label: "high", value: "red" },
    { label: "normal", value: "yello" },
    { label: "low", value: "green" },
  ];
  const socket = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    socket.on("Notifie", (data) => {
      if (user.userGroupName !== "Software") {
        dispatch(getNotifications(data));
      }
    });
    return () => socket?.off("N");
  }, []);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };  

  const handleTags = (e) => {
    if (!tag.includes(e.value)) setTag((prevTag) => [...prevTag, e.value]);
  };

  const handleNotificationTags = (e) => {
    if (!notificationTag.some((t) => t.value === e.value)) {
      setNotificationTag((prev) => [...prev, { label: e.label, value: e.value }]);
    }
  };  

  const handleRemoveNotificationTag = (item) => {
    setNotificationTag((prevTag) => prevTag.filter((tg) => tg.value !== item.value));
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };

  const filteredNotifications = notifications.filter((notification) => {
    const notificationDate = new Date(parseInt(notification.createdDate));
    const isDateMatched = !selectedDate || notificationDate.toDateString() === selectedDate.toDateString();
    const isTagMatched = notificationTag.length === 0 || notificationTag.every((tg) => notification.priority.includes(tg.value));
    return isDateMatched && isTagMatched;
  });  

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
    <MainContainer pageName={`Hi`} userName={user.userName}>
      <div className="dashboard-container">
        <div className="dashboard-upper-grid">
          <div className="dashboard-item">
            <div className="notification">
              {user.userGroupName === "Software" ? (
                <></>
              ) : (
                <>
                  <div className="project-header">
                    <span className="title">Notification</span>
                    <div className="header-right">
                      <SelectInput
                        className="tags"
                        options={notificationTags}
                        onChange={handleNotificationTags}
                        placeholder="Type"
                      />
                      <div
                        className="date-box"
                        style={{ padding: "1rem", margin: "1rem" }}
                      >
                        <DatePicker
                          customInput={
                            <div className="date-picker">
                              <input
                                type="text"
                                className="date-input"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                placeholder="Day dd/mm/yyyy"
                              />
                              <Icon name="date-picker-outline" size="2rem" />
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="selected-tag">
                    {notificationTag.map((tg, index) => (
                      <div key={index} className="tag-container">
                        <Icon
                          name="close"
                          size="2rem"
                          onClick={() => handleRemoveNotificationTag(tg)}
                        />
                        <p style={{ color: "black" }}>{tg.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="notification-container">
                    {filteredNotifications.map((notification) => (
                      <div
                        className={`notification-item ${notification.priority}`}
                      >
                        <div className="left-content">
                          <Icon name={notification.symbol} size="24px" />
                          <span className="ml-3">
                            <span style={{ fontWeight: "700" }}>
                              {notification.userId.userName}
                            </span>{" "}
                            {notification.action}{" "}
                            <span style={{ fontWeight: "700" }}>
                              {notification?.projectId?.sctProjectName}
                              {notification.sectionId !== null
                                ? `(${notification?.sectionId?.sectionName})`
                                : ``}
                            </span>
                          </span>
                        </div>
                        <span>{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
