import React from 'react'
import './SideBar.css'
import dashboardIcon from "../../assets/icons/dashboardWhite.png"


const SideBar = () => {
    return (
        <div className='side-bar'>
            <div className="profile-section">

            </div>
            <div className="profile-line"></div>
            <div className="navigation-tabs">
                <span className="icon"><img className='dashboardIcon' src={dashboardIcon} /></span>
                <span className="nav-content">Dashboard</span>
            </div>
            <div className="navigation-tabs">Projects</div>
            <div className="navigation-tabs">Reports</div>
            <div className="navigation-tabs">Users</div>

        </div>

    )
}

export default SideBar