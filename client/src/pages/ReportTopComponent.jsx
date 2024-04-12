import React from 'react'
import Icon from '../components/ui/Icon'
import { NavLink } from 'react-router-dom'

const ReportTopComponent = () => {
    return (
        <div className='report-top'>
            <NavLink className='top-items daily-report' to="daily-report" style={{ color: "black", textDecoration: "none" }}>
                <Icon
                    id="project-icon"
                    name="daily-report-outline"
                    size="5.5rem"
                />
                <span style={{color:'black'}}>Daily Report</span>
            </NavLink>
            <NavLink className='top-items project-report' to="/" style={{ color: "black", textDecoration: "none" }}>
                <Icon
                    name="projects"
                    size="5.5rem"
                />
            <span style={{color:'black'}}>Project-wise Report</span>
            </NavLink>
            <NavLink className='top-items member-report' to="/" style={{ color: "black", textDecoration: "none" }}>
                <Icon
                    name="member-wise-outline"
                    size="5.5rem"
                />
                <span style={{color:'black'}}>Member-wise Report</span>
            </NavLink>
        </div>
    )
}

export default ReportTopComponent