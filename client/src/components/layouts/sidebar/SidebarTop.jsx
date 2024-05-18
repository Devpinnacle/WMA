import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Icon from "../../ui/Icon";
import "./SidebarTop.css";
import { useEffect, useState } from "react";
import Logout from "../../modals/logout/Logout";
import { useLogoutMutation } from "../../../redux/api/userApi";
import { setStatus } from "../../../redux/slice/userSlice";

export default function SidebarTop() {
  const navigate = useNavigate();
  const [logout, { data }] = useLogoutMutation();
  const { status } = useSelector((state) => state.user);
  const dispatch=useDispatch()

  useEffect(() => {
    if (status === "SUCCESS") {
      dispatch(setStatus(null))
      navigate("/login");
    }
  }, [data, navigate, status]);

  const { user } = useSelector((state) => state.user);
  const [logoutFlag, setLogoutFlag] = useState(false);
  //flag
  const getClassName = (isActive) => {
    return `top-link-item ${isActive ? "top-link-item-active" : null}`;
  };

  const handleLogout = () => {
    setLogoutFlag(false);
    logout();
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
          to="/projects"
          style={{ textDecoration: "none" }}
        >
          <div className="side-icon">
            <Icon name="projects" size="24px" />
          </div>
          Projects
        </NavLink>

        {!(user?.softDesig === "members") && (
          <>
            <div className="top-link-items">
              <NavLink
                className={({ isActive }) => getClassName(isActive)}
                to="/reports"
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
            onClick={() => setLogoutFlag(true)}
          >
            <div className="side-icon">
              <Icon name="logout-outline" size="24px" />
            </div>
            Log out
          </NavLink>
        </div>
      </div>
      {logoutFlag && (
        <Logout onCancel={() => setLogoutFlag(false)} logout={handleLogout} />
      )}
       <style>{`.top-link-item-active::after { background-color: ${user?.empColorCode}; }`}</style>
    </div>
  );
}
