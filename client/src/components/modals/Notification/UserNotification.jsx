import React, { useEffect, useState } from "react";
import Icon from "../../ui/Icon";
import ModalContainer from "../ModalContainer";
import "./UserNotification.css";
import SelectInput from "../../ui/SelectInput";
import SelectDate from "../../ui/SelectDate";
import { useGetNotificationQuery } from "../../../redux/api/notificationApi";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getNotifications } from "../../../redux/slice/notificationSlice";
import { dashedFormatDate } from "../../../Helper/helper";

const UserNotification = ({ onCancel }) => {
  const [notificationTag, setNotificationTag] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { data: nofify } = useGetNotificationQuery();
  const { notifications } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const socket = io(import.meta.env.VITE_SOCKET_URL);

  const notificationTags = [
    { label: "high", value: "red" },
    { label: "normal", value: "yello" },
    { label: "low", value: "green" },
  ];

  useEffect(() => {
    socket.emit("join", user._id);
    socket.on("userNotification", (data) => {
      dispatch(getNotifications(data));
    });
    return () => socket?.off("N");
  }, []);

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

  const handleDateChange = (date) => { 
    // console.log(dashedFormatDate(date))
    setSelectedDate(date);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const notificationDate = notification.createdDate;
    console.log(dashedFormatDate(notificationDate))
    const isDateMatched =
      !selectedDate ||
      dashedFormatDate(notificationDate) === dashedFormatDate(selectedDate);
    const isTagMatched =
      notificationTag.length === 0 ||
      notificationTag.every((tg) => notification.priority.includes(tg.value));
    return isDateMatched && isTagMatched;
  });

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="user-madol modal-centered modal-notification">
        <div className="notification">
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
                <SelectDate placeholder="Day dd-mm-yyyy" value={selectedDate} onChange={handleDateChange}/>
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
              <div className={`notification-item ${notification.priority}`}>
                <div className="left-content">
                  <Icon name={notification.symbol} size="24px" />
                  <span className="ml-3">
                    <span
                      style={{ fontWeight: "700" }}
                    >{`${notification.userId.userName} `}</span>
                    {`${notification.action} `}
                    <span style={{ fontWeight: "700" }}>
                      {notification?.projectId?.sctProjectName}
                      {notification.sectionId !== null
                        ? `(${notification?.sectionId?.sectionName})`
                        : ``}
                    </span>
                  </span>
                </div>
                <span>{notification.time} </span>
              </div>
            ))}
            {/* <div
              className="notification-item"
              style={{
                backgroundColor: "#FBEFDA",
                border: "2px solid #F3CF96",
              }}
            >
              <div className="left-content">
                <Icon name="progress-outline" size="24px" />
                <span className="ml-3">
                  <span style={{ fontWeight: "700" }}>You</span> updated
                  progress in{" "}
                  <span style={{ fontWeight: "700" }}>
                    Bookbetter (Development)
                  </span>
                </span>
              </div>
              <span>8:00am </span>
            </div>
            <div
              className="notification-item"
              style={{
                backgroundColor: "#FBEFDA",
                border: "2px solid #F3CF96",
              }}
            >
              <div className="left-content">
                <Icon name="edit-outline" size="24px" />
                <span className="ml-3">
                  <span style={{ fontWeight: "700" }}>Joel </span>edited your
                  task in{" "}
                  <span style={{ fontWeight: "700" }}>
                    JT application (Updates)
                  </span>
                </span>
              </div>
              <span>8:00am </span>
            </div>
            <div
              className="notification-item"
              style={{
                backgroundColor: "#F9E3DD",
                border: "2px solid #EDB1A1",
              }}
            >
              <div className="left-content">
                <Icon name="delete-outline" size="24px" />
                <span className="ml-3">
                  <span style={{ fontWeight: "700" }}>You </span>deleted a task
                </span>
              </div>
              <span>8:00am </span>
            </div>
            <div
              className="notification-item"
              style={{
                backgroundColor: "#F9E3DD",
                border: "2px solid #EDB1A1",
              }}
            >
              <div className="left-content">
                <Icon name="due-outline" size="24px" />
                <span className="ml-3">
                  Your task is due in
                  <span style={{ fontWeight: "700" }}>
                    {" "}
                    JT application(Updates){" "}
                  </span>
                </span>
              </div>
              <span>8:00am </span>
            </div>
            <div
              className="notification-item"
              style={{
                backgroundColor: "#F9E3DD",
                border: "2px solid #EDB1A1",
              }}
            >
              <div className="left-content">
                <Icon name="critical-note-outline" size="24px" />
                <span className="ml-3">
                  <span style={{ fontWeight: "700" }}>You </span>added a
                  critical note in{" "}
                  <span style={{ fontWeight: "700" }}>
                    JT application (Updates)
                  </span>
                </span>
              </div>
              <span>8:00am </span>
            </div>
            <div
              className="notification-item"
              style={{
                backgroundColor: "#DCEAE3",
                border: "2px solid #AACBBA",
              }}
            >
              <div className="left-content">
                <Icon name="task-outline" size="24px" />
                <span className="ml-3">
                  <span style={{ fontWeight: "700" }}>You </span>
                  completed task in
                  <span style={{ fontWeight: "700" }}>
                    {" "}
                    JT application (Updates){" "}
                  </span>
                </span>
              </div>
              <span>8:00am </span>
            </div> */}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default UserNotification;
