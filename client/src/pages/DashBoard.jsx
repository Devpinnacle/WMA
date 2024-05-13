import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNotes from "../components/modals/notes/AddNotes";
import { useGetNotesQuery } from "../redux/api/notesApi";
import { getNotes } from "../redux/slice/notesSlice";
import DeleteNotes from "../components/modals/notes/DeleteNotes";
import View from "../components/modals/notes/View";
import { useGetProjectQuery } from "../redux/api/projectApi";
import {
  getProject,
  setSelectedProject,
  setSelectedProjectName,
} from "../redux/slice/projectSlice";
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
import DayDateInput from "../components/ui/DayDateInput";
import {
  useGetSelectedTaskMutation,
  useGetTodaysTaskQuery,
} from "../redux/api/taskApi";
import { dashedFormatDate, formatDate } from "../Helper/helper";
import {
  useGetSectionMutation,
  useGetSelectedSectionMutation,
} from "../redux/api/sectionApi";
import ViewTask from "../components/modals/Task/ViewTask";
import { resetTaskNotifications } from "../redux/slice/taskNotificationSlice";
import { taskNotificationApi } from "../redux/api/taskNotificationApi";
import { dueDateTextColor, dueDateColor,dueDateFontWeight, dueDateIcon} from "../util";
import { useGetChatsQuery } from "../redux/api/chatApi";
import { getChats, getSingleChat } from "../redux/slice/chatSlice";

const Dashboard = () => {
  const [noteId, setNoteId] = useState(null);
  const [noteHead, setNoteHead] = useState(null);
  const [noteMsg, setNoteMsg] = useState(null);
  const [addNoteFlag, setAddNoteFlag] = useState(false);
  const [deleteNoteFlag, setDeleteNoteFlag] = useState(false);
  const [viewNoteFlag, setViewNoteFlag] = useState(false);
  const [addProjectFlag, setAddProjectFlag] = useState(false);
  const [taskFlag, setTaskFlag] = useState(false);
  const [toggleFlag, setToggeleFlag] = useState(false);
  const [task, setTask] = useState(null);
  const [section, setSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notesSearch, setNotesSearch] = useState("");
  const [tag, setTag] = useState([]);
  const [notificationTag, setNotificationTag] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [chatMsg, setChatMsg] = useState("");
  const [projTag, setProjTag] = useState({ id: null, name: null });
  const [chatDate, setChatDate] = useState(null);
  const [chatTag, setChatTag] = useState([]);
  const chatRef = useRef(null);

  const [getSelectedSection] = useGetSelectedSectionMutation();
  const [getSelectedTask] = useGetSelectedTaskMutation();
  const [getSections] = useGetSectionMutation();

  const { data: fetchedData, isLoading } = useGetNotesQuery();
  const { data: projectData } = useGetProjectQuery();

  useGetNotificationQuery();
  useGetTodaysTaskQuery();
  useGetChatsQuery();

  const { notes } = useSelector((state) => state.notes);
  const { project } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notifications);
  const { todaysTask } = useSelector((state) => state.task);
  const { chats } = useSelector((state) => state.chats);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatTags = project.map((proj) => ({
    label: proj.sctProjectName,
    value: proj.sctProjectName,
  }));

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
    socket.on("chats", (data) => {
      dispatch(getChats(data));
    });
    return () => socket?.off("N");
  }, []);

  useEffect(() => {
    if (fetchedData) {
      dispatch(getNotes(fetchedData.data));
    }
  }, [dispatch, fetchedData]);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chats]);

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

  const handleNotificationTags = (e) => {
    if (!notificationTag.some((t) => t.value === e.value)) {
      setNotificationTag((prev) => [
        ...prev,
        { label: e.label, value: e.value },
      ]);
    }
  };

  const handleRemoveNotificationTag = (item) => {
    setNotificationTag((prevTag) =>
      prevTag.filter((tg) => tg.value !== item.value)
    );
  };

  const handleTags = (e) => {
    if (!tag.includes(e.value)) setTag((prevTag) => [...prevTag, e.value]);
  };

  const handleRemoveTag = (item) => {
    setTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };

  const filteredNotifications = notifications.filter((notification) => {
    const notificationDate = notification.createdDate;
    const isDateMatched =
      !selectedDate ||
      dashedFormatDate(notificationDate) === dashedFormatDate(selectedDate);
    const isTagMatched =
      notificationTag.length === 0 ||
      notificationTag.every((tg) => notification.priority.includes(tg.value));
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

  const filteredNotes = notes.filter((note) => {
    return note.heading.toLowerCase().includes(notesSearch.toLowerCase());
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

  const handleProjectClick = async (id, name) => {
    dispatch(setSelectedProject(id));
    dispatch(setSelectedProjectName(name));
    await getSections(id);
    navigate("/sections");
  };

  const handleClickTask = async (task) => {
    const sec = await getSelectedSection(task.sectionId._id);
    setSection(sec.data.data);
    setTask(task._id);
    await getSelectedTask(task._id);
    setTaskFlag(true);
  };

  const handleCancelViewTask = () => {
    setTaskFlag(false);
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

  const handleSendMessage = () => {
    const data = {
      userId: user._id,
      message: chatMsg,
      projectId: projTag.id,
    };

    socket.emit("chats", data);
    setChatMsg("");
    setProjTag({ name: null, id: null });
    setToggeleFlag(false);
  };

  useEffect(() => {
    console.log(chatMsg);
  }, [chatMsg]);

  const handleToggle = () => {
    if (toggleFlag) setToggeleFlag(false);
    else setToggeleFlag(true);
  };

  const handleChatTags = (e) => {
    if (!chatTag.includes(e.value))
      setChatTag((prevTag) => [...prevTag, e.value]);
  };

  const handleChatRemoveTag = (item) => {
    setChatTag((prevTag) => prevTag.filter((tg) => tg !== item));
  };

  const chatfilter = chats.filter((chat) => {
    return (
      !chatDate || dashedFormatDate(chat._id) === dashedFormatDate(chatDate)
    );
  });

  const chatfilter1 = chatfilter.map((chat) => {
    const filteredData = chat.data.filter((ch) => {
      return chatTag.length === 0 || chatTag.includes(ch.projectName);
    });
    return {
      ...chat,
      data: filteredData,
    };
  });

  return (
    <MainContainer pageName={`Hi`} userName={user?.userName}>
      <div className="dashboard-container">
        <div className="dashboard-upper-grid">
          <div className="dashboard-item">
            <div className="notification">
              {user?.userGroupName === "Software" ? (
                <>
                  {/* TODAY'S TASK */}
                  <span className="title">Today's task</span>
                  <div className="tasks-container">
                    {todaysTask.data?.map((task) => (
                      <div
                        className="task-body"
                        onClick={() => handleClickTask(task)}
                        style={{
                          backgroundColor: getPriorityBodyColor(task.priority),
                          borderColor: getPriorityBodyColor(task.priority),
                        }}
                      >
                        <div
                          className="task-header"
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
                          <div className="task-left">
                            <Icon
                              name="project-outline"
                              size="24px"
                              color={dueDateTextColor(
                                task.dueDate,
                                task.status
                              )}
                            />
                            <span
                              style={{
                                color: dueDateTextColor(
                                  task.dueDate,
                                  task.status
                                ),
                              }}
                            >
                              {task.projectId.sctProjectName}
                            </span>
                          </div>
                          <div className="task-right">
                            <span
                              style={{
                                color: dueDateTextColor(
                                  task.dueDate,
                                  task.status
                                ),
                              }}
                            >
                              {task.progress}%
                            </span>
                          </div>
                        </div>

                        <div className="task-name">
                          <span>{task.taskName}</span>
                          {task.progressUpdateDate ? (
                            formatDate(task.progressUpdateDate) ===
                            formatDate(new Date()) && (
                              <div className="progress-tag">
                                <Icon name="save-outline" size="24px" />
                                <span>Progress updated</span>
                              </div>
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="task-detail">
                          <div className="employee-detail">
                            <Icon name="employee-outline" size="22px" />
                            <span>{task.assignedTo.userName}</span>
                          </div>
                          <div className="date-info">
                            <Icon 
                              name={dueDateIcon(task.dueDate,task.status)}
                              size="22px"
                              color={dueDateColor(
                                task.dueDate,
                                task.status
                              )}
                            />
                            <span style={{
                              color: dueDateColor(
                                task.dueDate,
                                task.status
                              ), fontWeight: dueDateFontWeight(task.dueDate, task.status)
                            }}>{formatDate(task.dueDate)}</span>
                          </div>
                          <div className="priority-info">
                            <Icon name="priority-outline" size="22px" />
                            <span>{task.priority}</span>
                          </div>
                          <div className="status-info">
                            <Icon name="stage-outline" size="22px" />
                            <span>{task.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="total-progress-count">
                    <span>Total tasks: {todaysTask.data?.length}</span>
                    <span>Progress updated: {todaysTask?.count}</span>
                  </div>
                </>
              ) : (
                <>
                  {/* NOTIFICATION */}
                  <div className="dashboard-grid-header">
                    <span className="title">Notification</span>
                    <div className="header-right">
                      <div className="mt-3">
                        <SelectInput
                          className="tags"
                          options={notificationTags}
                          onChange={handleNotificationTags}
                          placeholder="Type"
                        />
                      </div>
                      <DayDateInput
                        placeholder="Day dd/mm/yyyy"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        className="day-date"
                      />
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
                        <p>{tg.label}</p>
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
                        <span style={{ whiteSpace: "nowrap" }}>{notification.time}</span>
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
              <div className="dashboard-grid-header">
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
                  {user?.userGroupName !== "Software" && (
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
                    <p>{tg}</p>
                  </div>
                ))}
              </div>
              <div className="project-body-container">
                {filteredProjects.map((proj) => (
                  <div
                    className="project-items"
                    onClick={() =>
                      handleProjectClick(proj._id, proj.sctProjectName)
                    }
                  >
                    <div className="project-item-header">
                      <div className="left-content">
                        <Icon name="project-outline" size="3rem" />
                        <span className="item-title ml-2">
                          {proj.sctProjectName}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "0 1rem",
                      }}
                    >
                      <span>
                        Tasks pending:
                        <span
                          style={{
                            fontWeight: "bold",
                            marginLeft: "3px",
                          }}
                        >
                          {proj.pendingTasks}
                        </span>
                      </span>
                      <span>
                        Tasks in progress:
                        <span
                          style={{
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
        {/*CHATS*/}
        <div className="dashboard-lower-grid">
          <div className="dashboard-item">
            <div className="chats">
              <div className="dashboard-grid-header">
                <span className="title">Chats</span>
                <div className="header-right ">
                  <DayDateInput placeholder="Day dd/mm/yyyy" selected={chatDate} onChange={(date) => setChatDate(date)} />
                  <div className="chat-filter-tag mt-3" style={{ width: "17rem" }}>
                    <SelectInput className="tags" placeholder="Tags" options={chatTags} onChange={handleChatTags} />
                  </div>
                </div>
              </div>
              {chatTag.length > 0 && (
                <div className="selected-tag">
                  {chatTag.map((tg, index) => (
                    <div key={index} className="tag-container">
                      <Icon
                        name="close"
                        size="2rem"
                        onClick={() => handleChatRemoveTag(tg)}
                      />
                      <p>{tg}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="chat-container" ref={chatRef}>
                {chatfilter1.map((chat) => (
                  <>
                    {chat.data.length > 0 && (
                      <div class="date-container">
                        <div class="date-line"></div>
                        <div class="date">{formatDate(chat._id)}</div>
                        <div class="date-line"></div>
                      </div>
                    )}
                    {chat.data.map((ch) => (
                      <>
                        <div className="message-container">
                          <div className="message">
                            <span style={{ fontWeight: "bold" }}>
                              {ch.name}:
                            </span>
                            <span style={{ marginLeft: "5px" }}>
                              {ch.message}
                            </span>
                          </div>
                          <div className="tag-time">
                            {ch.projectName && (
                              <div className="project-tags chat-tag p-0 m-1">
                                <span className="tag-list">
                                  {ch.projectName}
                                </span>
                              </div>
                            )}
                            <span style={{ fontSize: "14px" }}>{ch.time}</span>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ))}
              </div>
              <div className={`chat-input ${chatTag.length > 0 ? 'hidden' : ''}`}>
                <input
                  type="text"
                  placeholder="Message"
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                />
                <div className="input-operation-buttons">
                  {projTag.name && (
                    <div className="tag-container">{projTag.name}</div>
                  )}
                  <div className="tag-icon ml-3 mr-3">
                    <Icon
                      name="tag-outline"
                      size="20px"
                      onClick={handleToggle}
                    />
                  </div>
                  {chatMsg !== "" && <div className="" onClick={handleSendMessage}>
                    <Icon name="send-outline" size="20px" title="send" />
                  </div>}
                </div>
              </div>
              {toggleFlag && (
                <div className="settings-container">
                  <div
                    className="setting-item"
                    onClick={() => setProjTag({ name: null, id: null })}
                  >
                    <p>None</p>
                  </div>
                  {project.map((tg, index) => (
                    <div
                      key={index}
                      className="setting-item"
                      onClick={() =>
                        setProjTag({ name: tg.sctProjectName, id: tg._id })
                      }
                    >
                      <p>{tg.sctProjectName}</p>
                    </div>
                  ))}
                </div>
              )}
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
                        value={notesSearch}
                        onChange={(e) => setNotesSearch(e.target.value)}
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
                {filteredNotes &&
                  filteredNotes.map(
                    (
                      message // Added a null check for filteredNotes
                    ) => (
                      <div className="notes-item" key={message._id}>
                        <div className="notes-item-header">
                          <div className="left-content">
                            <Icon name="notes-outline" size="3rem" />
                            <div className="item-content">
                              <span className="item-title ml-2">
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
                    )
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
      {taskFlag && (
        <ViewTask
          taskId={task}
          onCancel={handleCancelViewTask}
          section={section}
        />
      )}
    </MainContainer>
  );
};

export default Dashboard;
