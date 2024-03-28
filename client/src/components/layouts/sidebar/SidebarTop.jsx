import { useSelector } from "react-redux";
import { NavLink,Link } from "react-router-dom";
import Icon from "../../ui/Icon";
import "./SidebarTop.css";

export default function SidebarTop() {
console.log("hello")
    // const getClassName = (isActive) => {
    //     return `bottom-link-item ${
    //       isActive
    //         ? ["Super Admin", "Admin"].includes("Admin") //user.role) //flag
    //           ? "bottom-link-item-active"
    //           : null
    //         : ""
    //     }`;
    //   };

    return (
        <div className="">
            <div className="sidebar-bottom-links">
              <Link>ok</Link>
            <Icon name="trash-outline" size="2rem" />
            hello
            </div>
        </div>
    )
}