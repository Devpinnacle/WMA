import React, { useEffect } from "react";
import Icon from "../../ui/Icon";
import ModalContainer from "../ModalContainer";
import "./UserNotification.css";
import SelectInput from "../../ui/SelectInput";
import SelectDate from "../../ui/SelectDate";
import { useGetNotificationQuery } from "../../../redux/api/notificationApi";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getNotifications } from "../../../redux/slice/notificationSlice";

const UserNotification = ({ onCancel }) => {
  const { data: nofify } = useGetNotificationQuery();
  const { notifications } = useSelector((state) => state.notifications);
  const {user}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const socket = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    socket.emit('join', user._id);
    socket.on("userNotification", (data) => {
      
        dispatch(getNotifications(data));
      
    });
    return () => socket?.off("N");
  }, []);
  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="user-madol modal-centered modal-notification" >
        <div className="notification">
          <div className="project-header">
            <span className="title">Notification</span>
            <div className="header-right">
              <SelectInput className="tags" placeholder="Type" />
              <div
                className="date-box"
                style={{ padding: "1rem", margin: "1rem" }}
              >
                <SelectDate placeholder="Day dd-mm-yyyy" />
              </div>
            </div>
          </div>
          <div className="notification-container">
            {notifications.map((notification) => (
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
