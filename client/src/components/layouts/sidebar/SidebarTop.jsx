import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Icon from "../../ui/Icon";
import "./SidebarTop.css";

export default function SidebarTop() {
    const { user } = useSelector((state) => state.user);
    //flag
    const getClassName = (isActive) => {
        return `top-link-item ${isActive
            ? "top-link-item-active"
            : null
            }`;
    };

    return (
        <div className="">
            <div className="sidebar-top-links">
                <div className="top-link-items">
                    <NavLink className={({ isActive }) => getClassName(isActive)} to="/" style={{ textDecoration: "none" }} >
                        <Icon name="dashboard" size="24px" />
                        Dashboard
                    </NavLink>
                </div>
                <div className="top-link-items">
                    <NavLink className={({ isActive }) => getClassName(isActive)} to="projects" style={{ textDecoration: "none" }}>
                        <Icon name="projects" size="24px" />
                        Projects
                    </NavLink>
                </div>
                <NavLink className="top-link-item" to="" style={{ textDecoration: "none" }}>
                    <Icon name="chat-outline" size="24px" />
                    Chats
                </NavLink>
                {!(user.userGroupName === "Software") && (
                    <>
                        <div className="top-link-items">
                            <NavLink className={({ isActive }) => getClassName(isActive)} to="reports" style={{ textDecoration: "none" }}>
                                <Icon name="reports" size="24px" />
                                Reports
                            </NavLink>
                        </div>
                    </>
                )}
                {/* <div className="top-link-items"> */}
                <NavLink className="top-link-item" to="" style={{ textDecoration: "none" }}>
                    <Icon name="logout-outline" size="24px" />
                    Log out
                </NavLink>
                {/* </div> */}
            </div>
        </div>
    )
}