import React from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import Icon from '../components/ui/Icon'
import "./Reports.css"

const Reports = () => {
    return (
        <MainContainer pageName="Reports">
            <div className='report-top'>
                <div className='top-items daily-report' style={{ color: "black" }}>
                    <Icon
                        name="daily-report-outline"
                        size="5.5rem"
                    />
                    Daily Report
                </div>
                <div className='top-items project-report' style={{ color: "black" }}>
                    <Icon
                        name="projects"
                        size="5.5rem"
                    />
                    Project-wise Report
                </div>
                <div className='top-items member-report' style={{ color: "black" }}>
                    <Icon
                        name="member-wise-outline"
                        size="5.5rem"
                    />
                    Member-wise Report
                </div>
            </div>
            <div className='chart-grid'style={{color:"black"}}>
                <div className='chart'>
                    All task Status
                </div>
                <div className='chart'>
                    Task Status-Month
                </div>
                <div className='chart'>
                    Task Status-Month
                </div>
            </div>

        </MainContainer>
    )
}

export default Reports