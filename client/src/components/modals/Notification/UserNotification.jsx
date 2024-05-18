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
    return () => socket?.off("join");
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
    setSelectedDate(date);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const notificationDate = notification.createdDate;
    const isDateMatched =
      !selectedDate ||
      dashedFormatDate(notificationDate) === dashedFormatDate(selectedDate);
    const isTagMatched =
      notificationTag.length === 0 ||
      notificationTag.some((tg) => notification.priority.includes(tg.value));
    return isDateMatched && isTagMatched;
  });

  return (
    <ModalContainer onCancel={onCancel} backdropClass={"backdrop-dark"}>
      <div className="user-madol modal-centered modal-notification">
        <div className="notification">
          <div className="dashboard-grid-header">
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
                <SelectDate placeholder="Day dd-mm-yyyy" selected={selectedDate} onChange={handleDateChange}/>
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
                  title="Remove"
                />
                <p style={{ color: "black" }}>{tg.label}</p>
              </div>
            ))}
          </div>
          <div className="notification-container">
            {filteredNotifications.map((notification) => (
              <div className={`notification-item ${notification.priority}`}>
                <div className="left-content">
                  <Icon name={notification.symbol} size="24px" noCursor={true}/>
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
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default UserNotification;