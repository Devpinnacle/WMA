import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Icon from "../../ui/Icon";
import "./SidebarTop.css";

export default function SidebarTop() {
    let user = { role: "Admin" }
    //flag
    // const getClassName = (isActive) => {
    //     return `top-link-item ${isActive
    //         ? ["Super Admin", "Admin"].includes(user.role) //flag
    //             ? "top-link-item-active"
    //             : null
    //         : ""
    //         }`;
    // };

    return (
        <div className="">
            <div className="sidebar-top-links">
                <NavLink className="top-link-item" to="/" style={{ textDecoration: "none" }}>
                    <Icon name="dashboard" size="24px" />
                    Dashboard
                </NavLink>

                <NavLink className="top-link-item" to="projects" style={{ textDecoration: "none" }}>
                    <Icon name="projects" size="24px" />
                    Projects
                </NavLink>
                <NavLink className="top-link-item" to="reports" style={{ textDecoration: "none" }}>
                    <Icon name="reports" size="24px" />
                    Reports
                </NavLink>
                <NavLink className="top-link-item" to="#" style={{ textDecoration: "none" }}>
                    <Icon name="users" size="24px" />
                    Users
                </NavLink>
            </div>
        </div>
    )
}