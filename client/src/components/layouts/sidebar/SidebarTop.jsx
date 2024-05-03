import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Icon from "../../ui/Icon";
import "./SidebarTop.css";
import { useState } from "react";
import Logout from "../../modals/logout/Logout";

export default function SidebarTop() {
  const { user } = useSelector((state) => state.user);
  const [logoutFlag,setLogoutFlag]=useState(false);
  //flag
  const getClassName = (isActive) => {
    return `top-link-item ${isActive ? "top-link-item-active" : null}`;
  };

  return (
    <div className="sidebar-top-container">
      <div className="sidebar-top-links">
        <div className="top-link-items">
          <NavLink
            className={({ isActive }) => getClassName(isActive)}
            to="/"
            style={{ textDecoration: "none" }}
          >
            <div className="side-icon">
              <Icon name="dashboard" size="24px" />
            </div>
            Dashboard
          </NavLink>
        </div>
        <NavLink
          className={({ isActive }) => getClassName(isActive)}
          to="projects"
          style={{ textDecoration: "none" }}
        >
          <div className="side-icon">
            <Icon name="projects" size="24px" />
          </div>
          Projects
        </NavLink>

        {!(user?.userGroupName === "Software") && (
          <>
            <div className="top-link-items">
              <NavLink
                className={({ isActive }) => getClassName(isActive)}
                to="reports"
                style={{ textDecoration: "none" }}
              >
                <div className="side-icon">
                  <Icon name="reports" size="24px" />
                </div>
                Reports
              </NavLink>
            </div>
          </>
        )}
        <div className="top-link-items">
          <NavLink
            className="top-link-item"
            to=""
            style={{ textDecoration: "none" }}
            onClick={()=>setLogoutFlag(true)}
          >
            <div className="side-icon">
              <Icon name="logout-outline" size="24px" />
            </div>
            Log out
          </NavLink>
        </div>
      </div>
      {logoutFlag&&<Logout onCancel={()=>setLogoutFlag(false)}/>}
    </div>
  );
}
