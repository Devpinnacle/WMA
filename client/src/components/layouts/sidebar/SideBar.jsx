import React from "react";
import "./SideBar.css";
import SidebarTop from "./SidebarTop";
import Icon from "../../ui/Icon";
// import { useSelector } from "react-redux";

export default function SideBar() {
  // const { user } = useSelector((state) => state.user);
  return (
    <div className="sidebar-outer">
      <div className="sidebar">
        <div className="flex-between mb-3">
          <div className="profile">
            <div className="profile-img-container">
              <div className="profile-letter flex-center">
                {/* {user?.name.slice(0, 1)} */}U
              </div>
            </div>
            <div className="profile-details">
              <span className="profile-details_name">
                {/* {user?.name.split(" ")[0]} */}User
              </span>
              <span className="profile-details_post">role</span>
            </div>
          </div>
          <div className="bell-icon">
            <Icon
              name="bell-icon"
              size="26px"/>
          </div>
        </div>
        <div className="sidebar-container"></div>
        <div className="horizontal-line mb-2"></div>
        <SidebarTop />
      </div>
    </div>
  );
}
