import React from 'react'
import './SideBar.css'
import NavLeftItem from "../layouts/NavLeftItem"
import dashboardIcon from "../../assets/icons/dashboard.png"
import dashboardHover from "../../assets/icons/dashboardHover.png"
import projectIcon from "../../assets/icons/project.png"
import projectHover from "../../assets/icons/projectHover.png"
import reportIcon from "../../assets/icons/report.png"
import reportHover from "../../assets/icons/reportHover.png"
import userIcon from "../../assets/icons/user.png"
import userHover from "../../assets/icons/userHover.png"


const SideBar = () => {
    return (
        // <div className='side-bar'>
        //     <div className="profile-section">

        //     </div>
        //     <div className="profile-line"></div>
        //     <div className="navigation-tabs">
        //         <span className="icon"><img className='dashboardIcon' src={dashboardIcon} /></span>
        //         <span className="nav-content">Dashboard</span>
        //     </div>
        //     <div className="navigation-tabs">Projects</div>
        //     <div className="navigation-tabs">Reports</div>
        //     <div className="navigation-tabs">Users</div>

        // </div>
        <div className="side-bar">
            <div className="profile-section">
            </div>
            <div className="profile-line"></div>
            <NavLeftItem
                imgNormal={dashboardIcon}
                imgHover={dashboardHover}
                name="Dashboard"
            />
            <NavLeftItem
                imgNormal={projectIcon}
                imgHover={projectHover}
                name="Projects"
            />
            <NavLeftItem
                imgNormal={reportIcon}
                imgHover={reportHover}
                name="Reports"
            />
            <NavLeftItem
                imgNormal={userIcon}
                imgHover={userHover}
                name="Users"
            />
        </div>

    )
}

export default SideBar