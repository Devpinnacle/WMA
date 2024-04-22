import React, { useState } from "react";
import "./SideBar.css";
import SidebarTop from "./SidebarTop";
import Icon from "../../ui/Icon";
import { useSelector } from "react-redux";
import UserNotification from "../../modals/Notification/UserNotification";

export default function SideBar() {
  const { user } = useSelector((state) => state.user);
  const [userNotificationFlag,setUserNotificationFlag]=useState(false);
  return (
    <div className="sidebar-outer">
      <div className="sidebar">
        <div className="flex-between mb-3">
          <div className="profile">
            <div className="profile-img-container">
              <div className="profile-letter flex-center">
                {user?.userName.slice(0, 1)}
              </div>
            </div>
            <div className="profile-details">
              <span className="profile-details_name">
                 {user.userName}
              </span>
              <span className="profile-details_post">{user.designationName}</span>
            </div>
          </div>
          {user.userGroupName==="Software"&&(
          <div className="bell-icon">
            <Icon
              name="bell-icon"
              onClick={()=>setUserNotificationFlag(true)}
              size="26px"/>
          </div>)}
        </div>
        <div className="sidebar-container"></div>
        <div className="horizontal-line mb-2"></div>
        <SidebarTop />
      </div>
      {userNotificationFlag&&<UserNotification onCancel={()=>setUserNotificationFlag(false)}/>}
    </div>
  );
}
