import React, { useState } from 'react'
import MainContainer from '../components/layouts/sidebar/MainContainer'
import Icon from '../components/ui/Icon'
import { getStatusColors } from '../util'
import SelectInput from '../components/ui/SelectInput'
import "./Reports.css"
import { NavLink } from 'react-router-dom'
import ReportTopComponent from './ReportTopComponent'

const Reports = () => {
    const [months, setMonth] = useState([]);
    const month = [
        { value: "January", label: "Janauary" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" },
    ];

    return (
        <MainContainer pageName="Project-wise Report">
            <ReportTopComponent />
            <div className='chart-grid'>
                <div className='chart' style={{ color: "black" }}>
                    All task Status
                </div>
                <div className='chart' style={{ color: "black" }}>
                    Task Status-Month
                    <SelectInput
                        placeholder="Month"
                        isSearchable={false}
                        options={month}
                    />
                </div>
                <div className='chart' style={{ color: "black" }}>
                    Task Status-Month
                </div>
            </div> 
        </MainContainer>
    )
}

export default Reports