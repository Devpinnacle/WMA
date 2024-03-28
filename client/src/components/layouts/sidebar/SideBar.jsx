import React from 'react'
import './SideBar.css'
import SidebarTop from "./SidebarTop"

export default function SideBar() {
    return (
        <div className="sidebar-outer">
            <div className="sidebar">
                <div className="flex-between mb-1">
                    <div className="logo"></div>
                </div>
                <div className="sidebar-container">
                    
                </div>
                <div className="horizontal-line mb-2"></div>
                <div className="sidebar-links">
                    <SidebarTop/>
                </div>
            </div>
        </div>
    )
}